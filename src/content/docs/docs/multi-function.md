---
title: Multi-Function Programs
description: Working with multiple functions in a single program
---

ilo programs can contain multiple functions. Each function is a named declaration separated by a newline (in files) or a space (inline):

Save this as `math.ilo`:

```ilo
dbl x:n>n;*x 2
inc x:n>n;+x 1
sq x:n>n;*x x
```

## Selecting a function from the CLI

When a program has multiple functions, name the one you want to run after the filename:

```bash
ilo math.ilo dbl 5
# → 10

ilo math.ilo sq 5
# → 25
```

If you omit the function name, ilo runs the first one:

```bash
ilo math.ilo 5
# → 10  (runs dbl, the first function)
```

Inline programs work the same way:

```bash
ilo 'dbl x:n>n;*x 2 sq x:n>n;*x x' dbl 5
# → 10

ilo 'dbl x:n>n;*x 2 sq x:n>n;*x x' sq 5
# → 25
```

## Functions can call each other

Functions in the same program can reference each other:

Inline:

```ilo
dbl x:n>n;*x 2
quad x:n>n;dbl(dbl x)
```

Or as a file:

```ilo
dbl x:n > n        -- double a number
  *x 2             -- multiply x by 2

quad x:n > n       -- quadruple a number
  dbl(dbl x)       -- double x, then double again
```

```bash
ilo 'dbl x:n>n;*x 2 quad x:n>n;dbl(dbl x)' quad 3
# → 12
```

For splitting functions across files, see [Imports](/docs/guide/imports).
