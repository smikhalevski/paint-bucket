import {composeChannels, getColorChannel} from '@paint-bucket/core';
import {ILab} from './lab';

export function intToLab(color: number, lab: ILab): ILab {
  lab.L = getColorChannel(color, 0) / 0xFF * 100;
  lab.A = getColorChannel(color, 1) - 128;
  lab.B = getColorChannel(color, 2) - 128;
  lab.a = getColorChannel(color, 3) / 0xFF;
  return lab;
}

export function labToInt(lab: ILab): number {
  return composeChannels(
      0xFF * lab.L / 100,
      lab.A + 128,
      lab.B + 128,
      0xFF * lab.a,
  );
}
