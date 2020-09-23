import {
	Domain,
	IsBijection,
	IsInjection,
	IsSurjection,
	Range,
} from "..";

{
	// Explicit types, bijection
	type X = 1 | 2;
	type Y = "A" | "B";
	const X_TO_Y = { 1: "A", 2: "B" } as const;
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsBijection<X, Y, typeof X_TO_Y> = true; void _; }
}

{
	// Explicit types, injection but not surjection
	type X = 1 | 2;
	type Y = "A" | "B" | "C";
	const X_TO_Y = { 1: "A", 2: "B" } as const;
	{ void ((TS2344: IsSurjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}

{
	// Derived types, surjection but not injection
	type X = 1 | 2;
	type Y = "A";
	const X_TO_Y = { 1: "A", 2: "A" } as const;
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}

{
	// Derived types, bijection
	type X = Domain<typeof X_TO_Y>;
	type Y = Range<typeof X_TO_Y>;
	const X_TO_Y = { 1: "A", 2: "B" } as const;
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsBijection<X, Y, typeof X_TO_Y> = true; void _; }
}

{
	// Derived types, injection but not surjection
	// Not possible because all such mappings are surjections by definition.
}

{
	// Derived types, surjection but not injection
	type X = Domain<typeof X_TO_Y>;
	type Y = Range<typeof X_TO_Y>;
	const X_TO_Y = { 1: "A", 2: "A" } as const;
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}
