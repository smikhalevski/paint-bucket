// Infers the first argument of a function that has multiple overloads
export type Parameter<T> =
    T extends {
      (arg: infer A): unknown;
      (arg: infer B): unknown;
      (arg: infer C): unknown;
      (arg: infer D): unknown;
      (arg: infer E): unknown;
      (arg: infer F): unknown;
      (arg: infer G): unknown;
      (arg: infer H): unknown;
      (arg: infer I): unknown;
      (arg: infer J): unknown;
      (arg: infer K): unknown;
      (arg: infer L): unknown;
      (arg: infer M): unknown;
      (arg: infer N): unknown;
      (arg: infer O): unknown;
      (arg: infer P): unknown;
      (arg: infer Q): unknown;
      (arg: infer R): unknown;
      (arg: infer S): unknown;
      (arg: infer T): unknown;
      (arg: infer U): unknown;
      (arg: infer V): unknown;
      (arg: infer W): unknown;
      (arg: infer X): unknown;
      (arg: infer Y): unknown;
      (arg: infer Z): unknown;
    } ?
      | (A extends {} ? A : never)
      | (B extends {} ? B : never)
      | (C extends {} ? C : never)
      | (D extends {} ? D : never)
      | (E extends {} ? E : never)
      | (F extends {} ? F : never)
      | (G extends {} ? G : never)
      | (H extends {} ? H : never)
      | (I extends {} ? I : never)
      | (J extends {} ? J : never)
      | (K extends {} ? K : never)
      | (L extends {} ? L : never)
      | (M extends {} ? M : never)
      | (N extends {} ? N : never)
      | (O extends {} ? O : never)
      | (P extends {} ? P : never)
      | (Q extends {} ? Q : never)
      | (R extends {} ? R : never)
      | (S extends {} ? S : never)
      | (T extends {} ? T : never)
      | (U extends {} ? U : never)
      | (V extends {} ? V : never)
      | (W extends {} ? W : never)
      | (X extends {} ? X : never)
      | (Y extends {} ? Y : never)
      | (Z extends {} ? Z : never)
    : never;
