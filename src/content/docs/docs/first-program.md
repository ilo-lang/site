---
title: Your First Program
description: Write and run your first ilo program
---

## Hello, ilo

The simplest ilo program is a function that returns a value:

```bash
ilo 'greet name:t>t;cat "hello " name' "world"
# → hello world
```

Let's break it down:

| Part | Meaning |
|------|---------|
| `greet` | Function name |
| `name:t` | Parameter `name` of type `t` (text) |
| `>t` | Returns type `t` (text) |
| `;` | Statement separator |
| `cat "hello " name` | Concatenate two strings |

## Types

ilo has a small set of types:

| Sigil | Type | Example |
|-------|------|---------|
| `n` | Number | `42`, `3.14` |
| `t` | Text | `"hello"` |
| `b` | Boolean | `true`, `false` |
| `?` | Any | accepts any type |
| `L` | List | `[1 2 3]` |
| `M` | Map | `{"a" 1}` |
| `R` | Result | success or error |

## Arithmetic with prefix notation

```bash
ilo 'add a:n b:n>n;+a b' 3 4
# → 7

ilo 'calc a:n b:n c:n>n;+*a b c' 2 3 10
# → 16  (2 * 3 + 10)
```

Prefix notation reads inside-out: `+*a b c` means `(a * b) + c`.

## Variables

Use `=` to bind values:

```bash
ilo 'area w:n h:n>n;a=*w h;a' 5 10
# → 50
```

## Guards

Guards replace if/else with flat early returns:

```bash
ilo 'cls score:n>t;>=score 90 "A";>=score 80 "B";>=score 70 "C";"F"' 85
# → B
```

Each guard checks a condition. If true, it returns. Otherwise, execution continues to the next line.

## Next steps

- [Types & Functions](/docs/guide/types-and-functions/) — deep dive into the type system
- [Prefix Notation](/docs/guide/prefix-notation/) — why prefix saves tokens
- [Full specification](/docs/reference/spec/) — the complete language reference
