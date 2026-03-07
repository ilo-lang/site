---
title: HTTP Tools
description: Wire HTTP endpoints as typed ilo functions
---

Tool declarations let you wire external HTTP endpoints as typed ilo functions.

## Configuration

Create a `tools.json` file:

```json
{
  "tools": {
    "weather": {
      "url": "https://api.example.com/weather"
    },
    "lookup": {
      "url": "https://api.example.com/lookup"
    }
  }
}
```

Each key is the tool name. The value must include a `url` field.

## Usage

```bash
ilo --tools tools.json 'get-weather city:t>R t t;weather city' "London"
```

Tools are type-checked at load time — the agent can't call a tool with wrong parameter types.
