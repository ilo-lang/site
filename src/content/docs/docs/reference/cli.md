---
title: CLI Reference
description: Command-line usage for ilo
---

## Basic usage

```bash
ilo 'funcname params>type;body' args    # inline
ilo file.ilo funcname args              # from file
```

First argument is code or a file path (auto-detected). Remaining arguments are passed to the first function.

Select a named function in a multi-function program:

```bash
ilo 'dbl x:n>n;*x 2 tot p:n q:n r:n>n;s=*p q;t=*s r;+s t' tot 10 20 30
```

## Flags

| Flag | Description |
|------|-------------|
| `-ai` | Output compact spec for LLM consumption |
| `-e`, `--expanded` | Expanded/formatted output |
| `-d`, `--dense` | Dense wire format (minimal whitespace) |
| `-a`, `--ansi` | Force ANSI colour output (default for TTY) |
| `-t`, `--text` | Plain text output (no colour) |
| `-j`, `--json` | JSON output (default for piped output) |
| `-x`, `--explain` | Explain a program or error code |
| `--bench` | Benchmark a function |
| `--verify` | Type-check without executing |
| `--emit python` | Transpile to Python |
| `--tools tools.json` | Load HTTP tool declarations |
| `--mcp mcp.json` | Connect MCP servers |
| `--no-hints`, `-nh` | Suppress idiomatic hints |

## List arguments

Pass list arguments from the command line with bare commas (no spaces, no brackets):

```bash
ilo 'f xs:L n>n;len xs' 1,2,3       # → 3
ilo 'f xs:L t>t;xs.0' 'a,b,c'       # → a
```

## Higher-order function invocation from CLI

`map`, `flt`, `fld` take a function name as their first argument. Define the helper function alongside a `main` entry point and invoke `main`:

```bash
ilo 'sq x:n>n;*x x main xs:L n>L n;map sq xs' main 1,2,3,4,5
# → [1, 4, 9, 16, 25]

ilo 'pos x:n>b;>x 0 main xs:L n>L n;flt pos xs' main -3,-1,0,2,4
# → [2, 4]

ilo 'add a:n b:n>n;+a b main xs:L n>n;fld add xs 0' main 1,2,3,4,5
# → 15
```

Pipe chains work the same way:

```bash
ilo 'sq x:n>n;*x x pos x:n>b;>x 0 main xs:L n>L n;xs >> flt pos >> map sq' main -3,-1,0,2,4
# → [4, 16]
```

## Output formats

### ANSI, text, JSON

Control how results and errors are rendered:

```bash
ilo 'code' -a    # ANSI colour (default when stdout/stderr is a TTY)
ilo 'code' -t    # plain text (no colour)
ilo 'code' -j    # JSON (default when output is piped)
```

Set `NO_COLOR=1` to disable colour globally (equivalent to `--text`).

JSON error output follows a structured schema with `severity`, `code`, `message`, `labels` (with spans), `notes`, and `suggestion` fields.

### Dense and expanded format

```bash
ilo 'code' --dense     # -d  dense wire format (minimal whitespace, for agents)
ilo 'code' --expanded  # -e  expanded human-readable format
```

**Dense** is the default canonical form - single line per declaration, operators glued to first operand:

```ilo
cls sp:n>t;>=sp 1000{"gold"};>=sp 500{"silver"};"bronze"
```

**Expanded** adds 2-space indentation and spacing for human review:

```ilo
cls sp:n > t
  >= sp 1000 {
    "gold"
  }
  >= sp 500 {
    "silver"
  }
  "bronze"
```

Dense format is canonical: `dense(parse(dense(parse(src)))) == dense(parse(src))`.

## Transpile to Python

Generate standalone Python from ilo source:

```bash
ilo 'fac n:n>n;<=n 1 1;r=fac -n 1;*n r' --emit python
```

Output is valid Python that can be saved and run directly. Useful for interop or when deploying to environments without the ilo runtime.

## Benchmark

Time a function over repeated runs:

```bash
ilo program.ilo --bench funcname 10 20 30
```

Reports execution time for the named function with the given arguments.

## Explain

`--explain` (or `-x`) has two modes:

**Explain an error code** - show a detailed description of any `ILO-*` diagnostic:

```bash
ilo --explain ILO-T004
```

**Explain a program** - annotate each statement with a human-readable description of what it does:

```bash
ilo 'f x:n>n;*x 2' --explain
```

## Verify

All programs are type-verified before execution. Errors are reported with stable codes, source context, and suggestions:

```bash
ilo 'f x:n>n;*y 2' 5
# error[ILO-T004]: undefined variable 'y'
#   --> 1:9
#   |
# 1 | f x:n>n;*y 2
#   |         ^^^^
#   |
#   = note: in function 'f'
```

Error code prefixes indicate the phase:

| Prefix | Phase |
|--------|-------|
| `ILO-L___` | Lexer (tokenisation) |
| `ILO-P___` | Parser (syntax) |
| `ILO-T___` | Type verifier (static analysis) |
| `ILO-R___` | Runtime (execution) |

The verifier provides context-aware hints: "did you mean?" suggestions (Levenshtein-based), type conversion advice, missing match arms, and arity mismatches.

## Backend selection

ilo supports multiple execution backends. The default is Cranelift JIT with an interpreter fallback:

| Flag | Backend |
|------|---------|
| *(default)* | Cranelift JIT, falls back to interpreter |
| `--run-interp` | Tree-walking interpreter |
| `--run-vm` | Register VM (bytecode) |
| `--run-cranelift` | Cranelift JIT |
| `--run-jit` | Custom ARM64 JIT (macOS Apple Silicon only) |
| `--run-llvm` | LLVM JIT (requires `--features llvm` build) |

```bash
ilo 'fac n:n>n;<=n 1 1;r=fac -n 1;*n r' --run-vm fac 10
```

## REPL

Start an interactive session:

```bash
ilo repl        # interactive session
ilo repl -j     # REPL with JSON output (useful for agent integration)
```

Define functions, evaluate expressions, and accumulate state across lines. The REPL supports vim-style commands:

| Command | Description |
|---------|-------------|
| `:q` | Quit the REPL |
| `:w file.ilo` | Write current definitions to a file |
| `:defs` | Show all defined functions and types |
| `:clear` | Clear all accumulated state |
| `:help` | Show REPL help |

## Help

```bash
ilo help           # usage and examples
ilo help lang      # full language specification
ilo help ai        # compact spec for LLM consumption
ilo -ai            # same as help ai
```
