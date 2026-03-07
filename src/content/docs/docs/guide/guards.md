---
title: Guards & Control Flow
description: Flat conditional logic with guards
---

ilo uses **guards** instead of if/else. Guards are flat statements that return early — no nesting, no closing braces.

## Basic guards

```
cls score:n>t;>=score 90 "A";>=score 80 "B";>=score 70 "C";"F"
```

Each guard checks a condition. If true, the function returns that value. Otherwise, execution continues.

## Why guards?

Traditional if/else nests:

```python
if score >= 90:
    return "A"
elif score >= 80:
    return "B"
elif score >= 70:
    return "C"
else:
    return "F"
```

Guards stay flat regardless of how many conditions:

```
>=score 90 "A"
>=score 80 "B"
>=score 70 "C"
"F"
```

No nesting depth. No closing braces to match. Each guard is independent.

## Boolean guards

```
check x:n>t;==x 0 "zero";>x 0 "positive";"negative"
```

## Match expressions

For value matching:

```
describe x:t>t;?x{"dog":"woof";"cat":"meow";_:"unknown"}
```
