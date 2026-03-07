---
title: Error Handling
description: Results, optionals, auto-unwrap, and nil-coalesce
---

## Errors with `^`

Any function can bail out early with `^`:

```ilo
div a:n b:n > n
  = b 0 ^"divide by zero"
  / a b
```

```bash
ilo 'div a:n b:n>n;=b 0 ^"divide by zero";/a b' div 10 2
# → 5

ilo 'div a:n b:n>n;=b 0 ^"divide by zero";/a b' div 10 0
# → ^divide by zero
```

`^` returns an error immediately. The return type stays `> n` — the error bypasses the type system and exits the function.

## Result type `R`

When callers need to **handle** errors (not just crash), use `R ok err` as the return type. This is like Rust's `Result<T, E>`:

| ilo | Rust equivalent |
|-----|-----------------|
| `R n t` | `Result<f64, String>` |
| `~value` | `Ok(value)` |
| `^error` | `Err(error)` |

```ilo
div a:n b:n > R n t
  = b 0 ^"divide by zero"
  ~ / a b
```

Now `~` wraps the success value explicitly, and callers can match on the result:

```ilo
show a:n b:n > t
  r = div a b
  ? r {~v: str v; ^e: e}
```

- `~v:` matches Ok, binds the value to `v`
- `^e:` matches Err, binds the error to `e`

```bash
ilo 'div a:n b:n>R n t;=b 0 ^"divide by zero";~/a b
show a:n b:n>t;r=div a b;?r{~v:str v;^e:e}' show 10 0
# → divide by zero
```

## Auto-unwrap with `!`

`!` unwraps a Result — if it's an error, it propagates up automatically. The calling function must also return `R`:

```ilo
calc a:n b:n > R n t
  v = div! a b
  ~ * v 2
```

`div! a b` means: call `div`, if error propagate it, if ok bind the value. One token instead of a try/catch block.

## Optional type `O`

`O T` is either a value of type `T` or `nil`:

```ilo
f > O n; nil
g > O n; 42
```

```bash
ilo 'f>O n;nil' f
# → nil

ilo 'f>O n;42' f
# → 42
```

## Nil-coalesce with `??`

`??` unwraps an optional — if nil, use the default:

```ilo
f x:O n > n; x ?? 0
```

```bash
ilo 'f x:O n>n;x??0' f 42
# → 42

ilo 'f>O n;nil' f
# → nil
```

`??` chains: `a??b??99` returns the first non-nil value, or 99.

## Compact error codes

When type verification fails, ilo returns compact error codes:

```
ILO-T004: type mismatch: expected n, got t
```

One token, not a paragraph. Agents correct faster with less context.
