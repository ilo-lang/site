---
title: HTTP Tools
description: Wire HTTP endpoints as typed ilo functions
---

Tool declarations let you wire external HTTP endpoints as typed ilo functions.

## Configuration

Create a `tools.json` file:

```json
{
  "tools": [
    {
      "name": "weather",
      "description": "Get weather for a city",
      "url": "https://api.example.com/weather",
      "method": "GET",
      "params": {
        "city": { "type": "t", "required": true }
      },
      "returns": "M"
    }
  ]
}
```

## Usage

```bash
ilo --tools tools.json 'get-weather city:t>M;weather city' "London"
```

Tools are type-checked at load time — the agent can't call a tool with wrong parameter types.

See the [Integrations wiki page](https://github.com/ilo-lang/ilo/wiki/Integrations) for full config examples.
