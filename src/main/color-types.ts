export interface IRgb {
  r: number; // [0, 255]
  g: number; // [0, 255]
  b: number; // [0, 255]
  alpha: number; // [0, 1]
}

export interface IHsl {
  h: number; // [0, 1]
  s: number; // [0, 1]
  l: number; // [0, 1]
  alpha: number; // [0, 1]
}

export type ColorLike = string | IRgb | IHsl;
