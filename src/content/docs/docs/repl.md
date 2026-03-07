---
title: The REPL
description: Interactive ilo sessions for experimenting and prototyping
---

## Start a session

```bash
ilo repl
```

You get an interactive prompt where you can define functions and evaluate expressions:

```ilo
ilo> dbl x:n>n;*x 2
ilo> dbl 5
10
ilo> inc x:n>n;+x 1
ilo> inc 10
11
```

Functions persist across lines. Build up a program incrementally.

## Pipes in the REPL

Chain functions you've already defined:

```ilo
ilo> dbl x:n>n;*x 2
ilo> inc x:n>n;+x 1
ilo> 5 >> dbl >> inc
11
```

## Commands

| Command | What it does |
|---------|-------------|
| `:defs` | Show all defined functions |
| `:w file.ilo` | Save definitions to a file |
| `:clear` | Start fresh |
| `:help` | Show help |
| `:q` | Quit |

## JSON mode

For agent integration, use `-j` to get structured JSON output:

```bash
ilo repl -j
```

Success:
```json
{"ok": 10}
```

Error:
```json
{"code": "ILO-T004", "message": "undefined variable 'y'", "severity": "error", "suggestion": "did you mean 'x'?"}
```

The `-j` flag also works outside the REPL: `ilo 'dbl x:n>n;*x 2' -j 5`

## Tips

- Define helper functions first, then compose them
- Use `:defs` to remind yourself what's in scope
- Use `:w` to save a working session to a file when you're happy with it
