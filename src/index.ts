// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import {
  bufferToString_fromCharCode,
  bufferToString_fromCharCodeApply,
} from "./impl-fromcharcode";

const FROM_CHAR_CODE_MAX = 100;

export function bufferToString(source: Uint16Array): string {
  if (source.length === 0) {
    return "";
  }

  if (source.length === 1) {
    return String.fromCharCode(source[0]);
  }

  if (source.length <= FROM_CHAR_CODE_MAX) {
    return bufferToString_fromCharCode(source);
  }

  return bufferToString_fromCharCodeApply(source);
}
