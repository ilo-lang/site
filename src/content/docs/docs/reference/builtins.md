---
title: Built-in Functions
description: Complete reference for ilo's built-in functions
---

## Arithmetic Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `+` | Add | `+3 4` | `7` |
| `-` | Subtract | `-10 3` | `7` |
| `*` | Multiply | `*3 4` | `12` |
| `/` | Divide | `/10 2` | `5` |
| `%` | Modulo | `%10 3` | `1` |

## Comparison Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `==` | Equal | `==a b` | `true`/`false` |
| `!=` | Not equal | `!=a b` | `true`/`false` |
| `>` | Greater than | `>a b` | `true`/`false` |
| `<` | Less than | `<a b` | `true`/`false` |
| `>=` | Greater or equal | `>=a b` | `true`/`false` |
| `<=` | Less or equal | `<=a b` | `true`/`false` |

## Logic

| Operator | Description | Example |
|----------|-------------|---------|
| `&` | Logical AND | `&a b` |
| `\|` | Logical OR | `\|a b` |
| `!` | Logical NOT | `!a` |

## Text

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `cat` | `t t > t` | Concatenate two strings | `cat "hello" " world"` → `"hello world"` |
| `len` | `t > n` | String length | `len "hello"` → `5` |
| `trm` | `t > t` | Trim whitespace | `trm " hi "` → `"hi"` |
| `spl` | `t t > L t` | Split string by delimiter | `spl "a,b,c" ","` → `["a","b","c"]` |
| `has` | `t t > b` | Check if string contains substring | `has "hello" "ell"` → `true` |
| `rgx` | `t t > L t` | Regex match (returns captures) | `rgx "abc123" "[0-9]+"` → `["123"]` |
| `fmt` | `t ... > t` | Format string with values | `fmt "{} is {}" "sky" "blue"` |

## Collections (Lists)

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `len` | `L ? > n` | List length | `len [1,2,3]` → `3` |
| `hd` | `L ? > ?` | First element | `hd [1,2,3]` → `1` |
| `tl` | `L ? > L ?` | All elements except first | `tl [1,2,3]` → `[2,3]` |
| `rev` | `L ? > L ?` | Reverse a list | `rev [1,2,3]` → `[3,2,1]` |
| `srt` | `L ? > L ?` | Sort a list | `srt [3,1,2]` → `[1,2,3]` |
| `srt` | `fn L ? > L ?` | Sort with comparator | `srt cmp xs` |
| `slc` | `L ? n n > L ?` | Slice (start, end) | `slc [1,2,3,4] 1 3` → `[2,3]` |
| `flat` | `L L ? > L ?` | Flatten nested lists | `flat [[1,2],[3]]` → `[1,2,3]` |
| `unq` | `L ? > L ?` | Remove duplicates | `unq [1,2,2,3]` → `[1,2,3]` |
| `has` | `L ? ? > b` | Check if list contains element | `has [1,2,3] 2` → `true` |

## Higher-Order Functions

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `map` | `fn L ? > L ?` | Apply function to each element | `map dbl [1,2,3]` |
| `flt` | `fn L ? > L ?` | Keep elements where function returns true | `flt pos [1,-2,3]` |
| `fld` | `fn ? L ? > ?` | Reduce list to single value | `fld add 0 [1,2,3]` |
| `grp` | `fn L ? > M t L ?` | Group elements by function result | `grp cat xs` |

## Aggregation

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `sum` | `L n > n` | Sum a list of numbers | `sum [1,2,3]` → `6` |
| `avg` | `L n > n` | Average of a list of numbers | `avg [2,4,6]` → `4` |

## Maps

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `mmap` | `> M` | Create empty map | `m=mmap` |
| `mget` | `M t > ?` | Get value by key | `mget m "key"` |
| `mset` | `M t ? > M` | Set key-value pair | `mset m "key" val` |
| `mkeys` | `M > L t` | Get all keys | `mkeys m` |
| `mvals` | `M > L ?` | Get all values | `mvals m` |

## Type Conversion

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `str` | `? > t` | Convert to string | `str 42` → `"42"` |
| `num` | `t > n` | Parse string to number | `num "42"` → `42` |
| `abs` | `n > n` | Absolute value | `abs -5` → `5` |
| `flr` | `n > n` | Floor | `flr 3.7` → `3` |
| `cel` | `n > n` | Ceiling | `cel 3.2` → `4` |
| `rnd` | `n n > n` | Round to N decimal places | `rnd 3.14159 2` → `3.14` |

## I/O & HTTP

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `get` | `t > R t t` | HTTP GET (returns Result) | `get "https://..."` |
| `$` | `t > R t t` | HTTP GET shorthand (sugar for `get`) | `$"https://..."` |
| `post` | `t t > R t t` | HTTP POST (url, body) | `post url body` |
| `get` | `t M > R t t` | HTTP GET with headers | `get url headers` |
| `post` | `t t M > R t t` | HTTP POST with headers | `post url body headers` |
| `rd` | `t > R t t` | Read file | `rd "data.txt"` |
| `rd` | `t t > R t t` | Read file with format | `rd "data.csv" "csv"` |
| `wr` | `t t > R t t` | Write file (path, content) | `wr "out.txt" data` |
| `wr` | `t t t > R t t` | Write file with format | `wr "out.json" data "json"` |
| `env` | `t > R t t` | Read environment variable | `env "API_KEY"` |

> **Note:** `$` is syntactic sugar — `$url` compiles to `get url`. HTTP builtins (`get`, `$`, `post`) require the native binary; they are not available in the npm/WASM build.

## JSON

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `rdb` | `t t > R ? t` | Parse data (format: `"json"`, `"csv"`) | `rdb data "json"` |
| `jpth` | `t t > R t t` | Extract JSON path | `jpth data "users.0.name"` |
| `jdmp` | `? > t` | Dump value as JSON string | `jdmp [1,2,3]` |
| `jpar` | `t > R ? t` | Parse JSON string to value | `jpar '{"a":1}'` |

## Output

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `prnt` | `? > ?` | Print value and return it | `prnt "hello"` |

## Time

| Function | Signature | Description | Example |
|----------|-----------|-------------|---------|
| `now` | `> n` | Current Unix timestamp (seconds) | `now` |

## Auto-unwrap `!`

Any function returning `R` (Result) can be called with `!` to auto-unwrap:

```
r=$url           # r is R t t (Result)
v=$!url           # v is t (auto-unwrapped, propagates error)
data=rdb! r "json"  # auto-unwrap parse result
```

See [Error Handling](/docs/guide/error-handling/) for full details on `!`, `?`, `??`, and Result types.
