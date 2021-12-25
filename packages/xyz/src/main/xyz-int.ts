import {composeChannels, getColorChannel} from '@paint-bucket/core';
import {IXyz, MAX_X, MAX_Z} from './xyz';

export function intToXyz(color: number, xyz: IXyz): IXyz {
  xyz.X = getColorChannel(color, 0) / 0xFF * MAX_X;
  xyz.Y = getColorChannel(color, 1) / 0xFF * 100;
  xyz.Z = getColorChannel(color, 2) / 0xFF * MAX_Z;
  xyz.a = getColorChannel(color, 3) / 0xFF;
  return xyz;
}

export function xyzToInt(xyz: IXyz): number {
  return composeChannels(
      0xFF * xyz.X / MAX_X,
      0xFF * xyz.Y / 100,
      0xFF * xyz.Z / MAX_Z,
      0xFF * xyz.a,
  );
}
