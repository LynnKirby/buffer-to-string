// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { runBench } from "./common";

import { fromCharCodeTask } from "./impl-fromcharcode";
import { fromCharCodeApplyTasks } from "./impl-fromcharcode-apply";
import { stringDecoderTask } from "./impl-stringdecoder";
import { textDecoderTask } from "./impl-textdecoder";
import { bufferTask } from "./impl-buffer";

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