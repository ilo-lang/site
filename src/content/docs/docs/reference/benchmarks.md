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
| Rust (native) | 184ns | **fastest** |
| TypeScript | 442ns | 2.4x |
| Kotlin (JVM) | 507ns | 2.8x |
| LuaJIT | 519ns | 2.8x |
| Node/V8 | 600ns | 3.3x |
| Go | 713ns | 3.9x |
| PyPy 3 | 775ns | 4.2x |
| ilo JIT | 4.1us | 22.5x |
| C# (.NET) | 5.4us | 29.6x |
| Lua | 6.0us | 32.6x |
| PHP | 6.5us | 35.2x |
| ilo VM | 13.4us | 72.6x |
| Ruby | 20.9us | 113.4x |
| Python 3 | 28.4us | 154.5x |
| ilo Interpreter | 92.9us | 505.1x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 267ns | **fastest** |
| TypeScript | 381ns | 1.4x |
| Node/V8 | 430ns | 1.6x |
| PyPy 3 | 768ns | 2.9x |
| LuaJIT | 997ns | 3.7x |
| PHP | 1.3us | 4.7x |
| Python 3 | 2.2us | 8.1x |
| C# (.NET) | 2.2us | 8.1x |
| Kotlin (JVM) | 2.3us | 8.6x |
| ilo JIT | 3.2us | 12.1x |
| Go | 4.5us | 17.0x |
| ilo VM | 4.9us | 18.4x |
| Lua | 4.9us | 18.5x |
| Ruby | 5.3us | 19.7x |
| ilo Interpreter | 16.4us | 61.4x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 1ns | **fastest** |
| Go | 68ns | 68.0x |
| LuaJIT | 128ns | 128.0x |
| TypeScript | 241ns | 241.0x |
| Kotlin (JVM) | 313ns | 313.0x |
| Node/V8 | 325ns | 325.0x |
| C# (.NET) | 415ns | 415.0x |
| PyPy 3 | 483ns | 483.0x |
| ilo JIT | 641ns | 641.0x |
| ilo VM | 3.3us | 3282.0x |
| PHP | 4.1us | 4066.0x |
| Python 3 | 8.7us | 8696.0x |
| Ruby | 8.7us | 8730.0x |
| Lua | 9.5us | 9538.0x |
| ilo Interpreter | 55.8us | 55750.0x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Node/V8 | 5.5us | **fastest** |
| TypeScript | 5.7us | 1.0x |
| Go | 6.3us | 1.2x |
| Kotlin (JVM) | 7.8us | 1.4x |
| PHP | 8.3us | 1.5x |
| Rust (native) | 9.3us | 1.7x |
| LuaJIT | 9.9us | 1.8x |
| Ruby | 18.5us | 3.4x |
| PyPy 3 | 21.0us | 3.8x |
| Python 3 | 28.4us | 5.2x |
| C# (.NET) | 29.6us | 5.4x |
| ilo JIT | 41.3us | 7.6x |
| ilo VM | 42.3us | 7.7x |
| Lua | 46.5us | 8.5x |
| ilo Interpreter | 1.3ms | 246.0x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 772ns | **fastest** |
| Kotlin (JVM) | 1.0us | 1.3x |
| TypeScript | 1.0us | 1.3x |
| Node/V8 | 1.1us | 1.4x |
| Rust (native) | 1.6us | 2.1x |
| LuaJIT | 2.9us | 3.8x |
| PyPy 3 | 4.2us | 5.4x |
| C# (.NET) | 6.9us | 9.0x |
| PHP | 25.7us | 33.3x |
| Lua | 31.0us | 40.2x |
| Ruby | 39.8us | 51.6x |
| ilo VM | 50.4us | 65.2x |
| Python 3 | 63.0us | 81.6x |
| ilo JIT | 123.5us | 160.0x |
| ilo Interpreter | 946.6us | 1226.1x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Kotlin (JVM) | 197ns | **fastest** |
| Rust (native) | 288ns | 1.5x |
| C# (.NET) | 342ns | 1.7x |
| TypeScript | 393ns | 2.0x |
| Go | 469ns | 2.4x |
| Node/V8 | 545ns | 2.8x |
| LuaJIT | 802ns | 4.1x |
| PyPy 3 | 1.0us | 5.2x |
| Ruby | 3.0us | 15.1x |
| Lua | 3.1us | 15.8x |
| PHP | 4.4us | 22.4x |
| ilo JIT | 5.1us | 25.8x |
| ilo VM | 5.1us | 26.0x |
| Python 3 | 5.7us | 29.1x |
| ilo Interpreter | 132.5us | 672.3x |

### html

*build 100 HTML strings, measure lengths*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| TypeScript | 1.9us | **fastest** |
| Node/V8 | 1.9us | 1.0x |
| Kotlin (JVM) | 3.4us | 1.8x |
| PyPy 3 | 4.3us | 2.3x |
| C# (.NET) | 6.6us | 3.6x |
| LuaJIT | 6.8us | 3.7x |
| Go | 7.4us | 4.0x |
| PHP | 10.4us | 5.6x |
| Rust (native) | 14.9us | 8.0x |
| Python 3 | 21.8us | 11.8x |
| ilo JIT | 22.1us | 11.9x |
| ilo VM | 27.3us | 14.8x |
| Ruby | 30.9us | 16.7x |
| Lua | 41.3us | 22.3x |
| ilo Interpreter | 83.9us | 45.4x |

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
