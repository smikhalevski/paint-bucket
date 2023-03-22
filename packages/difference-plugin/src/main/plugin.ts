import { Color } from '@paint-bucket/core';
import { Lab } from '@paint-bucket/lab';
import { deltaE } from './deltaE';

Color.prototype.deltaE = function (color) {
  return deltaE(this.get(Lab), Color.parse(color).get(Lab));
};
