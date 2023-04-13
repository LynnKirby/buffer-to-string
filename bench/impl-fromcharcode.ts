// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import {
  bufferToString_fromCharCode,
  makeFromCharCodeApply,
} from "../src/impl-fromcharcode";
import { TaskDefinition } from "./common";

export const fromCharCodeTask: TaskDefinition = {
  name: "String.fromCharCode",
  fn: bufferToString_fromCharCode,
};

export const fromCharCodeApplyTasks: TaskDefinition[] = [
  {
    name: "String.fromCharCode.apply chunkSize=100",
    fn: makeFromCharCodeApply(100),
  },
  {
    name: "String.fromCharCode.apply chunkSize=1000",
    fn: makeFromCharCodeApply(1000),
  },
  {
    name: "String.fromCharCode.apply chunkSize=10_000",
    fn: makeFromCharCodeApply(10_000),
  },
];
