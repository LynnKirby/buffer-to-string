// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

import babel from "@babel/core";
import dotenv from "dotenv";
import esbuild from "esbuild";
import { execa, execaNode } from "execa";
import { task } from "hereby";

dotenv.config();

const args = parseArgs({
  allowPositionals: true,
  options: {
    "graalvm-home": { type: "string" },
    "deno-bin": { type: "string" },
    "hermes-bin": { type: "string" },
    "node-bin": { type: "string" },
    "quickjs-bin": { type: "string" },
    length: { type: "string" },
    "skip-build": { type: "boolean" },
  },
});

const buildOptions = {
  graalHome: args.values["graalvm-home"] ?? process.env["GRAALVM_HOME"],
  denoBin: args.values["deno-bin"] ?? process.env["DENO"] ?? "deno",
  hermesBin: args.values["hermes-bin"] ?? process.env["HERMES"] ?? "hermes",
  nodeBin: args.values["node-bin"] ?? process.env["NODE"] ?? process.execPath,
  quickjsBin: args.values["quickjs-bin"] ?? process.env["QUICKJS"] ?? "qjs",
  length: args.values["length"] ?? "1000",
  skipBuild: args.values["skip-build"] ?? false,
};

//=============================================================================
// Node benchmark

export const buildBenchNode = task({
  name: "build-bench-node",
  description: "Build Node.js benchmark harness",
  async run() {
    if (buildOptions.skipBuild) return;

    await esbuild.build({
      entryPoints: ["bench/bench-node.ts"],
      bundle: true,
      format: "esm",
      target: "es2022",
      outfile: "build/bench-node.mjs",
      external: ["node:*"],
    });
  },
});

export const benchNode = task({
  name: "bench-node",
  description: "Run Node.js benchmarks",
  dependencies: [buildBenchNode],
  async run() {
    await execaNode("build/bench-node.mjs", [buildOptions.length], {
      preferLocal: true,
      execPath: buildOptions.nodeBin,
      stdio: "inherit",
    });
  },
});

//=============================================================================
// Deno benchmark

export const buildBenchDeno = task({
  name: "build-bench-deno",
  description: "Build Deno benchmark harness",
  async run() {
    if (buildOptions.skipBuild) return;

    await esbuild.build({
      entryPoints: ["bench/bench-deno.ts"],
      bundle: true,
      format: "esm",
      target: "es2022",
      outfile: "build/bench-deno.mjs",
    });
  },
});

export const benchDeno = task({
  name: "bench-deno",
  description: "Run Deno benchmarks",
  dependencies: [buildBenchDeno],
  async run() {
    await execa(
      buildOptions.denoBin,
      ["run", "--allow-hrtime", "build/bench-deno.mjs", buildOptions.length],
      { stdio: "inherit" },
    );
  },
});

//=============================================================================
// GraalJS benchmark

export const buildBenchGraal = task({
  name: "build-bench-graal",
  description: "Build GraalJS benchmark harness",
  async run() {
    if (buildOptions.skipBuild) return;

    await esbuild.build({
      entryPoints: ["bench/bench-graal.ts"],
      bundle: true,
      format: "esm",
      target: "es2022",
      outfile: "build/bench-graal.mjs",
      external: ["node:*"],
    });
  },
});

export const benchGraal = task({
  name: "bench-graal",
  description: "Run GraalJS benchmarks",
  dependencies: [buildBenchGraal],
  async run() {
    if (!buildOptions.graalHome) {
      throw new Error("GRAALVM_HOME environment variable not set");
    }

    await execa(
      path.join(buildOptions.graalHome, "bin/node"),
      ["--jvm", "build/bench-graal.mjs", buildOptions.length],
      { stdio: "inherit" },
    );
  },
});

//=============================================================================
// QuickJS benchmark

export const buildBenchQuickJS = task({
  name: "build-bench-quickjs",
  description: "Build QuickJS benchmark harness",
  async run() {
    if (buildOptions.skipBuild) return;

    await esbuild.build({
      entryPoints: ["bench/bench-quickjs.ts"],
      bundle: true,
      format: "esm",
      target: ["es2020"],
      outfile: "build/bench-quickjs.mjs",
    });
  },
});

export const benchQuickJS = task({
  name: "bench-quickjs",
  description: "Run QuickJS benchmarks",
  dependencies: [buildBenchQuickJS],
  async run() {
    await execa(
      buildOptions.quickjsBin,
      ["--module", "build/bench-quickjs.mjs", buildOptions.length],
      {
        stdio: "inherit",
      },
    );
  },
});

//=============================================================================
// Hermes (React Native) benchmark

export const buildBenchHermes = task({
  name: "build-bench-hermes",
  description: "Build Hermes benchmark harness",
  async run() {
    if (buildOptions.skipBuild) return;

    const bundle = await esbuild.build({
      entryPoints: ["bench/bench-hermes.ts"],
      bundle: true,
      format: "cjs",
      write: false,
      external: ["./setup-hermes-args.cjs"],
    });

    assert(bundle.outputFiles.length === 1);
    const text = bundle.outputFiles[0].text;

    // We need an additional build pass with Babel because some transforms
    // needed for Hermes aren't supported by ESBuild (notably let/const -> var).
    const transformed = await babel.transformAsync(text, {
      compact: false,
      presets: [
        [
          "module:metro-react-native-babel-preset",
          {
            unstable_transformProfile: "hermes-stable",
            enableBabelRuntime: false,
          },
        ],
      ],
    });
    const code = transformed?.code;
    assert(code);

    await fs.writeFile("build/bench-hermes.cjs", code);
  },
});

export const benchHermes = task({
  name: "bench-hermes",
  description: "Run Hermes benchmarks",
  dependencies: [buildBenchHermes],
  async run() {
    // Hermes doesn't directly support command-line arguments so we need
    // this shim file.
    const code = `
    exports.stringLength = ${JSON.stringify(buildOptions.length)};
    `;
    await fs.writeFile("build/setup-hermes-args.cjs", code);

    await execa(
      buildOptions.hermesBin,
      [
        "-commonjs",
        "-w",
        "-exec",
        "build/bench-hermes.cjs",
        "build/setup-hermes-args.cjs",
      ],
      {
        stdio: "inherit",
      },
    );
  },
});

//=============================================================================
// Misc.

export const buildBenchAll = task({
  name: "build-bench",
  description: "Build all benchmark harnesses",
  dependencies: [
    buildBenchNode,
    buildBenchDeno,
    buildBenchGraal,
    buildBenchQuickJS,
    buildBenchHermes,
  ],
});
