---
title: Guards & Control Flow
description: Flat conditional logic with guards
---

ilo uses **guards** instead of if/else. Guards are flat statements that return early — no nesting, no closing braces.

## Basic guards

```
cls score:n>t;>=score 90 "A";>=score 80 "B";>=score 70 "C";"F"
```

Each guard checks a condition. If true, the function returns that value. Otherwise, execution continues.

## Why guards?

Traditional if/else nests:

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

Guards stay flat regardless of how many conditions:

```
>=score 90 "A"
>=score 80 "B"
>=score 70 "C"
"F"
```

No nesting depth. No closing braces to match. Each guard is independent.

## Boolean guards

```
check x:n>t;==x 0 "zero";>x 0 "positive";"negative"
```

## Negated guards

Prefix a guard with `!` to negate the condition:

```
f x:n>n;!>x 0 0;x
```

If x is NOT greater than 0, return 0. Otherwise return x.

```bash
ilo 'f x:n>n;!>x 0 0;x' 5
# → 5

ilo 'f x:n>n;!>x 0 0;x' -3
# → 0
```

Negated braceless guards work with any comparison: `!<=n 0 ^"must be positive"`.

## Braced guards

You can wrap the return value in braces. Both forms produce identical results:

```
-- braceless (saves 2 tokens per guard)
>=sp 1000 "gold"

-- braced
>=sp 1000{"gold"}
```

Use braces when the body has multiple statements:

```
>=sp 1000{a=classify sp;a}
```

## Ternary (guard-else)

A guard with **two** brace blocks is a ternary — it produces a value without returning from the function:

```
f x:n>t;=x 1{"yes"}{"no"}
```

```bash
ilo 'f x:n>t;=x 1{"yes"}{"no"}' 1
# → yes

ilo 'f x:n>t;=x 1{"yes"}{"no"}' 2
# → no
```

Unlike guards, ternary does **not** return from the function. Code after the ternary continues executing:

```
f x:n>n;=x 0{10}{20};+x 1   -- always returns x+1, ternary value is discarded
```

Negated ternary works too: `!=x 1{"not one"}{"one"}`.

## Match expressions

For value matching:

```
describe x:t>t;?x{"dog":"woof";"cat":"meow";_:"unknown"}
```

`_` is the wildcard arm — catches everything else. No fall-through; each arm is independent.

### Matching on Result types

Use `?` to destructure a `R` (Result) value:

```
f r:R n t>t;?r{~v:"ok";^e:e}
```

- `~v` matches Ok, binds the inner value to `v`
- `^e` matches Err, binds the error to `e`

```bash
ilo 'div a:n b:n>R n t;=b 0 ^"divide by zero";~/a b
show a:n b:n>t;r=div a b;?r{~v:str v;^e:e}' 10 2
# → 5
```

### Matching on type

When the input type is unknown (`?`), match on the runtime type:

```
f x:?>t;?x{n v:"number";t v:"text";_:"other"}
```

Each arm specifies a type tag (`n`, `t`, `b`, `l`) followed by a binding variable.

## Early return with `ret`

`ret expr` returns from the function immediately:

```
f x:n>n;>x 0{ret x};0
```

If x > 0, return x early. Otherwise return 0.

Guards already provide early return for simple cases. Use `ret` when you need early return inside a loop or deeply nested block:

```
f xs:L n>n;@x xs{>=x 10{ret x}};0  -- return first element >= 10
```
