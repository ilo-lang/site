---
title: Error Codes
description: ilo verification error codes
---

ilo verifies programs before execution. When verification fails, you get a compact error code.

## Type errors (ILO-T)

| Code | Description |
|------|-------------|
| `ILO-T001` | Unknown type |
| `ILO-T002` | Parameter type missing |
| `ILO-T003` | Return type missing |
| `ILO-T004` | Type mismatch |
| `ILO-T005` | Argument count mismatch |

## Parse errors (ILO-P)

| Code | Description |
|------|-------------|
| `ILO-P001` | Unexpected token |
| `ILO-P002` | Unterminated string |
| `ILO-P003` | Invalid number |

## Resolution errors (ILO-R)

| Code | Description |
|------|-------------|
| `ILO-R001` | Undefined function |
| `ILO-R002` | Undefined variable |

Compact error codes mean agents spend fewer tokens reading error messages and correct faster.
