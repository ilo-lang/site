---
title: Error Handling
description: Results, auto-unwrap, and error codes
---

## Result type

Functions that can fail return `R` (Result):

```ilo
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

`!` on a function call unwraps the Result - if it's an error, the error propagates automatically.

## Optional type

`O T` is either a value of type `T` or `nil`:

```ilo
f>O n;nil           -- returns nil (valid O n)
g>O n;42            -- returns 42 (valid O n)
```

## Nil-coalesce with `??`

`??` unwraps an optional - if the value is nil, return the default; otherwise return the value:

```ilo
f x:O n>n;??x 0
```

```bash
ilo 'f x:O n>n;??x 0' 42
# → 42

ilo 'f>O n;nil'
# → nil
```

`??` chains: `a??b??99` returns the first non-nil value, or 99.

## Combining `!` and `??`

`!` auto-unwraps Results, `??` unwraps Optionals. Together they handle functions that return Results containing optional values:

```bash
ilo 'f k:t>t;r=env k;??r "not set"' HOME
# → /Users/dan  (or whatever your HOME is)
```

## Detailed `?` matching on Result

For full control, match on Result with `?` to handle both Ok and Err branches:

```ilo
div a:n b:n>R n t;=b 0 ^"divide by zero";~/a b
show a:n b:n>t;r=div a b;?r{~v:str v;^e:e}
```

- `~v:` matches Ok, binds the inner value to `v`
- `^e:` matches Err, binds the error to `e`

```bash
ilo 'div a:n b:n>R n t;=b 0 ^"divide by zero";~/a b
show a:n b:n>t;r=div a b;?r{~v:str v;^e:e}' 10 0
# → divide by zero
```

This gives you explicit control over error handling, compared to `!` which auto-propagates errors.

## Compact error codes

When type verification fails, ilo returns compact error codes:

```
ILO-T004: type mismatch: expected n, got t
```

One token, not a paragraph. Agents correct faster with less context.
