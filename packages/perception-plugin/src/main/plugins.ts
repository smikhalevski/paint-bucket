import {PaintBucket} from '@paint-bucket/core';
import {deltaE2000} from './deltaE2000';
import {LAB} from '@paint-bucket/lab';
import {areIndistinguishableColors} from './utils';

declare module '@paint-bucket/core/lib/PaintBucket' {

  interface PaintBucket {

    deltaE2000(color: PaintBucket): number;

    isIndistinguishable(color: PaintBucket): boolean;
  }
}

PaintBucket.prototype.deltaE2000 = function (this: PaintBucket, color) {
  return deltaE2000(this.forColorSpace(LAB), color.forColorSpace(LAB));
};

PaintBucket.prototype.isIndistinguishable = function (this: PaintBucket, color) {
  return areIndistinguishableColors(this.forColorSpace(LAB), color.forColorSpace(LAB));
};
