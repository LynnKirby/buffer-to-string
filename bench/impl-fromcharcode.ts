// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { TaskDefinition } from "./common";

export function fromCharCode(source: Uint16Array): string {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    result += String.fromCharCode(source[i]);
  }
  return result;
}

export const fromCharCodeTask: TaskDefinition = {
  name: "String.fromCharCode",
  fn(source) {
    return fromCharCode(source);
  },
};
