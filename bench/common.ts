// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { Bench } from "tinybench";
import type { Task, BenchEvent } from "tinybench";

import { formatTime } from "./utils";
import { bufferToString_fromCharCode } from "../src/impl-fromcharcode";

export type TaskDefinition = {
  name: string;
  fn: (source: Uint16Array) => string;
  skipAll?: boolean;
};

export type BenchOptions = {
  runtime: string;
  tasks: TaskDefinition[];
  stringLength: string | number | undefined;
  stringType: string | undefined;
};

export async function runBench(options: BenchOptions) {
  let stringLength = options.stringLength ?? 10_000;
  let stringType = options.stringType ?? "bmp";

  if (typeof stringLength === "string") {
    stringLength = Number.parseInt(stringLength.replace(/[ \t,_]/g, ""));
  }

  if (!Number.isInteger(stringLength) || stringLength < 1) {
    throw new Error(`Expected positive integer, got ${stringLength}`);
  }

  const source = new Uint16Array(stringLength);

  if (stringType === "zero") {
    // Do nothing.
  } else if (stringType === "bmp") {
    let i = 0;
    let codeUnit = 0;

    while (i < source.length) {
      source[i] = codeUnit;
      i++;
      codeUnit++;

      if (codeUnit >= 0xd800) {
        codeUnit = 0xc000;
      } else if (codeUnit > 0xffff) {
        codeUnit = 0;
      }
    }
  } else if (stringType == "all") {
    let i = 0;
    let codeUnit = 0;

    while (i < source.length) {
      source[i] = codeUnit;
      i++;
      codeUnit++;

      if (codeUnit > 0xffff) {
        codeUnit = 0;
      }
    }
  } else {
    throw new Error("Invalid string type: " + stringType);
  }

  const expected = bufferToString_fromCharCode(source);

  const bench = new Bench();

  for (const task of options.tasks) {
    if (stringType === "all" && task.skipAll) continue;

    let result: string | undefined = undefined;

    const fn = () => {
      result = task.fn(source);
    };

    const beforeEach = () => {
      result = undefined;
    };

    const afterEach = function (this: Task) {
      if (this.result?.error) return;

      if (typeof result !== "string") {
        this.setResult({ error: new Error("Expected result to be a string") });
      } else if (result !== expected) {
        this.setResult({ error: new Error("Result does not match expected") });
      }
    };

    bench.add(task.name, fn, { beforeEach, afterEach });
  }

  bench.addEventListener("cycle", (event: BenchEvent) => {
    const task = event.task!;
    if (task.result!.error) {
      console.log(`${task.name} - FAIL`);
      console.log(task.result!.error);
    } else {
      const mean = formatTime(task.result!.mean);
      const min = formatTime(task.result!.min);
      const max = formatTime(task.result!.max);
      console.log(`${task.name} - ${mean} (${min} ... ${max})`);
    }
  });

  bench.addEventListener("complete", () => {
    const results = bench.tasks.map((x) => ({
      name: x.name,
      ...x.result!,
    }));

    results.sort((a, b) => a.mean - b.mean);
    const fastest = results[0]!;

    console.log();
    console.log(`Fastest: ${fastest.name}`);

    for (let i = 1; i < results.length; i++) {
      const result = results[i]!;
      const ratio = (result.mean / fastest.mean).toFixed(1);
      if (result.error) {
        console.log(`  FAIL ${result.name}`);
      } else {
        console.log(`  ${ratio}x faster than ${result.name}`);
      }
    }
  });

  console.log(`Runtime: ${options.runtime}`);
  console.log(`Length: ${stringLength}`);
  console.log(`Type: ${stringType}`);
  console.log();

  await bench.warmup();
  await bench.run();
}
