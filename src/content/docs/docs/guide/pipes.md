---
title: Pipes
description: Function chaining with the pipe operator
---

The pipe operator `>>` chains function calls left-to-right:

```ilo
dbl x:n>n;*x 2
inc x:n>n;+x 1
transform x:n>n;(x>>dbl>>inc)
```

`x>>dbl>>inc` means: take `x`, pass to `dbl`, pass result to `inc`.

## Without pipes

```ilo
transform x:n>n;inc(dbl x)
```

## With pipes

```ilo
transform x:n>n;(x>>dbl>>inc)
```

Pipes read left-to-right, matching the data flow direction.

## Multi-function programs

ilo programs can contain multiple functions. Each function is a named declaration separated by a newline (in files) or a space (inline):

```ilo
dbl x:n>n;*x 2
inc x:n>n;+x 1
sq x:n>n;*x x
```

### Selecting a function from the CLI

When a program has multiple functions, name the one you want to run:

```bash
ilo program.ilo dbl 5
# → 10

ilo program.ilo sq 5
# → 25
```

Inline programs work the same way:

```bash
ilo 'dbl x:n>n;*x 2 sq x:n>n;*x x' dbl 5
# → 10

ilo 'dbl x:n>n;*x 2 sq x:n>n;*x x' sq 5
# → 25
```

If you omit the function name, ilo runs the first one.

## Composition patterns

Pipes shine when you compose small, reusable functions into larger transforms.

### Chaining numeric transforms

```ilo
dbl x:n>n;*x 2
inc x:n>n;+x 1
sq x:n>n;*x x

-- double, increment, then square
transform x:n>n;(x>>dbl>>inc>>sq)
```

```bash
ilo 'dbl x:n>n;*x 2 inc x:n>n;+x 1 sq x:n>n;*x x transform x:n>n;(x>>dbl>>inc>>sq)' transform 3
# → 49  (3 → 6 → 7 → 49)
```

### Chaining list operations

Pipes work naturally with list higher-order functions like `map`, `flt`, and `fld`:

```ilo
sq x:n>n;*x x
pos x:n>b;>x 0
main xs:L n>L n;xs >> flt pos >> map sq
```

```bash
ilo 'sq x:n>n;*x x pos x:n>b;>x 0 main xs:L n>L n;xs >> flt pos >> map sq' main -3,-1,0,2,4
# → [4, 16]
```

Read it: take `xs`, filter to positives, square each. Data flows left to right.

### Eliminating intermediate variables

Without pipes, you need intermediate bindings:

```ilo
transform x:n>n;a=dbl x;b=inc a;sq b
```

With pipes, the same logic is a single expression:

```ilo
transform x:n>n;(x>>dbl>>inc>>sq)
```

### Pipes with auto-unwrap

Pipes combine with `!` for functions that return `R` (Result) types:

```ilo
f x:n>>g!>>h
```

This desugars to `h(g!(f(x)))` - if `g` returns an error, it propagates immediately.

### Parentheses in multi-function files

In a file with multiple functions, wrap pipe chains in parentheses for non-last functions. This prevents the parser from consuming the next function's name:

```ilo
dbl-inc x:n>n;(x>>dbl>>inc)   -- parens needed (not the last function)
inc-sq x:n>n;x>>inc>>sq       -- last function, no parens needed
```
