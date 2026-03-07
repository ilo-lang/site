---
title: Data & I/O
description: File operations, HTTP requests, and environment variables in ilo
---

ilo has built-in support for reading and writing files, making HTTP requests, and accessing environment variables. All I/O builtins return `R` (Result) types -- use `!` to auto-unwrap.

## Reading files

`rd path` reads a file with format auto-detected from the extension:

| Extension | Returns |
|-----------|---------|
| `.csv` | `R ? t` -- list of lists (grid) |
| `.tsv` | `R ? t` -- list of lists (grid) |
| `.json` | `R ? t` -- parsed JSON value |
| other | `R ? t` -- raw text string |

```ilo
load p:t>R ? t;rd p
```

Force a specific format with a second argument:

```ilo
load p:t>R ? t;rd p "json"
```

### Reading lines

`rdl path` reads a file as a list of lines:

```ilo
lines p:t>R L t t;rdl p
```

### Parsing buffers

`rdb string format` parses a string in a given format -- useful for data received from HTTP responses:

```ilo
parse s:t>R ? t;rdb s "json"
```

## Writing files

`wr path data` writes data to a file. Format can be specified as a third argument:

```ilo
save>R t t;wr "out.txt" "hello world"
```

Structured output with format:

```ilo
csv>R t t;wr "out.csv" [[1,2],[3,4]] "csv"
json>R t t;wr "data.json" [1,2,3] "json"
```

## HTTP requests

`get url` makes an HTTP GET request. `$url` is a terse alias:

```ilo
fetch url:t>R t t;$url
```

Auto-unwrap with `!` to skip Result handling:

```ilo
fetch url:t>t;$!url
```

`post url body` makes an HTTP POST:

```ilo
send url:t body:t>R t t;post url body
```

### Custom headers

Build a header map with `mmap`/`mset` and pass it as the last argument:

```ilo
fetch url:t key:t>R t t
  h=mmap
  h=mset h "Authorization" key
  get url h
```

POST with custom headers works the same way:

```ilo
send url:t body:t key:t>R t t
  h=mmap
  h=mset h "x-api-key" key
  post url body h
```

> HTTP builtins (`get`, `$`, `post`) require the native binary. The npm/WASM build does not support network access.

## Environment variables

`env key` reads an environment variable, returning `R t t`:

```ilo
home>R t t;env "HOME"
```

Auto-unwrap with `!`:

```ilo
home>t;env! "HOME"
```

`.env` and `.env.local` files in the working directory are loaded automatically.
