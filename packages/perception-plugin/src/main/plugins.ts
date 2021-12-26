import {color, Color} from '@paint-bucket/core';
import {deltaE2000} from './deltaE2000';
import {LAB} from '@paint-bucket/lab';
import {areIndistinguishableColors} from './utils';

declare module '@paint-bucket/core/lib/PaintBucket' {

  interface IPaintBucketFactory {
    (qweqwee: number): PaintBucket;
  }

  interface PaintBucket {

    deltaE2000(color: PaintBucket): number;

    isIndistinguishable(color: PaintBucket): boolean;
  }
}

Color.prototype.deltaE2000 = function (this: Color, color) {
  return deltaE2000(this.as(LAB), color.forColorSpace(LAB));
};

Color.prototype.isIndistinguishable = function (this: Color, color) {
  return areIndistinguishableColors(this.as(LAB), color.forColorSpace(LAB));
};
