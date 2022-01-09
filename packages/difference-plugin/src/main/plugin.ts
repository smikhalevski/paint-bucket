import {Color} from '@paint-bucket/core';
import {toColor} from '@paint-bucket/plugin-utils';
import {Lab} from '@paint-bucket/lab';
import {deltaE} from './deltaE';

const colorPrototype = Color.prototype;

colorPrototype.deltaE = function (this: Color, color) {
  return deltaE(this.get(Lab).slice(0), toColor(color).get(Lab));
};
