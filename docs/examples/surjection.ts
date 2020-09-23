import { IsBijection, IsInjection, IsSurjection } from "../..";

type X = 1 | 2;
type Y = "A";
const g = { 1: "A", 2: "A" } as const;
{ const _: IsInjection<X, Y, typeof g> = true; void _; } // type error
{ const _: IsSurjection<X, Y, typeof g> = true; void _; } // OK
{ const _: IsBijection<X, Y, typeof g> = true; void _; } // type error
