// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { Buffer } from "node:buffer";
import { TaskDefinition } from "./common";

export const bufferTask: TaskDefinition = {
  name: "Buffer.toString",
  fn(source) {
    const buffer = Buffer.from(
      source.buffer,
      source.byteOffset,
      source.byteLength,
    );
    return buffer.toString("utf16le");
  },
};
