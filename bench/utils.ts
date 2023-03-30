// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

export function formatTime(ms: number): string {
  if (ms >= 1e3) return `${(ms / 1e3).toPrecision(3)} s`;
  if (ms >= 1) return `${ms.toPrecision(3)} ms`;
  if (ms >= 1e-3) return `${(ms * 1e3).toPrecision(3)} us`;
  if (ms >= 1e-6) return `${(ms * 1e6).toPrecision(3)} ns`;
  return `${(ms * 1e9).toPrecision(3)} ps`;
}
