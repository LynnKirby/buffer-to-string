// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { bufferTask, stringDecoderTask } from "./impl-node";
import { textDecoderTask } from "./impl-textdecoder";
import { bufferToStringTask } from "./impl-buffer-to-string";

runBench({
  runtime: `node ${process.version.slice(1)}`,
  stringLength: process.argv[2],
  stringType: process.argv[3],
  tasks: [
    fromCharCodeTask,
    ...fromCharCodeApplyTasks,
    textDecoderTask,
    stringDecoderTask,
    bufferTask,
    bufferToStringTask,
  ],
});
