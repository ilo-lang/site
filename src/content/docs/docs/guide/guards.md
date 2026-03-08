---
title: Guards & Control Flow
description: Flat conditional logic with guards
---

ilo uses **guards** instead of if/else. Guards are flat statements that return early - no nesting, no closing braces.

## Basic guards

Inline (semicolons replace newlines):

```ilo
grd s:n>t;>=s 90 "A";>=s 80 "B";>=s 70 "C";"F"
```

Or the same thing as a file (newlines and indentation):

```ilo
grade score:n > t    -- number in, text out
  >= score 90 "A"    -- if score >= 90, return "A"
  >= score 80 "B"    -- if score >= 80, return "B"
  >= score 70 "C"    -- if score >= 70, return "C"
  "F"                 -- fallback
```

Each guard checks a condition. If true, the function returns that value. Otherwise, execution continues.

## Why guards?

Compare the Python equivalent:

```python
if score >= 90:
    return "A"
elif score >= 80:
    return "B"
elif score >= 70:
    return "C"
else:
    return "F"
```

Guards eliminate `if`/`elif`/`else` keywords, braces, and deep nesting - fewer tokens to generate, fewer places for AI agents to make mistakes. Every guard chain must end with a fallback value, so you can't have an open-ended switch that silently returns nothing.

## Boolean guards

Inline:

```ilo
chk x:n>t;==x 0 "zero";>x 0 "positive";"negative"
```

Or as a file:

```ilo
check x:n > t        -- number in, text out
  == x 0 "zero"      -- if x equals 0, return "zero"
  > x 0 "positive"   -- if x > 0, return "positive"
  "negative"          -- fallback
```

## Negated guards

Prefix a guard with `!` to negate the condition:

Inline:

```ilo
f x:n>n;!>x 0 0;x
```

Or as a file:

```ilo
f x:n > n  -- number in, number out
  !> x 0 0 -- if x not greater than 0, return 0
  x        -- otherwise return x
```

If x is NOT greater than 0, return 0. Otherwise return x.

```bash
ilo 'f x:n>n;!>x 0 0;x' 5
# → 5

ilo 'f x:n>n;!>x 0 0;x' -3
# → 0
```

Negated braceless guards work with any comparison. Use [`^` (throw)](/docs/guide/error-handling) to return an error instead of a value: `!<=n 0 ^"must be positive"`.

## Braced guards

You can wrap the return value in braces. Both forms produce identical results:

```ilo
-- braceless (saves 2 tokens per guard)
>=sp 1000 "gold"

-- braced
>=sp 1000{"gold"}
```

Use braces when the body has multiple statements:

```ilo
>=sp 1000{a=classify sp;a}
```

## Ternary (guard-else)

A guard with **two** brace blocks is a ternary - it produces a value without returning from the function:

```ilo
f x:n>t;=x 1{"yes"}{"no"}
```

```bash
ilo 'f x:n>t;=x 1{"yes"}{"no"}' 1
# → yes

ilo 'f x:n>t;=x 1{"yes"}{"no"}' 2
# → no
```

Unlike guards, ternary does **not** return from the function. Code after the ternary continues executing:

```ilo
f x:n>n;=x 0{10}{20};+x 1   -- always returns x+1, ternary value is discarded
```

Negated ternary works too: `!=x 1{"not one"}{"one"}`.

## Match expressions

For value matching:

```ilo
describe x:t>t;?x{"dog":"woof";"cat":"meow";_:"unknown"}
```

`_` is the wildcard arm - catches everything else. No fall-through; each arm is independent.

### Matching on Result types

Use `?` to destructure a `R` (Result) value:

```ilo
f r:R n t>t;?r{~v:"ok";^e:e}
```

- `~v` matches Ok, binds the inner value to `v`
- `^e` matches Err, binds the error to `e`

```bash
ilo 'div a:n b:n>R n t;=b 0 ^"divide by zero";~/a b
show a:n b:n>t;r=div a b;?r{~v:str v;^e:e}' show 10 2
# → 5
```

### Matching on type

When the input type is unknown (`?`), match on the runtime type:

```ilo
f x:?>t;?x{n v:"number";t v:"text";_:"other"}
```

Each arm specifies a type tag (`n`, `t`, `b`, `l`) followed by a binding variable.

## Early return with `ret`

`ret expr` returns from the function immediately:

```ilo
f x:n>n;>x 0{ret x};0
```

If x > 0, return x early. Otherwise return 0.

Guards already provide early return for simple cases. Use `ret` when you need early return inside a loop or deeply nested block:

```ilo
f xs:L n>n;@x xs{>=x 10{ret x}};0  -- return first element >= 10
```
