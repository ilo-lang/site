---
title: CLI Reference
description: Command-line usage for ilo
---

## Basic usage

```bash
ilo 'funcname params>type;body' args    # inline
ilo file.ilo funcname args              # from file
```

## Flags

| Flag | Description |
|------|-------------|
| `-ai` | Output compact spec for LLM consumption |
| `-e`, `--expanded` | Expanded/formatted output |
| `--tools tools.json` | Load HTTP tool declarations |
| `--mcp mcp.json` | Connect MCP servers |
| `--vm` | Run on register VM (bytecode) |
| `--emit python` | Transpile to Python |
| `--emit explain` | Human-readable explanation |
| `--emit fmt` | Formatted source |

## REPL

```bash
ilo repl
```

## Help

```bash
ilo help           # general help
ilo help lang      # full language spec
```

See the full [CLI Reference](https://github.com/ilo-lang/ilo/wiki/CLI-Reference) on the wiki.
