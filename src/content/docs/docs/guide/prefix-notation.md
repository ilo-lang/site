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

```ilo
(a + b) * c  -- Infix: 5 tokens, 13 chars

*+a b c      -- Prefix: 4 tokens, 7 chars
```

## Reading prefix

Read inside-out, left-to-right:

| Expression | Meaning |
|------------|---------|
| `+a b` | add a and b |
| `* _ c` | multiply result and c |

## Infix also works

ilo supports infix too:

```ilo
a + b        -- works
x * y + 1    -- works
```

But prefix is preferred because it's always unambiguous and uses fewer tokens.

## Complete operator table

### Binary operators

| Prefix | Infix | Meaning | Types |
|--------|-------|---------|-------|
| `+a b` | `a + b` | add / concat / list concat | `n`, `t`, `L` |
| `+=a v` | | append to list | `L` |
| `-a b` | `a - b` | subtract | `n` |
| `*a b` | `a * b` | multiply | `n` |
| `/a b` | `a / b` | divide | `n` |
| `=a b` | `a == b` | equal | any |
| `!=a b` | `a != b` | not equal | any |
| `>a b` | `a > b` | greater than | `n`, `t` |
| `<a b` | `a < b` | less than | `n`, `t` |
| `>=a b` | `a >= b` | greater or equal | `n`, `t` |
| `<=a b` | `a <= b` | less or equal | `n`, `t` |
| `&a b` | `a & b` | logical AND (short-circuit) | any (truthy) |
| `\|a b` | `a \| b` | logical OR (short-circuit) | any (truthy) |

### Unary operators

| Op | Meaning | Types |
|----|---------|-------|
| `-x` | negate | `n` |
| `!x` | logical NOT | any (truthy) |

### Special infix

| Op | Meaning |
|----|---------|
| `a??b` | nil-coalesce (if a is nil, return b) |
| `a>>f` | pipe (desugars to `f(a)`) |

## When to use prefix vs infix

**Use prefix** (the default) when:
- You have nested operations -- prefix eliminates all parentheses
- You want maximum token density
- You are generating code for AI consumption

**Use infix** when:
- A single flat operation reads more naturally: `x + 1`
- You prefer traditional syntax for simple expressions

Both produce identical results. Prefix is the canonical form that the formatter emits.

### Infix precedence

When using infix, standard mathematical precedence applies (higher binds tighter):

| Level | Operators |
|-------|-----------|
| 6 | `*` `/` |
| 5 | `+` `-` |
| 4 | `>` `<` `>=` `<=` |
| 3 | `=` `!=` |
| 2 | `&` |
| 1 | `\|` |

Function application binds tighter than all infix operators:

```ilo
f a + b     -- means (f a) + b, NOT f(a + b)
```

## Token and character savings by pattern

Measured across 25 expression patterns using the `cl100k_base` tokenizer (used by Claude):

| Pattern | Infix | Prefix | Char savings |
|---------|-------|--------|-------------|
| Binary op | `a + b` | `+a b` | 1 char |
| Nested (2 deep) | `(a * b) + c` | `+*a b c` | 4 chars |
| Nested (3 deep) | `((a + b) * c) >= 100` | `>=*+a b c 100` | 6 chars |
| Chained comparison | `x >= 0 and x <= 100` | `&>=x 0 <=x 100` | 4 chars |
| Negation | `not (a == b)` | `!=a b` | 8 chars |

The key insight: each nested prefix operator saves 2 characters (no parentheses needed). Flat binary expressions save 1 character. The deeper the nesting, the bigger the savings.

Overall: **22% fewer tokens, 42% fewer characters** vs infix.

## More nesting examples

Prefix operators nest by each operator greedily consuming the next two operands. Those operands can themselves be operator expressions:

```ilo
-- Two levels: (a * b) + c
+*a b c

-- Two levels, right-heavy: a * (b + c)
*a +b c

-- Three levels: ((a + b) * c) >= 100
>=*+a b c 100

-- Symmetric: (a * b) - (c * d)
-*a b *c d

-- Four levels: (((a + b) * c) - d) / e
/-*+a b c d e

-- Mixed comparisons: (x + y) >= (a * b)
>=+x y *a b
```

### Reading deeply nested prefix

Read left-to-right. Each operator grabs the next two values (which may themselves be operator expressions):

```
/-*+a b c d e
│ │ │ └─┤
│ │ │   add a and b
│ │ └───┤
│ │     multiply result and c
│ └─────┤
│       subtract d from result
└───────┤
        divide result by e
```

This is equivalent to `(((a + b) * c) - d) / e` in infix -- note how 4 pairs of parentheses disappear entirely.

### Operand rules

Operator operands must be atoms (literals, variable references, field access) or nested prefix operators. Function calls are not valid operands -- bind their results first:

```ilo
-- WRONG: *n fac -n 1    (fac is treated as an atom, not a call)
-- RIGHT: r=fac -n 1;*n r (bind the call result, then use it)
```
