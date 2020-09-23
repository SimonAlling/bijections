import {
	IsBijection,
	IsInjection,
	IsInverse,
	IsSurjection,
} from "..";

{
	// Inverse and non-inverse
	type X = 1 | 2 | 3;
	type Y = "A" | "B" | "C";
	const X_TO_Y = {
		1: "A",
		2: "B",
		3: "C",
	} as const;
	const Y_TO_X_INVERSE = {
		"A": 1,
		"B": 2,
		"C": 3,
	} as const;
	const Y_TO_X_NOT_INVERSE = {
		"A": 2,
		"B": 1,
		"C": 3,
	} as const;
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsBijection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsInverse<X, Y, typeof X_TO_Y, typeof Y_TO_X_INVERSE> = true; void _; }
	{ const _: IsInjection<Y, X, typeof Y_TO_X_NOT_INVERSE> = true; void _; }
	{ const _: IsSurjection<Y, X, typeof Y_TO_X_NOT_INVERSE> = true; void _; }
	{ const _: IsBijection<Y, X, typeof Y_TO_X_NOT_INVERSE> = true; void _; }
	{ void ((TS2344: IsInverse<X, Y, typeof X_TO_Y, typeof Y_TO_X_NOT_INVERSE>) => TS2344); }
}
