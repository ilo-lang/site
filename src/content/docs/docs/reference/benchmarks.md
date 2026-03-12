---
title: Benchmarks
description: Runtime performance comparison of ilo against other languages
---

Micro-benchmarks comparing ilo's execution engines against compiled, JIT, and interpreted languages. Each benchmark runs **10000 iterations** and reports the median per-call time in nanoseconds.

:::note
These are micro-benchmarks — they measure raw execution speed, not end-to-end agent workflow performance. ilo's primary optimisation target is **total token cost** (generation + errors + retries), not runtime speed.
:::

## Execution engines

ilo has three execution backends:

- **Interpreter** — tree-walking interpreter (simplest, slowest)
- **ilo VM** — register-based bytecode virtual machine (default)
- **ilo JIT** — Cranelift-based just-in-time compiler (opt-in via `--features cranelift`)

## Languages tested

| Category | Languages |
|----------|-----------|
| **Compiled (AOT)** | Rust (`rustc -O`), Go, C# (.NET), Kotlin (JVM) |
| **JIT** | LuaJIT, Node.js (V8), TypeScript (tsx/V8), PyPy 3 |
| **ilo** | ilo JIT, ilo VM, ilo Interpreter |
| **Interpreted** | Lua, Ruby, PHP, Python 3 (CPython) |

## Results


### numeric

*sum 1..1000 (pure arithmetic loop)*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 201ns | **fastest** |
| Go | 289ns | 1.4x |
| LuaJIT | 294ns | 1.5x |
| TypeScript | 438ns | 2.2x |
| Node/V8 | 472ns | 2.3x |
| Kotlin (JVM) | 503ns | 2.5x |
| PyPy 3 | 806ns | 4.0x |
| ilo JIT | 4.1us | 20.6x |
| C# (.NET) | 5.4us | 26.8x |
| Lua | 5.9us | 29.4x |
| PHP | 6.6us | 32.8x |
| ilo VM | 13.5us | 67.0x |
| Ruby | 20.2us | 100.5x |
| Python 3 | 29.8us | 148.2x |
| ilo Interpreter | 93.5us | 465.4x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 269ns | **fastest** |
| TypeScript | 387ns | 1.4x |
| Node/V8 | 440ns | 1.6x |
| LuaJIT | 772ns | 2.9x |
| PyPy 3 | 783ns | 2.9x |
| PHP | 1.3us | 4.8x |
| C# (.NET) | 2.0us | 7.3x |
| Python 3 | 2.3us | 8.4x |
| Kotlin (JVM) | 2.4us | 8.8x |
| ilo JIT | 3.3us | 12.3x |
| Go | 5.0us | 18.6x |
| Lua | 5.2us | 19.2x |
| ilo VM | 5.3us | 19.5x |
| Ruby | 5.6us | 20.7x |
| ilo Interpreter | 15.9us | 59.3x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 75ns | **fastest** |
| LuaJIT | 111ns | 1.5x |
| TypeScript | 288ns | 3.8x |
| Kotlin (JVM) | 296ns | 3.9x |
| Node/V8 | 378ns | 5.0x |
| PyPy 3 | 449ns | 6.0x |
| C# (.NET) | 472ns | 6.3x |
| ilo JIT | 644ns | 8.6x |
| ilo VM | 3.3us | 43.6x |
| PHP | 4.1us | 54.8x |
| Ruby | 8.7us | 116.6x |
| Python 3 | 8.8us | 117.1x |
| Lua | 9.3us | 124.1x |
| ilo Interpreter | 56.3us | 750.6x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| TypeScript | 5.3us | **fastest** |
| Node/V8 | 5.4us | 1.0x |
| Go | 5.5us | 1.0x |
| Kotlin (JVM) | 7.9us | 1.5x |
| PHP | 8.2us | 1.5x |
| Rust (native) | 9.3us | 1.8x |
| LuaJIT | 10.0us | 1.9x |
| Ruby | 18.6us | 3.5x |
| PyPy 3 | 20.6us | 3.9x |
| Python 3 | 28.2us | 5.3x |
| C# (.NET) | 30.1us | 5.7x |
| ilo JIT | 41.7us | 7.9x |
| ilo VM | 42.8us | 8.1x |
| Lua | 48.0us | 9.1x |
| ilo Interpreter | 1.4ms | 256.6x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 526ns | **fastest** |
| Kotlin (JVM) | 994ns | 1.9x |
| Node/V8 | 1.0us | 2.0x |
| TypeScript | 1.1us | 2.1x |
| Rust (native) | 1.7us | 3.2x |
| LuaJIT | 2.8us | 5.4x |
| PyPy 3 | 4.2us | 8.0x |
| C# (.NET) | 6.5us | 12.3x |
| PHP | 27.3us | 52.0x |
| Lua | 30.8us | 58.6x |
| Ruby | 36.7us | 69.7x |
| ilo VM | 51.2us | 97.4x |
| Python 3 | 63.7us | 121.2x |
| ilo JIT | 122.6us | 233.1x |
| ilo Interpreter | 981.1us | 1865.2x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Kotlin (JVM) | 180ns | **fastest** |
| Rust (native) | 290ns | 1.6x |
| C# (.NET) | 307ns | 1.7x |
| TypeScript | 394ns | 2.2x |
| Go | 431ns | 2.4x |
| Node/V8 | 473ns | 2.6x |
| LuaJIT | 554ns | 3.1x |
| PyPy 3 | 1.2us | 6.5x |
| Lua | 3.1us | 17.1x |
| Ruby | 3.1us | 17.4x |
| PHP | 4.3us | 24.0x |
| ilo VM | 5.0us | 28.0x |
| ilo JIT | 5.1us | 28.6x |
| Python 3 | 5.9us | 32.6x |
| ilo Interpreter | 132.5us | 736.2x |

### html

*build 100 HTML strings, measure lengths*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| TypeScript | 1.9us | **fastest** |
| Node/V8 | 1.9us | 1.0x |
| Kotlin (JVM) | 3.3us | 1.8x |
| PyPy 3 | 4.5us | 2.4x |
| Go | 6.1us | 3.2x |
| C# (.NET) | 6.7us | 3.6x |
| LuaJIT | 7.1us | 3.8x |
| PHP | 10.5us | 5.6x |
| Rust (native) | 15.4us | 8.2x |
| Python 3 | 21.1us | 11.3x |
| ilo JIT | 22.6us | 12.1x |
| ilo VM | 28.6us | 15.3x |
| Ruby | 30.5us | 16.3x |
| Lua | 40.6us | 21.7x |
| ilo Interpreter | 85.1us | 45.5x |

## Methodology

- All benchmarks run on the same machine (Darwin arm64) in a single session
- Each benchmark warms up before timing begins
- Compiled languages use optimised builds (`-O2` / `-O`)
- V8 and LuaJIT benefit from JIT warmup during the iteration loop
- Results are from 2026-03-12 — run `./research/bench/run.sh` to regenerate

## Reproduce

```bash
# from the ilo repo root
cargo build --release --features cranelift
./research/bench/run.sh 10000
```

This automatically updates this page.
