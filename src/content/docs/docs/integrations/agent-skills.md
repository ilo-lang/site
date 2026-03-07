---
title: Agent Skills
description: Add ilo as a skill in Claude Code and other AI agents
---

ilo can be installed as a **Claude Code skill**, giving any conversation the ability to write, run, and debug ilo programs on demand.

## Install the skill

```bash
ilo skill install
```

This creates a skill at `~/.claude/skills/ilo/SKILL.md` that Claude Code picks up automatically.

## What the skill provides

When invoked (via `/ilo` or automatically when you mention ilo code), the agent can:

- Write ilo programs from natural-language descriptions
- Run inline expressions and `.ilo` files
- Debug errors using `ilo --explain`
- Convert code from other languages into ilo
- Load the full spec with `ilo help ai`

## Manual installation

If you prefer to install the skill by hand, create `~/.claude/skills/ilo/SKILL.md`:

```yaml
---
name: ilo
description: "Write, run, debug, and explain programs in the ilo programming language."
argument-hint: "[task or code description]"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---
```

Then add the ilo quick reference below the frontmatter. Run `ilo help ai` to get the compact spec to paste in.

## Example

```
> /ilo fibonacci function that returns the nth number

ilo 'fib n:n>n;<=n 1 n;a=fib -n 1;b=fib -n 2;+a b' 10
# 55
```

## Combining with other integrations

Skills compose with [MCP Servers](/docs/integrations/mcp) and [HTTP Tools](/docs/integrations/http-tools)  - the agent can write ilo programs that call external services, all within a single conversation.
