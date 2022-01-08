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
    : never;
