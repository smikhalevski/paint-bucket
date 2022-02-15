/**
 * Infers a union of parameters of function overload signatures.
 *
 * ```ts
 * declare function foo(): void;
 * declare function foo(a: string): void;
 * declare function foo(a: boolean, b: number): void;
 *
 * OverloadParameters<typeof foo>;
 * // → [] | [a: string] | [a: boolean, b: number]
 * ```
 *
 * @see https://github.com/microsoft/TypeScript/issues/32164#issuecomment-890824817
 */
export type OverloadParameters<T> = _TupleArrayUnion<_ExcludeUnknowns<_Parameters<T>>>;

// unknown[] is inferred for any additional overloads that were not actually declared
type _Parameters<T> = T extends {
      (...args: infer A1): unknown;
      (...args: infer A2): unknown;
      (...args: infer A3): unknown;
      (...args: infer A4): unknown;
      (...args: infer A5): unknown;
      (...args: infer A6): unknown;
      (...args: infer A7): unknown;
      (...args: infer A8): unknown;
      (...args: infer A9): unknown;
    }
    ? [A1, A2, A3, A4, A5, A6, A7, A8, A9]
    : never;

// type T1 = _ExcludeUnknowns<[unknown[], string[]]>;
// → [string[]]
type _ExcludeUnknowns<T> = T extends [infer A, ...infer R]
    ? unknown[] extends A
        ? _ExcludeUnknowns<R>
        : [A, ..._ExcludeUnknowns<R>]
    : T;

// type T1 = _TupleArrayUnion<[[], [string], [string, number]]>;
// → [] | [string] | [string, number]
type _TupleArrayUnion<A extends readonly unknown[][]> = A extends (infer T)[]
    ? T extends unknown[]
        ? T
        : []
    : [];
