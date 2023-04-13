// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { textDecoderTask } from "./impl-textdecoder";
import { bufferToStringTask } from "./impl-buffer-to-string";

runBench({
  runtime: `deno ${Deno.version.deno}`,
  stringLength: Deno.args[0],
  stringType: Deno.args[1],
  tasks: [
    fromCharCodeTask,
    ...fromCharCodeApplyTasks,
    textDecoderTask,
    bufferToStringTask,
  ],
});
