import {hsl, rgb} from './color-factory';
import {IHsl, IRgb} from './color-objects';

const tempRgb = rgb(0, 0, 0);

const tempHsl = hsl(0, 0, 0);


export function readCss(color: string): IRgb | IHsl | undefined {
}
