// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import "./setup-hermes";
import { stringLength, stringType } from "./setup-hermes-args.cjs";
import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { bufferToStringTask } from "./impl-buffer-to-string";

const version = HermesInternal.getRuntimeProperties()["OSS Release Version"];
const runtime = version ? `hermes ${version}` : "hermes";

runBench({
  runtime,
  stringLength,
  stringType,
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks, bufferToStringTask],
});
