---
title: Gotchas
description: Common surprises and disambiguation in ilo
---

## `?` is context-sensitive

`?` has three meanings depending on position:

| Context | Syntax | Meaning |
|---------|--------|---------|
| Type annotation | `x:?` | Unknown/any type |
| Match expression | `?x{...}` | Match on value |
| Prefix ternary | `?=x 0 10 20` | Conditional expression |

The parser disambiguates by position: type annotations appear after `:`, match expressions start a statement, and prefix ternaries follow `?` with a comparison operator.

This can look dense in inline code:

```ilo
f x:?>t;?x{n v:"number";t v:"text";_:"other"}
```

Here the first `?` is the type (unknown), and the second `?` starts a match.
