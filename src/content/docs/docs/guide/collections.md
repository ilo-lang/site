---
title: Collections
description: Lists, maps, and data operations
---

## Lists

```ilo
nums=[1 2 3 4 5]
```

### Operations

```ilo
len nums        -- → 5
hd nums         -- → 1 (first element)
tl nums         -- → [2 3 4 5] (rest)
nums.2          -- → 3 (dot-notation, zero-indexed)
+=nums 6        -- → [1 2 3 4 5 6] (append)
```

### Higher-order functions

```ilo
dbl x:n>n;*x 2
map dbl nums     -- → [2 4 6 8 10]

pos x:n>b;>x 0
flt pos nums     -- → [1 2 3 4 5]

sum nums         -- → 15
```

## Dot-notation indexing

Access list elements by index with `.`:

```ilo
xs.0            -- first element
xs.2            -- third element
data.users.0    -- chained access
```

Safe navigation with `.?` returns nil instead of erroring:

```ilo
user.?email     -- nil if "email" doesn't exist
```

## Iterating with `@`

`@` loops over a list or range. The last iteration's value is returned:

```ilo
sq-last xs:L n>n;@x xs{*x x}
```

```bash
ilo 'sq-last xs:L n>n;@x xs{*x x}' 3,4,5
# → 25  (last element 5, squared)
```

Use `@` with a range to loop over numbers:

```bash
ilo 'f>n;s=0;@i 0..5{s=+s i};s'
# → 10  (sum of 0+1+2+3+4)
```

Use braces when the body has multiple statements:

```bash
ilo 'f>n;xs=[];@i 0..3{xs=+=xs i};xs'
# → [0, 1, 2]
```

## Slice, contains, and append

### `slc` - slice a list or text

`slc xs a b` returns elements from index `a` up to (but not including) `b`:

```bash
ilo 'f xs:L n>L n;slc xs 1 3' 10,20,30,40
# → [20, 30]
```

### `has` - contains check

`has xs v` tests membership. Works on lists (element check) and text (substring check):

```bash
ilo 'f xs:L n>b;has xs 3' 1,2,3,4
# → true

ilo 'f s:t>b;has s "llo"' "hello"
# → true
```

### `+=` - append to list

`+=xs v` appends an element to a list:

```bash
ilo 'f xs:L n>L n;+=xs 99' 1,2,3
# → [1, 2, 3, 99]
```

## Maps (`M k v`)

Maps are key-value collections. Keys are always text at runtime. Maps are immutable - `mset` and `mdel` return new maps.

### Creating maps with `mmap` and `mset`

```ilo
scores>n
  m=mmap
  m=mset m "alice" 99
  m=mset m "bob" 87
  mget m "alice"
```

```bash
ilo 'scores>n;m=mmap;m=mset m "alice" 99;m=mset m "bob" 87;mget m "alice"'
# → 99
```

### Map builtins

| Call | Returns | Meaning |
|------|---------|---------|
| `mmap` | `M t _` | create empty map |
| `mset m k v` | `M k v` | new map with key set |
| `mget m k` | value or nil | value at key |
| `mhas m k` | `b` | key exists? |
| `mkeys m` | `L t` | sorted list of keys |
| `mvals m` | `L v` | values sorted by key |
| `mdel m k` | `M k v` | new map without key |
| `len m` | `n` | number of entries |

### Checking keys with `mhas`

```bash
ilo 'check>b;m=mset mmap "x" "1";mhas m "x"'
# → true
```

## Aggregation

### `sum` and `avg`

```bash
ilo 'f xs:L n>n;sum xs' 1,2,3,4,5
# → 15

ilo 'f xs:L n>n;avg xs' 2,4,6
# → 4
```

### `grp` - group by key function

`grp fn xs` groups a list by a key function, returning `M t (L a)`:

```ilo
cl x:n>t;>x 5{"big"}{"small"}
classify xs:L n>M t L n;grp cl xs
```

```bash
ilo 'cl x:n>t;>x 5{"big"}{"small"} classify xs:L n>M t L n;grp cl xs' classify 1,3,7,10,2
# → {big: [7, 10], small: [1, 3, 2]}
```

### `flat` - flatten nested lists

Flattens one level of nesting:

```bash
ilo 'f>L n;flat [[1, 2], [3], [4, 5]]'
# → [1, 2, 3, 4, 5]
```

### `unq` - deduplicate

Removes duplicates while preserving order:

```bash
ilo 'f xs:L t>L t;unq xs' a,b,a,c,b
# → [a, b, c]
```

## String builtins

| Call | Meaning |
|------|---------|
| `trm s` | trim leading and trailing whitespace |
| `spl s sep` | split text by separator |
| `fmt tmpl args...` | format string with `{}` placeholders |
| `cat xs sep` | join list of text with separator |

### `trm` - trim whitespace

```bash
ilo 'f s:t>t;trm s' "  hello  "
# → hello
```

### `spl` - split text

```bash
ilo 'f s:t>L t;spl s ","' "a,b,c"
# → [a, b, c]
```

### `fmt` - format strings

`{}` placeholders are filled left-to-right:

```bash
ilo 'f>t;fmt "{} + {} = {}" 1 2 3'
# → 1 + 2 = 3
```

### `cat` - join list with separator

```bash
ilo 'f xs:L t>t;cat xs ", "' a,b,c
# → a, b, c
```

### `rgx` - regex extract

`rgx pat s` extracts all matches of a regex pattern from a string. Without capture groups it returns all matches; with groups it returns the first match's captures:

```bash
ilo 'f s:t>L t;rgx "\\d+" s' "abc 123 def 456"
# → [123, 456]
```
