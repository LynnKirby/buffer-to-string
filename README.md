<!--
SPDX-License-Identifier: 0BSD
SPDX-FileCopyrightText: 2023 Lynn Kirby
-->

# buffer-to-string

## Running benchmarks

```sh
# Hereby installed globally
pnpm install -g hereby
hereby bench-RUNTIME

# Hereby installed locally
pnpm hereby bench-RUNTIME

# With string length
hereby bench-RUNTIME --length=100_000
```

Where `RUNTIME` is one of:

- `node` - Node.js
- `deno` - Deno
- `graal` - GraalJS
- `hermes` - Hermes
- `quickjs` - QuickJS

### Deno setup

1. [Install Deno](https://deno.land/manual/getting_started/installation).
2. Set the `DENO` environment variable to the `deno` binary or add it to your `PATH`.
3. Run with `hereby bench-deno`.

### GraalJS setup

1. [Download](https://www.graalvm.org/downloads/) and extract the GraalVM JDK.
2. Set the `GRAALVM_HOME` environment variable to the GraalVM JDK directory.
3. Install the Node.js component with `$GRAALVM_HOME/bin/gu install nodejs`.
4. Run with `hereby bench-graal`.

### Hermes setup

1. [Download](https://github.com/facebook/hermes/releases) and extract Hermes.
2. Set the `HERMES` environment variable to the `hermes` binary or add it to your `PATH`.
3. Run with `hereby bench-hermes`.

### QuickJS setup

1. [Download](https://bellard.org/quickjs/binary_releases/) and extract QuickJS.
2. Set the `QUICKJS` environment variable to the `qjs` binary or add it to your `PATH`.
3. Run with `hereby bench-quickjs`.
