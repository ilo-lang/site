---
title: Agent Skills
description: Add ilo as a skill in Claude Code, Claude Co-work, and other AI agents
---

ilo can be installed as a skill in **Claude Code** and **Claude Co-work**, giving any conversation the ability to write, run, and debug ilo programs on demand.

## Claude Code

### Install the skill

```bash
ilo skill install
```

This creates a skill at `~/.claude/skills/ilo/SKILL.md` that Claude Code picks up automatically. Once installed, invoke it with `/ilo` or just mention ilo code in conversation.

### What the skill provides

- Write ilo programs from natural-language descriptions
- Run inline expressions and `.ilo` files
- Debug errors using `ilo --explain`
- Convert code from other languages into ilo
- Load the full spec with `ilo help ai`

### Example

```
> /ilo fibonacci function that returns the nth number

ilo 'fib n:n>n;<=n 1 n;a=fib -n 1;b=fib -n 2;+a b' 10
# 55
```

### Manual installation

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

## Claude Co-work

Claude Co-work (multi-agent coding sessions) works the same way. Once the skill is installed, any agent in the session can use ilo.

Typical Co-work patterns:

- **One agent writes ilo, another tests it** - split generation and verification across agents
- **ilo as glue code** - use ilo for data transforms between agents working on different parts of a system
- **Rapid prototyping** - one agent writes the ilo prototype, another converts it to production code

The skill is shared across all agents in the session via the same `~/.claude/skills/` directory.

## Other agents

Any agent that can run shell commands can use ilo. The key ingredients:

1. **Install ilo** - `curl -fsSL https://raw.githubusercontent.com/ilo-lang/ilo/main/install.sh | sh`
2. **Load the spec** - `ilo help ai` returns a compact reference the agent can use as context
3. **Use JSON mode** - pass `-j` for structured output the agent can parse (see [REPL JSON Mode](/docs/integrations/repl-json))

## Combining with other integrations

Skills compose with [MCP Servers](/docs/integrations/mcp) and [HTTP Tools](/docs/integrations/http-tools) - the agent can write ilo programs that call external services, all within a single conversation.
