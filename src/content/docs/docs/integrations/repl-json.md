---
title: REPL JSON Mode
description: Structured JSON output for agent-driven ilo sessions
---

The `-j` flag switches ilo output to structured JSON  - ideal for agents that need to parse results programmatically.

## Interactive REPL

```bash
ilo repl -j
```

Every response is a single JSON object on one line:

**Success:**
```json
{"ok": 10}
```

**Error:**
```json
{"code": "ILO-T004", "message": "undefined variable 'y'", "severity": "error", "suggestion": "did you mean 'x'?"}
```

## Inline expressions

The `-j` flag also works outside the REPL:

```bash
ilo 'dbl x:n>n;*x 2' -j 5
```

```json
{"ok": 10}
```

## Why this matters for agents

Agents can't reliably parse human-formatted output. With `-j`:

- **No ambiguity**  - success is `{"ok": value}`, errors have structured `code`/`message`/`suggestion` fields
- **Error recovery**  - the agent reads the `suggestion` field and retries automatically
- **Stateful sessions**  - the REPL keeps function definitions across lines, so the agent can build up a program incrementally and test each step

## Agent workflow example

A typical agent loop using `repl -j`:

```
1. Agent sends:  dbl x:n>n;*x 2
   ilo returns:  {"ok": "defined dbl"}

2. Agent sends:  dbl 5
   ilo returns:  {"ok": 10}

3. Agent sends:  dbl "hello"
   ilo returns:  {"code": "ILO-T003", "message": "expected n, got t", ...}

4. Agent reads error, adjusts, retries
```

## Combining with skills

When using ilo as a [Claude Code skill](/docs/integrations/agent-skills), the skill automatically uses `-j` for reliable output parsing. The two features are designed to work together.
