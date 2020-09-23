export type Domain<T> = keyof T;

export type Range<T> = T[keyof T];

export type IsTotal<
	X extends PropertyKey,
	Y,
	X2Y extends Total<X, Y, X2Y>,
> = (
	X2Y
)

type Total<
	X extends PropertyKey,
	Y,
	X2Y extends { [x in X]: Y },
> = (
	{ [x in X]: Y }
	&
	IfEquals<X, Domain<X2Y>, { [x in X]: X2Y[x] }>
)

export type IsSurjection<
	X extends PropertyKey,
	Y,
	X2Y extends Surjection<X, Y, X2Y>,
> = (
	true
)

type Surjection<
	X extends PropertyKey,
	Y,
	X2Y extends { [x in X]: Y },
> = (
	Total<X, Y, X2Y>
	&
	IfEquals<X, Domain<X2Y>, IfEquals<Y, Range<X2Y>, { [x in X]: X2Y[x] }>>
)

export type IsInjection<
	X extends PropertyKey,
	Y,
	X2Y extends Injection<X, Y, X2Y>,
> = (
	true
)

type Injection<
	X extends PropertyKey,
	Y,
	X2Y extends { [x in X]: Y },
> = (
	Total<X, Y, X2Y>
	&
	{ [x in X]: Exclude<Y, X2Y[Exclude<X, x>]> }
)

export type IsBijection<
	X extends PropertyKey,
	Y extends PropertyKey,
	X2Y extends Bijection<X, Y, X2Y>,
> = (
	true
)

type Bijection<
	X extends PropertyKey,
	Y,
	X2Y extends { [x in X]: Y },
> = (
	Surjection<X, Y, X2Y> & Injection<X, Y, X2Y>
)

export type IsInverse<
	X extends PropertyKey,
	Y extends PropertyKey,
	X2Y extends Bijection<X, Y, X2Y>,
	Y2X extends Inverse<X, Y, X2Y, Y2X>,
> = (
	true
)

type Inverse<
	X extends PropertyKey,
	Y extends PropertyKey,
	X2Y extends { [x in X]: Y },
	Y2X extends { [y in Y]: X },
> = (
	Total<Y, X, Y2X>
	&
	{ [y in Y]: InverseKey<X, Y, Y2X[y], y, X2Y, Y2X> }
)

type InverseKey<
	X extends PropertyKey,
	Y extends PropertyKey,
	XK extends X,
	YK extends Y,
	X2Y extends { [x in X]: Y },
	Y2X extends { [y in Y]: X },
> = (
	X2Y extends Record<XK, YK> ? Y2X extends Record<YK, XK> ? XK : never : never
)

type IfEquals<A, B, R> = (
	// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
	(<T>() => T extends A ? true : false) extends
	(<T>() => T extends B ? true : false) ? R : never
);
