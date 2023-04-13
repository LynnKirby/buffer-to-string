// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

export function makeFromCharCodeApply(chunkSize: number) {
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

export function bufferToString_fromCharCode(source: Uint16Array): string {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    result += String.fromCharCode(source[i]);
  }
  return result;
}

export const bufferToString_fromCharCodeApply = makeFromCharCodeApply(10_000);
