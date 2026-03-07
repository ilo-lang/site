---
title: Built-in Functions
description: ilo's built-in function reference
---

## Arithmetic

| Function | Description | Example |
|----------|-------------|---------|
| `+` | Add | `+a b` |
| `-` | Subtract | `-a b` |
| `*` | Multiply | `*a b` |
| `/` | Divide | `/a b` |
| `%` | Modulo | `%a b` |

## Comparison

| Function | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `==a b` |
| `!=` | Not equal | `!=a b` |
| `>` | Greater than | `>a b` |
| `<` | Less than | `<a b` |
| `>=` | Greater or equal | `>=a b` |
| `<=` | Less or equal | `<=a b` |

## Text

| Function | Description | Example |
|----------|-------------|---------|
| `cat` | Concatenate | `cat "a" "b"` |
| `len` | Length | `len "hello"` |
| `upper` | Uppercase | `upper "hi"` |
| `lower` | Lowercase | `lower "HI"` |
| `trim` | Trim whitespace | `trim " hi "` |
| `split` | Split string | `split "a,b" ","` |
| `join` | Join list | `join ["a" "b"] ","` |
| `sub` | Substring | `sub "hello" 0 3` |

## Collections

| Function | Description | Example |
|----------|-------------|---------|
| `len` | Length | `len [1 2 3]` |
| `hd` | First element | `hd [1 2 3]` |
| `tl` | Rest of list | `tl [1 2 3]` |
| `nth` | Element at index | `nth [1 2 3] 0` |
| `app` | Append | `app [1 2] 3` |
| `map` | Map function | `map f list` |
| `flt` | Filter | `flt pred list` |
| `fld` | Fold/reduce | `fld f init list` |
| `sum` | Sum numbers | `sum [1 2 3]` |
| `sort` | Sort | `sort [3 1 2]` |
| `rev` | Reverse | `rev [1 2 3]` |
| `rng` | Range | `rng 1 5` |

## I/O & HTTP

| Function | Description | Example |
|----------|-------------|---------|
| `prn` | Print | `prn "hello"` |
| `$` | HTTP GET | `$ "https://..."` |
| `post` | HTTP POST | `post url body` |
| `rdb` | Parse (JSON/CSV) | `rdb data "json"` |
| `env` | Environment var | `env "API_KEY"` |
| `rf` | Read file | `rf "data.txt"` |
| `wf` | Write file | `wf "out.txt" data` |

See the full specification in [SPEC.md](https://github.com/ilo-lang/ilo/blob/main/SPEC.md).
