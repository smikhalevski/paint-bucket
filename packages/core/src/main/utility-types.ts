type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>;
type OverloadUnionRecursive<TOverload, TPartialOverload = unknown> = TOverload extends (
  ...args: infer TArgs
) => infer TReturn
  ? // Prevent infinite recursion by stopping recursion when TPartialOverload
    // has accumulated all of the TOverload signatures.
    TPartialOverload extends TOverload
    ? never
    :
        | OverloadUnionRecursive<
            TPartialOverload & TOverload,
            TPartialOverload & ((...args: TArgs) => TReturn) & OverloadProps<TOverload>
          >
        | ((...args: TArgs) => TReturn)
  : never;

type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<
  OverloadUnionRecursive<
    // The "() => never" signature must be hoisted to the "front" of the
    // intersection, for two reasons: a) because recursion stops when it is
    // encountered, and b) it seems to prevent the collapse of subsequent
    // "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
    // which gives a direct conversion to a union.
    (() => never) & TOverload
  >,
  TOverload extends () => never ? never : () => never
>;

/*
The tricks to the above recursion are...

a) Inferring the parameter and return types of an overloaded function will use
the last overload signature, which is apparently an explicit design choice.

b) Intersecting a single signature with the original intersection, can reorder
the intersection (possibly an undocumented side effect?).

c) Intersections can only be re-ordered, not narrowed (reduced), So, the
intersection has to be rebuilt in the "TPartialOverload" generic, then
recursion can be stopped when the full intersection has been rebuilt.
Otherwise, this would result in an infinite recursion.
*/

// Eureka!
type TestA1 = OverloadUnion<{
  (): void;
  (a: 1): 1;
  (a: 2, b: 2): 2;
}>;

// Edge Case: "() => never" signature must be hoisted.
type TestA2 = OverloadUnion<{
  (): void;
  (a: 1): 1;
  (a: 2, b: 2): 2;
  (): never;
}>;

// Edge Case: Duplicate signatures are omitted.
type TestA3 = OverloadUnion<{
  (): void;
  (a: 1): 1;
  (): void; // duplicate
  (a: 2, b: 2): 2;
  (a: 1): 1; // duplicate
}>;

// Note that the order of overloads is maintained in the union, which means
// that it's reversible using a UnionToIntersection type where the overload
// order matters. The exception is "() => never", which has to be hoisted
// to the front of the intersection. However, it's the most specific signature,
// which means hoisting it should be safe if the union is converted back to an
// intersection.

// Inferring a union of parameter tuples or return types is now possible.
export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<OverloadUnion<T>>;
