---
title: Collections
description: Lists, maps, and data operations
---

## Lists

```
nums=[1 2 3 4 5]
```

### Operations

```
len nums        # → 5
hd nums         # → 1 (first element)
tl nums         # → [2 3 4 5] (rest)
nth nums 2      # → 3 (zero-indexed)
app nums 6      # → [1 2 3 4 5 6]
```

### Higher-order functions

```
dbl x:n>n;*x 2
map dbl nums     # → [2 4 6 8 10]

pos x:n>b;>x 0
flt pos nums     # → [1 2 3 4 5]

sum nums         # → 15
```

## Maps

```
user={"name" "ilo" "version" "0.8.0"}
```

### Operations

```
get user "name"       # → "ilo"
set user "version" "0.9.0"
keys user             # → ["name" "version"]
vals user             # → ["ilo" "0.8.0"]
```
