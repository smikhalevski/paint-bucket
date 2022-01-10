import {Color} from '@paint-bucket/core';
import {toColor} from '@paint-bucket/plugin-utils';
import {Lab} from '@paint-bucket/lab';
import {deltaE} from './deltaE';

export {_Color as Color};

const _Color = function (Color) {

  const colorPrototype = Color.prototype;

  colorPrototype.deltaE = function (this: Color, color) {
    return deltaE(this.get(Lab), toColor(color).get(Lab));
  };

  return Color;
}(Color);
