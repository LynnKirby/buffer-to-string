// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { StringDecoder } from "node:string_decoder";
import { TaskDefinition } from "./common";

const decoder = new StringDecoder("utf16le");

export const stringDecoderTask: TaskDefinition = {
  name: "StringDecoder",
  fn(source) {
    return decoder.end(source as any);
  },
};
