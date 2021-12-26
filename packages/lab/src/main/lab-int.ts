import {composeComponents, getColorComponent} from '@paint-bucket/core';
import {ILab} from './lab';

export function intToLab(color: number, lab: ILab): ILab {
  lab.L = getColorComponent(color, 0) / 0xFF * 100;
  lab.A = getColorComponent(color, 1) - 128;
  lab.B = getColorComponent(color, 2) - 128;
  lab.a = getColorComponent(color, 3) / 0xFF;
  return lab;
}

export function labToInt(lab: ILab): number {
  return composeComponents(
      0xFF * lab.L / 100,
      lab.A + 128,
      lab.B + 128,
      0xFF * lab.a,
  );
}
