import { Color } from '@paint-bucket/core';
import { LAB } from '@paint-bucket/lab';
import { deltaE } from './deltaE';

Color.prototype.deltaE = function (color) {
  return deltaE(this.get(LAB), Color.parse(color).get(LAB));
};
