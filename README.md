# bijections

_Statically typed properties about functions._

Mathematical functions can be [_surjective_][surjective] (onto) and/or [_injective_][injective] (one-to-one).
If and only if a function is both surjective and injective, it is said to be [_bijective_][bijective] or _invertible_, in which case there exists an inverse function.

This library lets you **encode these properties as _types_** in the spirit of the [Curry–Howard correspondence][curry-howard]:

```ts
// docs/examples/bijection.ts

import { IsBijection, IsInjection, IsSurjection } from "../..";

type X = 1 | 2;
type Y = "A" | "B";
const f = { 1: "A", 2: "B" } as const;
{ const _: IsSurjection<X, Y, typeof f> = true; void _; }
{ const _: IsInjection<X, Y, typeof f> = true; void _; }
{ const _: IsBijection<X, Y, typeof f> = true; void _; }

```

The code above typechecks, because `f` represents a bijection.

The code below doesn't typecheck, because although `g` is a surjection, it is not an injection (and hence neither a bijection).

```ts
// docs/examples/surjection.ts

import { IsBijection, IsInjection, IsSurjection } from "../..";

type X = 1 | 2;
type Y = "A";
const g = { 1: "A", 2: "A" } as const;
{ const _: IsInjection<X, Y, typeof g> = true; void _; } // type error
{ const _: IsSurjection<X, Y, typeof g> = true; void _; } // OK
{ const _: IsBijection<X, Y, typeof g> = true; void _; } // type error

```

Even the inverse of a function can be encoded:

```ts
// docs/examples/inverse.ts

import { IsInverse } from "../..";

type X = 1 | 2;
type Y = "A" | "B";
const f = { 1: "A", 2: "B" } as const;
const f_inverse = { "A": 1, "B": 2 } as const;
const f_inverse_bad = { "A": 2, "B": 1 } as const;
{ const _: IsInverse<X, Y, typeof f, typeof f_inverse> = true; void _; } // OK
{ const _: IsInverse<X, Y, typeof f, typeof f_inverse_bad> = true; void _; } // type error

```

[surjective]: https://en.wikipedia.org/wiki/Surjective_function
[injective]: https://en.wikipedia.org/wiki/Injective_function
[bijective]: https://en.wikipedia.org/wiki/Bijection
[curry-howard]: https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence
