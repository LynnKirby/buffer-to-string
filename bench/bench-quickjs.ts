// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import "./setup-quickjs";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";

import { runBench } from "./common";

runBench({
  runtime: `quickjs`,
  stringLength: scriptArgs[1],
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks],
});
