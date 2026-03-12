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
| Rust (native) | 119ns | **fastest** |
| Go | 287ns | 2.4x |
| LuaJIT | 288ns | 2.4x |
| TypeScript | 446ns | 3.7x |
| Node/V8 | 455ns | 3.8x |
| ilo JIT | 4.2us | 35.2x |
| Lua | 6.0us | 50.7x |
| PHP | 6.5us | 54.9x |
| ilo VM | 13.7us | 115.4x |
| Ruby | 23.8us | 199.9x |
| Python 3 | 41.4us | 348.0x |

### string

*build 100-char string via concat*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 134ns | **fastest** |
| TypeScript | 395ns | 2.9x |
| Node/V8 | 438ns | 3.3x |
| LuaJIT | 768ns | 5.7x |
| PHP | 1.3us | 9.9x |
| Go | 2.3us | 17.1x |
| Python 3 | 2.7us | 19.8x |
| ilo JIT | 3.3us | 24.7x |
| ilo VM | 5.2us | 38.8x |
| Lua | 5.6us | 41.5x |
| Ruby | 9.4us | 69.9x |

### record

*create 100 structs, sum fields*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 30ns | **fastest** |
| LuaJIT | 59ns | 2.0x |
| TypeScript | 266ns | 8.9x |
| Node/V8 | 295ns | 9.8x |
| ilo JIT | 655ns | 21.8x |
| ilo VM | 3.3us | 111.4x |
| PHP | 4.1us | 136.6x |
| Lua | 9.7us | 321.7x |
| Ruby | 10.8us | 359.5x |
| Python 3 | 15.5us | 517.4x |

### mixed

*build 100 records, JSON-serialise*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 5.1us | **fastest** |
| TypeScript | 5.4us | 1.1x |
| Node/V8 | 5.7us | 1.1x |
| Rust (native) | 8.3us | 1.6x |
| PHP | 8.5us | 1.7x |
| LuaJIT | 10.4us | 2.1x |
| ilo JIT | 40.8us | 8.0x |
| ilo VM | 42.8us | 8.4x |
| Python 3 | 44.6us | 8.8x |
| Lua | 48.0us | 9.4x |

### guards

*classify 1000 values via guard chains*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Go | 285ns | **fastest** |
| Rust (native) | 836ns | 2.9x |
| Node/V8 | 1.0us | 3.7x |
| TypeScript | 1.0us | 3.7x |
| LuaJIT | 1.7us | 5.9x |
| PHP | 25.8us | 90.7x |
| Lua | 30.6us | 107.5x |
| ilo VM | 50.5us | 177.2x |
| Ruby | 62.8us | 220.5x |
| Python 3 | 87.4us | 306.6x |
| ilo JIT | 124.0us | 435.0x |

### recurse

*fibonacci(10) — recursive calls*

| Language | ns/call | vs fastest |
|----------|--------:|------------|
| Rust (native) | 259ns | **fastest** |
| TypeScript | 400ns | 1.5x |
| Go | 408ns | 1.6x |
| Node/V8 | 525ns | 2.0x |
| LuaJIT | 757ns | 2.9x |
| Lua | 3.2us | 12.3x |
| PHP | 4.4us | 16.9x |
| Ruby | 4.7us | 18.0x |
| ilo VM | 4.9us | 19.0x |
| ilo JIT | 5.0us | 19.4x |
| Python 3 | 9.3us | 35.8x |

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
