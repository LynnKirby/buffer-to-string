// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

import { Event, EventTarget } from "event-target-shim";

Object.assign(globalThis, {
  Event,
  EventTarget,
  performance: {
    now() {
      return Date.now();
    },
  },
});
