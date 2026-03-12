---
title: Benchmarks
description: Runtime performance comparison of ilo against other languages
---

Micro-benchmarks comparing ilo's execution engines against compiled, JIT, and interpreted languages. Each benchmark runs **10000 iterations** and reports the median per-call time in nanoseconds.

:::note
These are micro-benchmarks — they measure raw execution speed, not end-to-end agent workflow performance. ilo's primary optimisation target is **total token cost** (generation + errors + retries), not runtime speed.
:::

## Execution engines

ilo has four execution backends:

| Backend | Flag | Notes |
|---------|------|-------|
| **ilo AOT** | `ilo compile` | Cranelift ahead-of-time compiler → standalone native binary |
| **ilo JIT** | `ilo` *(default)* | Cranelift-based just-in-time compiler |
| **ilo VM** | `ilo --run-vm` | Register-based bytecode virtual machine |
| **Interpreter** | `ilo --run-tree` | Tree-walking interpreter (simplest, slowest) |

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
| Rust (native) | 232ns | **fastest** |
| TypeScript | 450ns | 1.9x |
| Kotlin (JVM) | 502ns | 2.2x |
| Node/V8 | 504ns | 2.2x |
| Go | 550ns | 2.4x |
| LuaJIT | 557ns | 2.4x |
| PyPy 3 | 813ns | 3.5x |
| ilo JIT | 5.0us | 21.6x |
| C# (.NET) | 5.6us | 24.0x |
| Lua | 5.9us | 25.4x |
| PHP | 6.5us | 28.1x |
| ilo VM | 13.3us | 57.5x |
| Ruby | 21.3us | 91.8x |
| Python 3 | 28.5us | 123.1x |
| ilo Interpreter | 94.5us | 407.4x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 208ns | **fastest** |
| TypeScript | 381ns | 1.8x |
| Node/V8 | 437ns | 2.1x |
| PyPy 3 | 764ns | 3.7x |
| LuaJIT | 880ns | 4.2x |
| PHP | 1.3us | 6.1x |
| Python 3 | 2.2us | 10.5x |
| Kotlin (JVM) | 2.2us | 10.5x |
| C# (.NET) | 2.3us | 11.1x |
| ilo JIT | 3.2us | 15.6x |
| Go | 4.8us | 23.1x |
| ilo VM | 4.9us | 23.6x |
| Lua | 5.0us | 23.9x |
| Ruby | 5.1us | 24.3x |
| ilo Interpreter | 16.9us | 81.4x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 1ns | **fastest** |
| Go | 57ns | 57.0x |
| LuaJIT | 145ns | 145.0x |
| TypeScript | 231ns | 231.0x |
| Kotlin (JVM) | 283ns | 283.0x |
| Node/V8 | 355ns | 355.0x |
| PyPy 3 | 458ns | 458.0x |
| C# (.NET) | 569ns | 569.0x |
| ilo JIT | 643ns | 643.0x |
| ilo VM | 3.2us | 3215.0x |
| PHP | 4.1us | 4090.0x |
| Python 3 | 8.6us | 8597.0x |
| Ruby | 8.9us | 8894.0x |
| Lua | 9.5us | 9459.0x |
| ilo Interpreter | 54.8us | 54807.0x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| TypeScript | 5.4us | **fastest** |
| Node/V8 | 5.5us | 1.0x |
| Go | 5.9us | 1.1x |
| Kotlin (JVM) | 8.1us | 1.5x |
| PHP | 8.5us | 1.6x |
| Rust (native) | 8.7us | 1.6x |
| LuaJIT | 9.7us | 1.8x |
| Ruby | 19.7us | 3.6x |
| PyPy 3 | 21.3us | 3.9x |
| Python 3 | 28.8us | 5.3x |
| C# (.NET) | 30.7us | 5.6x |
| ilo JIT | 40.8us | 7.5x |
| ilo VM | 42.7us | 7.9x |
| Lua | 47.6us | 8.8x |
| ilo Interpreter | 1.4ms | 252.0x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 457ns | **fastest** |
| Kotlin (JVM) | 1.0us | 2.2x |
| TypeScript | 1.0us | 2.3x |
| Node/V8 | 1.1us | 2.3x |
| Rust (native) | 1.4us | 3.1x |
| LuaJIT | 1.9us | 4.2x |
| PyPy 3 | 4.5us | 9.8x |
| C# (.NET) | 7.1us | 15.6x |
| PHP | 26.2us | 57.3x |
| Lua | 31.2us | 68.2x |
| Ruby | 38.4us | 84.0x |
| ilo VM | 51.1us | 111.8x |
| Python 3 | 65.1us | 142.4x |
| ilo JIT | 132.8us | 290.7x |
| ilo Interpreter | 967.8us | 2117.7x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 141ns | **fastest** |
| Go | 169ns | 1.2x |
| Kotlin (JVM) | 194ns | 1.4x |
| C# (.NET) | 244ns | 1.7x |
| LuaJIT | 249ns | 1.8x |
| TypeScript | 391ns | 2.8x |
| Node/V8 | 414ns | 2.9x |
| PyPy 3 | 1.1us | 7.5x |
| Ruby | 3.2us | 22.4x |
| Lua | 3.2us | 22.6x |
| PHP | 4.5us | 31.9x |
| ilo JIT | 5.1us | 36.0x |
| ilo VM | 5.1us | 36.4x |
| Python 3 | 5.9us | 42.0x |
| ilo Interpreter | 136.9us | 971.1x |

### api

*read JSON file, parse 20 records, sum scores*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 10.5us | **fastest** |
| Node/V8 | 12.2us | 1.2x |
| TypeScript | 12.6us | 1.2x |
| LuaJIT | 14.6us | 1.4x |
| PHP | 15.7us | 1.5x |
| Lua | 15.9us | 1.5x |
| ilo VM | 17.7us | 1.7x |
| Go | 19.7us | 1.9x |
| Ruby | 19.8us | 1.9x |
| Python 3 | 20.9us | 2.0x |
| C# (.NET) | 23.1us | 2.2x |
| PyPy 3 | 26.5us | 2.5x |
| ilo Interpreter | 34.0us | 3.2x |

## Methodology

- All benchmarks run on the same machine (Darwin arm64) in a single session
- Each benchmark warms up before timing begins
- Compiled languages use optimised builds (`-O2` / `-O`)
- V8 and LuaJIT benefit from JIT warmup during the iteration loop
- Results are from 2026-03-12
