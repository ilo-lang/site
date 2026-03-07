---
title: Types & Functions
description: ilo's type system and function declarations
---

Every ilo function declares its parameter types and return type inline:

```
funcname param1:type param2:type>returntype;body
```

## Type sigils

| Sigil | Type | Description |
|-------|------|-------------|
| `n` | Number | Integers and floats |
| `t` | Text | Strings |
| `b` | Boolean | `true` / `false` |
| `?` | Any | Accepts any type |
| `L` | List | Ordered collection `[1 2 3]` |
| `M` | Map | Key-value pairs `{"key" "val"}` |
| `R` | Result | Success or error value |

## Examples

```
# Number → Number
dbl x:n>n;*x 2

# Two params, text return
greet first:t last:t>t;cat first " " last

# Any type, boolean return
truthy x:?>b;!!x
```

## Multiple statements

Separate statements with `;`:

```
calc a:n b:n>n;s=+a b;p=*a b;+s p
```

Each statement binds a variable or returns a value. The last expression is the return value.
