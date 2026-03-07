---
title: Pipes
description: Function chaining with the pipe operator
---

The pipe operator `>>` chains function calls left-to-right:

```
dbl x:n>n;*x 2
inc x:n>n;+x 1
transform x:n>n;(x>>dbl>>inc)
```

`x>>dbl>>inc` means: take `x`, pass to `dbl`, pass result to `inc`.

## Without pipes

```
transform x:n>n;inc(dbl x)
```

## With pipes

```
transform x:n>n;(x>>dbl>>inc)
```

Pipes read left-to-right, matching the data flow direction.
