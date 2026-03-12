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

- **ilo VM** — register-based bytecode virtual machine (default)
- **ilo JIT** — Cranelift-based just-in-time compiler (opt-in via `--features cranelift`)

## Languages tested

| Category | Languages |
|----------|-----------|
| **Compiled (AOT)** | Rust (`rustc -O`), Go |
| **JIT** | LuaJIT, Node.js (V8), TypeScript (tsx/V8) |
| **ilo** | ilo VM, ilo JIT |
| **Interpreted** | Lua, Ruby, PHP, Python 3 (CPython) |

## Results


### numeric

*sum 1..1000 (pure arithmetic loop)*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 139ns | **fastest** |
| LuaJIT | 430ns | 3.1x |
| TypeScript | 436ns | 3.1x |
| Go | 473ns | 3.4x |
| Node/V8 | 477ns | 3.4x |
| ilo JIT | 4.2us | 30.1x |
| Lua | 6.0us | 42.8x |
| PHP | 6.5us | 46.9x |
| ilo VM | 13.5us | 96.8x |
| Ruby | 22.5us | 161.8x |
| Python 3 | 42.1us | 302.8x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 308ns | **fastest** |
| TypeScript | 393ns | 1.3x |
| Node/V8 | 446ns | 1.4x |
| LuaJIT | 923ns | 3.0x |
| PHP | 1.3us | 4.2x |
| Python 3 | 2.5us | 8.2x |
| ilo JIT | 3.3us | 10.7x |
| Go | 4.3us | 14.0x |
| ilo VM | 5.0us | 16.1x |
| Lua | 5.0us | 16.1x |
| Ruby | 9.0us | 29.1x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 58ns | **fastest** |
| LuaJIT | 107ns | 1.8x |
| TypeScript | 231ns | 4.0x |
| Node/V8 | 344ns | 5.9x |
| ilo JIT | 638ns | 11.0x |
| ilo VM | 3.2us | 55.9x |
| PHP | 4.2us | 72.3x |
| Lua | 9.5us | 163.7x |
| Ruby | 10.7us | 184.3x |
| Python 3 | 15.3us | 263.3x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Node/V8 | 5.3us | **fastest** |
| TypeScript | 5.3us | 1.0x |
| Go | 6.2us | 1.2x |
| PHP | 8.4us | 1.6x |
| Rust (native) | 9.5us | 1.8x |
| LuaJIT | 10.2us | 1.9x |
| ilo JIT | 40.8us | 7.7x |
| ilo VM | 41.4us | 7.8x |
| Python 3 | 43.1us | 8.2x |
| Lua | 48.8us | 9.3x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 646ns | **fastest** |
| TypeScript | 1.0us | 1.6x |
| Node/V8 | 1.1us | 1.8x |
| Rust (native) | 1.5us | 2.3x |
| LuaJIT | 2.7us | 4.1x |
| PHP | 26.4us | 40.9x |
| Lua | 31.2us | 48.2x |
| ilo VM | 51.4us | 79.5x |
| Ruby | 63.4us | 98.1x |
| Python 3 | 88.6us | 137.2x |
| ilo JIT | 123.0us | 190.4x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 276ns | **fastest** |
| Go | 366ns | 1.3x |
| TypeScript | 375ns | 1.4x |
| Node/V8 | 462ns | 1.7x |
| LuaJIT | 764ns | 2.8x |
| Lua | 3.1us | 11.1x |
| PHP | 4.3us | 15.7x |
| Ruby | 4.7us | 16.9x |
| ilo VM | 4.9us | 17.8x |
| ilo JIT | 5.0us | 18.2x |
| Python 3 | 9.2us | 33.5x |

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
