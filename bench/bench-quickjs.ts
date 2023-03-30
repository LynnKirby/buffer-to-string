// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import "./setup-quickjs";

import { fromCharCodeTask } from "./impl-fromcharcode";
import { fromCharCodeApplyTasks } from "./impl-fromcharcode-apply";

import { runBench } from "./common";

runBench({
  runtime: `quickjs`,
  stringLength: scriptArgs[1],
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks],
});
