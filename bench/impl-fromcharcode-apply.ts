// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { TaskDefinition } from "./common";

function makeFromCharCodeApply(chunkSize: number) {
  return function (source: Uint16Array): string {
    let result = "";
    while (source.length > 0) {
      const chunk = source.subarray(0, chunkSize);
      source = source.subarray(chunkSize);
      result += String.fromCharCode.apply(null, chunk as any);
    }
    return result;
  };
}

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
