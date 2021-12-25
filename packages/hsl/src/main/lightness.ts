import {PaintBucket} from '@paint-bucket/core';
import {hslColorSpace} from './hsl';

declare module '@paint-bucket/core/lib/PaintBucket' {

  interface PaintBucket {

    lighten(delta: number): this;

    lightenBy(percent: number): this;
  }
}

PaintBucket.prototype.lighten = function (this: PaintBucket, delta) {
  const hsl = this.forColorSpace(hslColorSpace);
  hsl.L += delta;
  return this;
};

PaintBucket.prototype.lightenBy = function (this: PaintBucket, percent) {
  const hsl = this.forColorSpace(hslColorSpace);
  hsl.L *= 1 + percent;
  return this;
};
