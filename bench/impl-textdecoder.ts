// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import type { TaskDefinition } from "./common";

const decoder = new TextDecoder("utf-16le", {
  ignoreBOM: true,
  fatal: false,
});

export const textDecoderTask: TaskDefinition = {
  name: "TextDecoder",
  fn(source) {
    return decoder.decode(source);
  },
};
