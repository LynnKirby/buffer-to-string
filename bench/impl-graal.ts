// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { TaskDefinition } from "./common";

const StringBuilder = Java.type("java.lang.StringBuilder");
const JavaString = Java.type("java.lang.String");
const CharArray = Java.type("char[]");

export const javaNewStringTask: TaskDefinition = {
  name: "new java.lang.String(char[])",
  fn(source) {
    const ch = new CharArray(source.length);
    for (let i = 0; i < source.length; i++) {
      ch[i] = source[i];
    }
    return new JavaString(ch);
  },
};

export const javaStringBuilderTask: TaskDefinition = {
  name: "java.lang.StringBuilder",
  fn(source) {
    const builder = new StringBuilder(source.length);
    for (let i = 0; i < source.length; i++) {
      builder.appendCodePoint(source[i]);
    }
    return builder.toString();
  },
};
