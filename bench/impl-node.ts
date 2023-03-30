// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { Buffer } from "node:buffer";
import { StringDecoder } from "node:string_decoder";
import { TaskDefinition } from "./common";

export const bufferTask: TaskDefinition = {
  name: "Node.js Buffer.toString",
  fn(source) {
    const buffer = Buffer.from(
      source.buffer,
      source.byteOffset,
      source.byteLength,
    );
    return buffer.toString("utf16le");
  },
};

const decoder = new StringDecoder("utf16le");

export const stringDecoderTask: TaskDefinition = {
  name: "Node.js StringDecoder",
  fn(source) {
    return decoder.end(source as any);
  },
};
