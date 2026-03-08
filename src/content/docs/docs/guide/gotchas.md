---
title: Gotchas
description: Common surprises and disambiguation in ilo
---

## `?` and `_` — context-sensitive symbols

`?` has two meanings, `_` has two meanings:

| Context | Syntax | Meaning |
|---------|--------|---------|
| Type annotation | `x:_` | Any/unknown type (wildcard) |
| Match expression | `?x{...}` | Match on value |
| Prefix ternary | `?=x 0 10 20` | Conditional expression |
| Match wildcard | `_:"default"` | Catch-all arm |

`_` means "don't care" in both type annotations and match patterns. `?` is always a conditional/match operator.

```ilo
f x:_>t;?x{n v:"number";t v:"text";_:"other"}
```

Here `_` after `:` is the any type, `?` starts a match, and `_:` in the match is the wildcard arm.
