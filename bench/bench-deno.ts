// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { textDecoderTask } from "./impl-textdecoder";

runBench({
  runtime: `deno ${Deno.version.deno}`,
  stringLength: Deno.args[0],
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks, textDecoderTask],
});
