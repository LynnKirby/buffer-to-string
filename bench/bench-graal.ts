// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { textDecoderTask } from "./impl-textdecoder";
import { bufferTask, stringDecoderTask } from "./impl-node";

runBench({
  runtime: `graaljs ${Graal.versionGraalVM}`,
  stringLength: process.argv[2],
  tasks: [
    fromCharCodeTask,
    ...fromCharCodeApplyTasks,
    textDecoderTask,
    stringDecoderTask,
    bufferTask,
  ],
});
