---
title: Loops
description: Iterating with foreach, range, and while loops
---

ilo has three loop constructs: **foreach** (`@`), **range** (`@..`), and **while** (`wh`). All return the last iteration's body value (`nil` if the loop never executes).

## Foreach — `@binding list{body}`

Iterates over each element in a list:

Inline:

```ilo
sq-last xs:L n>n;@x xs{*x x}
```

Or as a file:

```ilo
sq-last xs:L n > n     -- list of numbers in, number out
  @x xs {             -- for each x in xs
    * x x              -- square x
  }                    -- returns last squared value
```

```bash
ilo 'sq-last xs:L n>n;@x xs{*x x}' 3,4,5
# → 25  (last element 5, squared)
```

Variables from the outer scope can be updated inside the loop body:

```ilo
total xs:L n > n       -- sum a list manually
  s = 0                -- accumulator
  @x xs {             -- for each x in xs
    s = + s x          -- add x to s
  }
  s                    -- return the sum
```

```bash
ilo 'total xs:L n>n;s=0;@x xs{s=+s x};s' 1,2,3
# → 6
```

The loop binding (`x`) is fresh each iteration. Outer variables (`s`) persist across iterations.

## Range — `@binding start..end{body}`

Iterates from `start` (inclusive) to `end` (exclusive):

Inline:

```ilo
f>n;s=0;@i 0..5{s=+s i};s
```

Or as a file:

```ilo
f > n                  -- no params, returns number
  s = 0                -- accumulator
  @i 0..5 {           -- i goes 0, 1, 2, 3, 4
    s = + s i          -- add i to s
  }
  s                    -- → 10
```

```bash
ilo 'f>n;s=0;@i 0..5{s=+s i};s' f
# → 10  (0+1+2+3+4)
```

Building a list with a range:

```bash
ilo 'f>L n;xs=[];@i 0..3{xs=+=xs i};xs' f
# → [0, 1, 2]
```

If `start >= end`, the loop never executes.

## While — `wh condition{body}`

Loops while the condition is truthy:

Inline:

```ilo
f>n;i=0;s=0;wh <i 5{i=+i 1;s=+s i};s
```

Or as a file:

```ilo
f > n                  -- no params, returns number
  i = 0               -- counter
  s = 0               -- accumulator
  wh < i 5 {          -- while i < 5
    i = + i 1         -- increment i
    s = + s i         -- add i to s
  }
  s                    -- → 15
```

```bash
ilo 'f>n;i=0;s=0;wh <i 5{i=+i 1;s=+s i};s' f
# → 15  (1+2+3+4+5)
```

Unlike `@`, while loops don't create a fresh binding per iteration — all variables persist.

## Loops stay flat

In most languages, loops with conditions inside them create deep nesting. Compare the Python equivalent of counting passing scores with early exit on a perfect score:

```python
def count_passing(scores):
    count = 0
    for score in scores:
        if score == 100:
            return count + 1
        if score >= 60:
            count += 1
    return count
```

In ilo, [guards](/docs/guide/guards) inside loops keep the body flat — no indentation creep:

```ilo
count-passing scores:L n > n
  c = 0
  @s scores {
    = s 100 { ret + c 1 }   -- perfect score, return early
    >= s 60 { c = + c 1 }   -- passing score, increment
  }
  c
```

Guards return or continue without nesting. Add more conditions and the indentation stays the same — each guard is an independent flat check.

## Break and continue

`brk` exits the enclosing loop. `cnt` skips to the next iteration:

```ilo
f > n
  i = 0
  wh true {           -- infinite loop
    i = + i 1
    >= i 3 { brk }    -- break when i reaches 3
  }
  i                    -- → 3
```

```bash
ilo 'f>n;i=0;wh true{i=+i 1;>=i 3{brk}};i' f
# → 3
```

Continue example — skip iterations where `i >= 3`:

```bash
ilo 'f>n;i=0;s=0;wh <i 5{i=+i 1;>=i 3{cnt};s=+s i};s' f
# → 3  (1+2, skips 3, 4, 5)
```

Both `brk` and `cnt` work inside guards within loops. `brk expr` accepts an optional value (currently discarded — the loop returns the last body value before the break).

## Early return from loops

Use `ret` to return from the enclosing function inside a loop:

Inline:

```ilo
first-big xs:L n>n;@x xs{>=x 10{ret x}};0
```

Or as a file:

```ilo
first-big xs:L n > n        -- find first element >= 10
  @x xs {                  -- loop over list
    >= x 10 { ret x }       -- if x >= 10, return it
  }
  0                          -- fallback if none found
```

```bash
ilo 'first-big xs:L n>n;@x xs{>=x 10{ret x}};0' 3,7,12,5
# → 12
```

## Choosing the right loop

| | Foreach `@` | Range `@..` | While `wh` |
|--|-------------|-------------|------------|
| **Syntax** | `@x xs{…}` | `@i a..b{…}` | `wh cond{…}` |
| **Use when** | Iterating a list | Counting over numbers | Custom stop condition |
| **Fresh binding** | Yes | Yes | No |

For simple list transforms, prefer [`map`](/docs/guide/collections#map), [`flt`](/docs/guide/collections#flt--filter), and [`fld`](/docs/guide/collections#fld--fold) — loops are for when you need mutable state or early exit.
