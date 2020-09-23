import { IsBijection, IsInjection, IsSurjection } from "../..";

type X = 1 | 2;
type Y = "A" | "B";
const f = { 1: "A", 2: "B" } as const;
{ const _: IsSurjection<X, Y, typeof f> = true; void _; }
{ const _: IsInjection<X, Y, typeof f> = true; void _; }
{ const _: IsBijection<X, Y, typeof f> = true; void _; }
