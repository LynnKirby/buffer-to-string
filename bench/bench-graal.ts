// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask, fromCharCodeApplyTasks } from "./impl-fromcharcode";
import { textDecoderTask } from "./impl-textdecoder";
import { bufferTask, stringDecoderTask } from "./impl-node";
import { javaStringBuilderTask, javaNewStringTask } from "./impl-graal";
import { bufferToStringTask } from "./impl-buffer-to-string";

runBench({
  runtime: `graaljs ${Graal.versionGraalVM}`,
  stringLength: process.argv[2],
  stringType: process.argv[3],
  tasks: [
    fromCharCodeTask,
    ...fromCharCodeApplyTasks,
    textDecoderTask,
    stringDecoderTask,
    bufferTask,
    javaNewStringTask,
    javaStringBuilderTask,
    bufferToStringTask,
  ],
});
