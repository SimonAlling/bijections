import {
	IsBijection,
	IsInjection,
	IsInverse,
	IsSurjection,
	IsTotal,
} from "..";

/*
Each expected type error should be on a line of the form

	void ((i: t) => i);

where i is the expected error (e.g. TS2344) and t is a type.
*/

{
	// Non-total function
	type X = 1 | 2;
	type Y = "A";
	const X_TO_Y = { 1: "A" } as const;
	{ void ((TS2344: IsTotal<X, Y, typeof X_TO_Y>) => TS2344); }
}

{
	// Inverse of a non-surjection
	type X = 1 | 2;
	type Y = "A" | "B" | "C";
	const X_TO_Y = { 1: "A", 2: "B" } as const;
	const Y_TO_X = { "A": 1, "B": 2, "C": 1 } as const;
	{ void ((TS2344: IsInverse<X, Y, typeof X_TO_Y, typeof Y_TO_X>) => TS2344); }
}

{
	// Inverse of a non-injection
	type X = 1 | 2;
	type Y = "A" | "B";
	const X_TO_Y = { 1: "A", 2: "A" } as const;
	const Y_TO_X = { "A": 1, "B": 2 } as const;
	{ void ((TS2344: IsInverse<X, Y, typeof X_TO_Y, typeof Y_TO_X>) => TS2344); }
}

{
	// Domain not equal to specified domain
	type X = 1 | 2;
	type Y = "A" | "B";
	const X_TO_Y = { 1: "A", 2: "B", 3: "A" } as const;
	const Y_TO_X = { "A": 1, "B": 2 } as const;
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsSurjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsInverse<X, Y, typeof X_TO_Y, typeof Y_TO_X>) => TS2344); }
}

{
	// Non-dict bijection type
	type X = 1 | 2;
	type Y = "A" | "B";
	{ void ((TS2344: IsBijection<X, Y, boolean>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, number>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, string>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, symbol>) => TS2344); }
}

{
	// Inline type parameters
	{ const _: IsBijection<1 | 2, "A" | "B", { 1: "A", 2: "B" }> = true; void _; }
	{ void ((TS2344: IsBijection<1 | 2, "A" | "B", { 1: "A", 2: "A" }>) => TS2344); }
}

{
	// Non-const mapping
	type X = 1 | 2;
	type Y = "A" | "B";
	const X_TO_Y = { 1: "A", 2: "B" };
	{ void ((TS2344: IsSurjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}
