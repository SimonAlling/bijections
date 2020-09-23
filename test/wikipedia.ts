import {
	IsBijection,
	IsInjection,
	IsSurjection,
} from "..";

// https://en.wikipedia.org/wiki/Bijection

{
	// An injective non-surjective function (injection, not a bijection)
	type X = 1 | 2 | 3;
	type Y = "D" | "B" | "C" | "A";
	const X_TO_Y = {
		1: "D",
		2: "B",
		3: "A",
	} as const;
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ void ((TS2344: IsSurjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}

{
	// An injective surjective function (bijection)
	type X = 1 | 2 | 3 | 4;
	type Y = "D" | "B" | "C" | "A";
	const X_TO_Y = {
		1: "D",
		2: "B",
		3: "C",
		4: "A",
	} as const;
	{ const _: IsInjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ const _: IsBijection<X, Y, typeof X_TO_Y> = true; void _; }
}

{
	// A non-injective surjective function (surjection, not a bijection)
	type X = 1 | 2 | 3 | 4;
	type Y = "D" | "B" | "C";
	const X_TO_Y = {
		1: "D",
		2: "B",
		3: "C",
		4: "C",
	} as const;
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ const _: IsSurjection<X, Y, typeof X_TO_Y> = true; void _; }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}

{
	// A non-injective non-surjective function (also not a bijection)
	type X = 1 | 2 | 3 | 4;
	type Y = "D" | "B" | "C" | "A";
	const X_TO_Y = {
		1: "D",
		2: "B",
		3: "C",
		4: "C",
	} as const;
	{ void ((TS2344: IsInjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsSurjection<X, Y, typeof X_TO_Y>) => TS2344); }
	{ void ((TS2344: IsBijection<X, Y, typeof X_TO_Y>) => TS2344); }
}
