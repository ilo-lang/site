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
| TypeScript | 427ns | **fastest** |
| Kotlin (JVM) | 492ns | 1.2x |
| Rust (native) | 496ns | 1.2x |
| LuaJIT | 513ns | 1.2x |
| Node/V8 | 569ns | 1.3x |
| Go | 705ns | 1.7x |
| PyPy 3 | 1.2us | 2.9x |
| ilo JIT | 1.3us | 3.2x |
| ilo AOT | 1.8us | 4.3x |
| Lua | 4.0us | 9.4x |
| C# (.NET) | 6.2us | 14.5x |
| PHP | 6.4us | 15.0x |
| ilo VM | 11.3us | 26.5x |
| Ruby | 19.8us | 46.4x |
| Python 3 | 28.1us | 65.8x |
| ilo Interpreter | 91.4us | 214.0x |

### string

*build 100-iteration realistic string (item-N, CSV-style)*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| TypeScript | 1.2us | **fastest** |
| Node/V8 | 1.3us | 1.1x |
| PyPy 3 | 2.0us | 1.7x |
| Rust (native) | 3.7us | 3.1x |
| PHP | 4.0us | 3.3x |
| ilo JIT | 5.0us | 4.2x |
| Kotlin (JVM) | 8.2us | 6.8x |
| ilo VM | 10.5us | 8.7x |
| Python 3 | 12.0us | 9.9x |
| ilo AOT | 12.9us | 10.6x |
| C# (.NET) | 14.6us | 12.1x |
| Go | 17.2us | 14.2x |
| LuaJIT | 19.0us | 15.7x |
| Ruby | 26.0us | 21.5x |
| Lua | 39.8us | 32.9x |
| ilo Interpreter | 61.2us | 50.6x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 107ns | **fastest** |
| LuaJIT | 149ns | 1.4x |
| TypeScript | 236ns | 2.2x |
| Kotlin (JVM) | 265ns | 2.5x |
| Node/V8 | 354ns | 3.3x |
| PyPy 3 | 445ns | 4.2x |
| ilo JIT | 504ns | 4.7x |
| C# (.NET) | 554ns | 5.2x |
| ilo AOT | 1.1us | 10.4x |
| ilo VM | 3.1us | 28.6x |
| PHP | 4.0us | 37.7x |
| Lua | 7.5us | 70.5x |
| Python 3 | 8.5us | 79.8x |
| Ruby | 8.7us | 80.9x |
| ilo Interpreter | 54.3us | 507.9x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Node/V8 | 5.3us | **fastest** |
| TypeScript | 5.4us | 1.0x |
| Go | 6.2us | 1.2x |
| Kotlin (JVM) | 7.8us | 1.5x |
| PHP | 8.2us | 1.6x |
| LuaJIT | 9.8us | 1.9x |
| Rust (native) | 9.9us | 1.9x |
| Ruby | 18.4us | 3.5x |
| PyPy 3 | 20.5us | 3.9x |
| ilo JIT | 26.2us | 5.0x |
| Python 3 | 28.0us | 5.3x |
| C# (.NET) | 29.9us | 5.7x |
| ilo VM | 31.6us | 6.0x |
| ilo AOT | 33.0us | 6.3x |
| Lua | 49.2us | 9.3x |
| ilo Interpreter | 1.3ms | 251.8x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 738ns | **fastest** |
| Kotlin (JVM) | 1.0us | 1.4x |
| TypeScript | 1.0us | 1.4x |
| Node/V8 | 1.0us | 1.4x |
| Rust (native) | 1.8us | 2.4x |
| ilo JIT | 3.2us | 4.4x |
| LuaJIT | 3.5us | 4.7x |
| PyPy 3 | 4.3us | 5.8x |
| ilo AOT | 5.3us | 7.2x |
| C# (.NET) | 6.8us | 9.2x |
| PHP | 25.8us | 35.0x |
| Lua | 27.0us | 36.5x |
| Ruby | 38.5us | 52.2x |
| ilo VM | 53.5us | 72.4x |
| Python 3 | 63.3us | 85.7x |
| ilo Interpreter | 1.0ms | 1357.6x |

### recurse

*fibonacci(20) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Kotlin (JVM) | 17.4us | **fastest** |
| Rust (native) | 18.8us | 1.1x |
| Go | 21.5us | 1.2x |
| C# (.NET) | 24.7us | 1.4x |
| LuaJIT | 28.7us | 1.6x |
| ilo JIT | 37.2us | 2.1x |
| ilo AOT | 37.3us | 2.1x |
| TypeScript | 45.9us | 2.6x |
| Node/V8 | 46.7us | 2.7x |
| PyPy 3 | 107.1us | 6.2x |
| Lua | 339.1us | 19.5x |
| Ruby | 373.0us | 21.4x |
| ilo VM | 528.3us | 30.3x |
| PHP | 552.9us | 31.7x |
| Python 3 | 717.2us | 41.2x |
| ilo Interpreter | 17.4ms | 998.8x |

### foreach

*build list of 100, sum via foreach*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 44ns | **fastest** |
| Go | 162ns | 3.7x |
| TypeScript | 421ns | 9.6x |
| Node/V8 | 480ns | 10.9x |
| PyPy 3 | 605ns | 13.8x |
| LuaJIT | 676ns | 15.4x |
| ilo JIT | 935ns | 21.2x |
| ilo AOT | 1.1us | 24.8x |
| PHP | 1.1us | 25.5x |
| C# (.NET) | 1.2us | 26.6x |
| Kotlin (JVM) | 1.2us | 27.0x |
| Python 3 | 2.1us | 48.7x |
| ilo VM | 2.4us | 54.1x |
| Ruby | 3.2us | 73.2x |
| Lua | 3.8us | 87.3x |
| ilo Interpreter | 84.2us | 1914.3x |

### while

*sum 0..99 via while loop*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 30ns | **fastest** |
| LuaJIT | 48ns | 1.6x |
| TypeScript | 75ns | 2.5x |
| Node/V8 | 81ns | 2.7x |
| ilo AOT | 148ns | 4.9x |
| ilo JIT | 150ns | 5.0x |
| Kotlin (JVM) | 168ns | 5.6x |
| PyPy 3 | 286ns | 9.5x |
| C# (.NET) | 417ns | 13.9x |
| PHP | 767ns | 25.6x |
| Lua | 967ns | 32.2x |
| ilo VM | 1.2us | 41.2x |
| Ruby | 2.3us | 76.2x |
| Python 3 | 2.7us | 88.7x |
| ilo Interpreter | 10.6us | 354.8x |

### pipe

*chain 4 function calls × 100 (call overhead)*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 31ns | **fastest** |
| LuaJIT | 85ns | 2.7x |
| ilo JIT | 125ns | 4.0x |
| ilo AOT | 126ns | 4.1x |
| TypeScript | 167ns | 5.4x |
| Node/V8 | 191ns | 6.2x |
| Kotlin (JVM) | 226ns | 7.3x |
| Rust (native) | 254ns | 8.2x |
| PyPy 3 | 470ns | 15.2x |
| C# (.NET) | 610ns | 19.7x |
| Lua | 4.3us | 137.2x |
| Ruby | 6.3us | 204.7x |
| PHP | 6.7us | 216.2x |
| ilo VM | 7.0us | 224.3x |
| Python 3 | 11.0us | 355.1x |
| ilo Interpreter | 155.1us | 5003.9x |

### file

*read JSON file, parse 20 records, sum scores*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 9.3us | **fastest** |
| Node/V8 | 12.4us | 1.3x |
| TypeScript | 12.7us | 1.4x |
| LuaJIT | 14.7us | 1.6x |
| PHP | 15.3us | 1.7x |
| Lua | 16.1us | 1.7x |
| ilo JIT | 16.5us | 1.8x |
| ilo VM | 16.9us | 1.8x |
| Kotlin (JVM) | 18.6us | 2.0x |
| Go | 19.0us | 2.0x |
| Ruby | 19.6us | 2.1x |
| Python 3 | 20.9us | 2.3x |
| C# (.NET) | 22.7us | 2.4x |
| PyPy 3 | 24.7us | 2.7x |
| ilo Interpreter | 32.3us | 3.5x |

### api

*HTTP GET JSON, parse 20 records, sum scores*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| PyPy 3 | 2.0us | **fastest** |
| Python 3 | 12.2us | 6.1x |
| Lua | 54.3us | 27.4x |
| LuaJIT | 63.2us | 31.9x |
| Rust (native) | 159.0us | 80.1x |
| ilo VM | 171.1us | 86.2x |
| PHP | 173.9us | 87.6x |
| ilo Interpreter | 174.7us | 88.0x |
| Kotlin (JVM) | 183.4us | 92.4x |
| Go | 200.0us | 100.8x |
| C# (.NET) | 228.8us | 115.3x |
| Ruby | 269.2us | 135.6x |
| Node/V8 | 284.5us | 143.3x |
| TypeScript | 310.2us | 156.3x |
| ilo JIT | 1.7ms | 880.2x |

## Methodology

- All benchmarks run on the same machine (Darwin arm64) in a single session
- Each benchmark warms up before timing begins
- Compiled languages use optimised builds (`-O2` / `-O`)
- V8 and LuaJIT benefit from JIT warmup during the iteration loop
- Results are from 2026-03-14
