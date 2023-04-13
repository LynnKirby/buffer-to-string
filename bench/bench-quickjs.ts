// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import "./setup-quickjs";
import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { bufferToStringTask } from "./impl-buffer-to-string";

runBench({
  runtime: `quickjs`,
  stringLength: scriptArgs[1],
  stringType: scriptArgs[2],
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks, bufferToStringTask],
});
