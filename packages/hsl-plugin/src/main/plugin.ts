import {IHsl} from '@paint-bucket/hsl';
import {color} from '@paint-bucket/core';

export type Applicator<T> = T | ((prevValue: T) => T);

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    fromHsl(hsl: Readonly<Partial<IHsl>>): Color;

    fromHsl(H: number, S: number, L: number, a?: number): Color;

    fromHsl24(hsl24: number, a?: number): Color;

    fromHsl32(hsl32: number): Color;
  }

  interface Color {

    toHsl(): IHsl;

    toHsl24(): number;

    toHsl32(): number;

    setHsl(hsl: Applicator<Readonly<Partial<IHsl>>>): this;

    setHsl(H: Applicator<number>, S: Applicator<number>, L: Applicator<number>, a?: Applicator<number>): this;

    setHsl24(hsl24: Applicator<number>, a?: Applicator<number>): this;

    setHsl32(hsl32: Applicator<number>): this;

    getHue(): number;

    setHue(H: Applicator<number>): this;

    getSaturation(): number;

    setSaturation(S: Applicator<number>): this;

    getLightness(): number;

    setLightness(L: Applicator<number>): this;

    toHsl(): IHsl;
  }
}
