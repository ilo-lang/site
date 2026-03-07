---
title: Error Handling
description: Results, auto-unwrap, and error codes
---

## Result type

Functions that can fail return `R` (Result):

```
inner x:n>R n t;~x
```

`R n t` means: Result with success type `n` and error type `t`.

## Auto-unwrap with `!`

The `!` operator auto-unwraps Results, eliminating boilerplate:

```bash
# Without !: 12 tokens
ilo 'inner x:n>R n t;~x outer x:n>R n t;r=inner x;?r{~v:~v;^e:^e}' 42

# With !: 1 token
ilo 'inner x:n>R n t;~x outer x:n>R n t;~(inner! x)' 42
```

`!` on a function call unwraps the Result — if it's an error, the error propagates automatically.

## Compact error codes

When type verification fails, ilo returns compact error codes:

```
ILO-T004: type mismatch: expected n, got t
```

One token, not a paragraph. Agents correct faster with less context.
