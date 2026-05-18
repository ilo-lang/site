---
title: Language Reference
description: Use this when you want the authoritative ilo language spec or an index of every reference page.
---

Use this when you want the authoritative ilo language spec or an index of every reference page.

The complete language specification is maintained in [SPEC.md](https://github.com/ilo-lang/ilo/blob/main/SPEC.md) on GitHub. For the agent-optimised compact spec, run `ilo help ai`.

## Reference index

### Core syntax
- [Primitives](/docs/reference/primitives/) - type sigils (`n`, `t`, `b`, `_`, `L`, `M`, `R`, `O`, `S`)
- [Types & Functions](/docs/reference/types-and-functions/) - function declarations and signatures
- [Prefix Notation](/docs/reference/prefix-notation/) - operator syntax
- [Guards & Control Flow](/docs/reference/guards/) - flat conditional returns
- [Loops](/docs/reference/loops/) - foreach, ranges, while, `brk`, `cnt`
- [Error Handling](/docs/reference/error-handling/) - Result, `!`, `?`, `??`
- [Pipes](/docs/reference/pipes/) - left-to-right chaining
- [Imports](/docs/reference/imports/) - splitting code across files
- [Memory Model](/docs/reference/memory-model/) - ownership and copying

### Tooling
- [CLI Reference](/docs/reference/cli/) - every flag and subcommand
- [REPL](/docs/reference/repl/) - interactive sessions
- [Engines](/docs/reference/engines/) - tree, VM, JIT, and AOT contracts
- [Benchmarks](/docs/reference/benchmarks/) - performance numbers per engine

### Errors and edge cases
- [Diagnostics](/docs/reference/diagnostics/) - error codes, fixSafety taxonomy, repair plans
- [Gotchas](/docs/reference/gotchas/) - common traps
- [Syntax Experiments](/docs/reference/syntax-experiments/) - proposals and unstable surface

See also the [10-lesson tutorial](https://github.com/ilo-lang/ilo/wiki) on the GitHub wiki.
