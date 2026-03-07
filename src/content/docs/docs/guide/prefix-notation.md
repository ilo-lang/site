---
title: Prefix Notation
description: How prefix notation saves tokens and characters
---

Prefix notation is ilo's core token-saving device. Operators come before their operands.

## Basic examples

| Infix (traditional) | Prefix (ilo) | Chars saved |
|---|---|---|
| `(a * b) + c` | `+*a b c` | 4 |
| `((a + b) * c) >= 100` | `>=*+a b c 100` | 7 |
| `a > 0` | `>a 0` | 0 |

## Why prefix wins

Across 25 expression patterns: **22% fewer tokens, 42% fewer characters** vs infix.

Prefix eliminates:
- Parentheses for grouping
- Operator precedence ambiguity
- Nesting depth

```
# Infix: 5 tokens, 13 chars
(a + b) * c

# Prefix: 4 tokens, 7 chars
*+a b c
```

## Reading prefix

Read inside-out, left-to-right:

```
+*a b c
│└─┤
│  multiply a and b
└── add result and c
```

## Infix also works

ilo supports infix for simple expressions:

```
a + b        # works
x * y + 1    # works
```

But prefix is preferred because it's always unambiguous and uses fewer tokens.
