---
title: MCP Servers
description: Connect MCP servers to ilo programs
---

ilo can connect to any [MCP server](https://modelcontextprotocol.io), with tools type-checked end-to-end before execution.

## Configuration

Create an `mcp.json` file:

```json
{
  "servers": {
    "myserver": {
      "command": "node",
      "args": ["server.js"],
      "env": {}
    }
  }
}
```

## Usage

```bash
ilo --mcp mcp.json program.ilo funcname args
```

MCP tools become callable functions in your ilo program, with types verified at load time.

See the [Integrations wiki page](https://github.com/ilo-lang/ilo/wiki/Integrations) for full examples.
