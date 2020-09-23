import { IsInverse } from "../..";

type X = 1 | 2;
type Y = "A" | "B";
const f = { 1: "A", 2: "B" } as const;
const f_inverse = { "A": 1, "B": 2 } as const;
const f_inverse_bad = { "A": 2, "B": 1 } as const;
{ const _: IsInverse<X, Y, typeof f, typeof f_inverse> = true; void _; } // OK
{ const _: IsInverse<X, Y, typeof f, typeof f_inverse_bad> = true; void _; } // type error
