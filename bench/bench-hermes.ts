// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import "./setup-hermes";
import { stringLength } from "./setup-hermes-args.cjs";

import { fromCharCodeTask } from "./impl-fromcharcode";
import { fromCharCodeApplyTasks } from "./impl-fromcharcode-apply";

import { runBench } from "./common";

const version = HermesInternal.getRuntimeProperties()["OSS Release Version"];
const runtime = version ? `hermes ${version}` : "hermes";

runBench({
  runtime,
  stringLength,
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks],
});
