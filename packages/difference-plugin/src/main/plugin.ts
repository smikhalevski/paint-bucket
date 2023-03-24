import { Color } from '@paint-bucket/core';
import { LAB } from '@paint-bucket/lab';
import { getDeltaE } from './getDeltaE';

Color.prototype.deltaE = function (color) {
  return getDeltaE(this.getComponents(LAB), Color.parse(color).getComponents(LAB));
};
