// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { fromCharCodeTask } from "./impl-fromcharcode";
import { fromCharCodeApplyTasks } from "./impl-fromcharcode-apply";
import { textDecoderTask } from "./impl-textdecoder";

import { runBench } from "./common";

runBench({
  runtime: `deno ${Deno.version.deno}`,
  stringLength: Deno.args[0],
  tasks: [fromCharCodeTask, ...fromCharCodeApplyTasks, textDecoderTask],
});
