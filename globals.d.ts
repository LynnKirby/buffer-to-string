// SPDX-License-Identifier: 0BSD
// SPDX-FileCopyrightText: 2023 Lynn Kirby

//
// Deno
//

declare namespace Deno {
  var version: {
    deno: string;
  };
  var args: string[];
}

//
// GraalJS
//

declare namespace Graal {
  var versionGraalVM: string;
}

declare namespace Java {
  function type(typeName: string): any;
}

//
// Hermes
//

declare function print(...args: any[]): void;

declare namespace HermesInternal {
  function getRuntimeProperties(): {
    "OSS Release Version"?: string;
  };
}

//
// QuickJS
//

declare var scriptArgs: string[];

