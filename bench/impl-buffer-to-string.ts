// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { bufferToString } from "buffer-to-string";
import { TaskDefinition } from "./common";

export const bufferToStringTask: TaskDefinition = {
  name: "bufferToString",
  fn(source) {
    return bufferToString(source);
  },
};
