---
title: Introduction
description: What is ilo and why does it exist?
---

**ilo** is a token-optimised programming language for AI agents. Named from [Toki Pona](https://sona.pona.la/wiki/ilo) for "tool", it's designed to minimise the total token cost when AI agents write and run programs.

## The problem

AI agents pay three costs per program:

1. **Generation tokens** — producing the code
2. **Error feedback** — reading error messages when something goes wrong
3. **Retries** — regenerating after failures

Traditional languages weren't designed for this. Python's `def total(price: float, quantity: int, rate: float) -> float:` is readable for humans but expensive for agents.

## The solution

ilo cuts all three costs:

| | Python | ilo | Saving |
|---|---|---|---|
| Tokens | ~30 | ~10 | **67%** |
| Characters | ~90 | ~20 | **78%** |

- **Prefix notation** eliminates parentheses: `+*a b c` instead of `(a * b) + c`
- **Type verification** catches errors before execution with compact codes (`ILO-T004`)
- **Constrained vocabulary** means fewer wrong choices and fewer retries

## Quick example

```bash
# Run inline
ilo 'tot p:n q:n r:n>n;s=*p q;t=*s r;+s t' 10 20 30

# Run from file
ilo program.ilo funcname args
```

## Next steps

- [Install ilo](/docs/installation/)
- [Write your first program](/docs/first-program/)
- [Read the full specification](/docs/reference/spec/)
