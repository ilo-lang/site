---
title: Your First Program
description: Write and run your first ilo program
---

Create `hello.ilo`:

```ilo
greet name:t > t
  +"hello " name
```

Run it:

```bash
ilo hello.ilo greet "world"
# → hello world
```

That's a complete ilo program. Here's what each part means:

| Part | Meaning |
|------|---------|
| `greet` | function name |
| `name:t` | parameter `name`, type text |
| `> t` | returns text |
| `+"hello " name` | body: concatenate two strings (prefix `+`) |

Now try something with numbers. Create `math.ilo`:

```ilo
add a:n b:n > n  -- n = number, t = text
  + a b          -- prefix: + a b means a + b
```

```bash
ilo math.ilo add 3 4
# → 7
```

## Inline mode

You can also run ilo without a file. Semicolons replace newlines and indentation:

```bash
ilo 'add a:n b:n>n;+a b' 3 4
# → 7
```

This is the form AI agents use - same language, just compressed to one line. See the [CLI Reference](/docs/reference/cli/) for more.

