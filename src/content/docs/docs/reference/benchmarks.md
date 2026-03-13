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
| Rust (native) | 280ns | **fastest** |
| TypeScript | 452ns | 1.6x |
| Kotlin (JVM) | 503ns | 1.8x |
| LuaJIT | 518ns | 1.9x |
| Node/V8 | 576ns | 2.1x |
| Go | 813ns | 2.9x |
| PyPy 3 | 1.3us | 4.5x |
| ilo JIT | 5.1us | 18.3x |
| C# (.NET) | 5.3us | 19.0x |
| Lua | 6.1us | 21.6x |
| ilo AOT | 6.3us | 22.4x |
| PHP | 6.6us | 23.5x |
| ilo VM | 14.2us | 50.6x |
| Ruby | 21.2us | 75.6x |
| Python 3 | 28.5us | 101.8x |
| ilo Interpreter | 91.9us | 328.0x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 263ns | **fastest** |
| TypeScript | 373ns | 1.4x |
| Node/V8 | 420ns | 1.6x |
| PyPy 3 | 796ns | 3.0x |
| LuaJIT | 1.1us | 4.0x |
| PHP | 1.3us | 4.9x |
| C# (.NET) | 1.9us | 7.3x |
| Python 3 | 2.3us | 8.6x |
| Kotlin (JVM) | 2.3us | 8.7x |
| ilo JIT | 3.3us | 12.6x |
| Go | 3.9us | 14.8x |
| Lua | 5.0us | 19.0x |
| ilo VM | 5.0us | 19.0x |
| Ruby | 5.3us | 20.3x |
| ilo AOT | 6.8us | 25.7x |
| ilo Interpreter | 16.4us | 62.5x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 1ns | **fastest** |
| Go | 76ns | 76.0x |
| LuaJIT | 111ns | 111.0x |
| TypeScript | 238ns | 238.0x |
| Kotlin (JVM) | 272ns | 272.0x |
| C# (.NET) | 400ns | 400.0x |
| Node/V8 | 410ns | 410.0x |
| PyPy 3 | 448ns | 448.0x |
| ilo JIT | 651ns | 651.0x |
| ilo AOT | 759ns | 759.0x |
| ilo VM | 3.4us | 3394.0x |
| PHP | 4.1us | 4112.0x |
| Python 3 | 8.5us | 8547.0x |
| Ruby | 9.0us | 9005.0x |
| Lua | 9.6us | 9597.0x |
| ilo Interpreter | 55.9us | 55890.0x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 4.9us | **fastest** |
| TypeScript | 5.3us | 1.1x |
| Node/V8 | 5.7us | 1.2x |
| Kotlin (JVM) | 7.9us | 1.6x |
| PHP | 8.3us | 1.7x |
| Rust (native) | 9.5us | 1.9x |
| LuaJIT | 9.9us | 2.0x |
| Ruby | 18.7us | 3.8x |
| PyPy 3 | 20.7us | 4.2x |
| Python 3 | 28.1us | 5.7x |
| C# (.NET) | 30.0us | 6.1x |
| ilo JIT | 41.5us | 8.4x |
| ilo VM | 42.1us | 8.5x |
| Lua | 47.8us | 9.7x |
| ilo AOT | 48.0us | 9.7x |
| ilo Interpreter | 1.4ms | 275.9x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 788ns | **fastest** |
| Kotlin (JVM) | 1.0us | 1.3x |
| TypeScript | 1.0us | 1.3x |
| Node/V8 | 1.1us | 1.4x |
| Rust (native) | 1.6us | 2.1x |
| LuaJIT | 3.0us | 3.7x |
| PyPy 3 | 4.2us | 5.4x |
| ilo JIT | 6.3us | 8.1x |
| C# (.NET) | 6.9us | 8.7x |
| ilo AOT | 7.2us | 9.1x |
| PHP | 25.8us | 32.7x |
| Lua | 31.0us | 39.3x |
| Ruby | 38.8us | 49.2x |
| ilo VM | 53.7us | 68.2x |
| Python 3 | 63.2us | 80.2x |
| ilo Interpreter | 944.9us | 1199.1x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Kotlin (JVM) | 182ns | **fastest** |
| Rust (native) | 265ns | 1.5x |
| C# (.NET) | 321ns | 1.8x |
| Go | 361ns | 2.0x |
| TypeScript | 388ns | 2.1x |
| Node/V8 | 505ns | 2.8x |
| ilo JIT | 533ns | 2.9x |
| LuaJIT | 798ns | 4.4x |
| PyPy 3 | 1.0us | 5.6x |
| ilo AOT | 1.1us | 6.1x |
| Lua | 3.1us | 16.8x |
| Ruby | 3.1us | 17.1x |
| PHP | 4.5us | 24.5x |
| ilo VM | 5.1us | 28.0x |
| Python 3 | 5.7us | 31.1x |
| ilo Interpreter | 130.8us | 718.5x |

### foreach

*build list of 100, sum via foreach*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 103ns | **fastest** |
| TypeScript | 415ns | 4.0x |
| Go | 458ns | 4.4x |
| PyPy 3 | 572ns | 5.6x |
| Node/V8 | 623ns | 6.0x |
| PHP | 1.0us | 10.0x |
| LuaJIT | 1.1us | 10.7x |
| Kotlin (JVM) | 1.2us | 11.5x |
| C# (.NET) | 1.5us | 14.5x |
| Python 3 | 2.2us | 21.4x |
| Ruby | 3.1us | 29.8x |
| Lua | 4.0us | 39.1x |
| ilo JIT | 11.0us | 106.6x |
| ilo AOT | 13.1us | 127.2x |
| ilo VM | 14.4us | 139.9x |
| ilo Interpreter | 77.7us | 754.0x |

### while

*sum 0..99 via while loop*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 1ns | **fastest** |
| TypeScript | 76ns | 76.0x |
| Node/V8 | 106ns | 106.0x |
| Go | 140ns | 140.0x |
| LuaJIT | 164ns | 164.0x |
| Kotlin (JVM) | 178ns | 178.0x |
| PyPy 3 | 263ns | 263.0x |
| ilo JIT | 420ns | 420.0x |
| C# (.NET) | 435ns | 435.0x |
| ilo AOT | 483ns | 483.0x |
| PHP | 717ns | 717.0x |
| Lua | 1.1us | 1129.0x |
| ilo VM | 1.5us | 1466.0x |
| Ruby | 2.2us | 2215.0x |
| Python 3 | 2.6us | 2615.0x |
| ilo Interpreter | 10.3us | 10346.0x |

### pipe

*chain 4 function calls × 100 (call overhead)*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 50ns | **fastest** |
| LuaJIT | 127ns | 2.5x |
| TypeScript | 164ns | 3.3x |
| Node/V8 | 202ns | 4.0x |
| Kotlin (JVM) | 226ns | 4.5x |
| PyPy 3 | 476ns | 9.5x |
| ilo JIT | 560ns | 11.2x |
| Rust (native) | 569ns | 11.4x |
| C# (.NET) | 732ns | 14.6x |
| ilo AOT | 1.1us | 22.1x |
| Lua | 4.8us | 96.3x |
| Ruby | 6.3us | 126.1x |
| PHP | 6.5us | 130.9x |
| ilo VM | 6.6us | 131.2x |
| Python 3 | 10.3us | 205.2x |
| ilo Interpreter | 149.7us | 2994.3x |

### file

*read JSON file, parse 20 records, sum scores*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 10.5us | **fastest** |
| TypeScript | 12.1us | 1.2x |
| Node/V8 | 12.3us | 1.2x |
| PHP | 14.5us | 1.4x |
| LuaJIT | 14.5us | 1.4x |
| Lua | 14.9us | 1.4x |
| ilo VM | 16.5us | 1.6x |
| ilo JIT | 16.8us | 1.6x |
| Ruby | 18.5us | 1.8x |
| ilo AOT | 18.7us | 1.8x |
| Go | 19.3us | 1.8x |
| Python 3 | 19.3us | 1.8x |
| C# (.NET) | 21.9us | 2.1x |
| PyPy 3 | 22.4us | 2.1x |
| ilo Interpreter | 32.5us | 3.1x |

### api

*HTTP GET JSON, parse 20 records, sum scores*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| PyPy 3 | 754ns | **fastest** |
| Python 3 | 2.2us | 2.9x |
| ilo AOT | 168.8us | 223.9x |
| ilo Interpreter | 179.2us | 237.7x |
| PHP | 182.3us | 241.7x |
| Go | 197.5us | 262.0x |
| Node/V8 | 271.5us | 360.0x |
| TypeScript | 278.0us | 368.7x |
| Ruby | 284.7us | 377.6x |
| ilo JIT | 2.5ms | 3329.0x |
| ilo VM | 3.3ms | 4370.8x |

## Methodology

- All benchmarks run on the same machine (Darwin arm64) in a single session
- Each benchmark warms up before timing begins
- Compiled languages use optimised builds (`-O2` / `-O`)
- V8 and LuaJIT benefit from JIT warmup during the iteration loop
- Results are from 2026-03-13
