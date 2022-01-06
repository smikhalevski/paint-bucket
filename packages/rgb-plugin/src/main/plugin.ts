import {Applicator, color, Color, composeComponents, IRgb, normalizeComponents} from '@paint-bucket/core';
import {intToRgb, RGB} from '@paint-bucket/rgb';
import {clamp01, int, lerp, right, unNaN} from 'numeric-wrench';

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

function fromByte(x: number): number {
  return clamp01(unNaN(x) / 0xFF);
}

function from01(x: number): number {
  return clamp01(unNaN(x, 1));
}

color.fromRgb = function () {
  const args = arguments;
  return Color.create().setRgb(args[0], args[1], args[2], args[3]);
};

color.fromRgb24 = (rgb24, a) => Color.create().setRgb24(rgb24, a);

color.fromRgb32 = (rgb32) => Color.create().setRgb32(rgb32);

const colorPrototype = Color.prototype;

colorPrototype.toRgb = function (this: Color) {
  const rgb = this.getCopy(RGB);
  rgb.R *= 0xFF;
  rgb.G *= 0xFF;
  rgb.B *= 0xFF;
  return rgb;
};

colorPrototype.toRgb24 = function (this: Color) {
  const rgb = this.get(RGB);
  return right(composeComponents(rgb.R * 0xFF, rgb.G * 0xFF, rgb.B * 0xFF, 0xFF), 8);
};

colorPrototype.toRgb32 = function (this: Color) {
  const rgb = this.get(RGB);
  return composeComponents(rgb.R * 0xFF, rgb.G * 0xFF, rgb.B * 0xFF, rgb.a * 0xFF);
};

colorPrototype.setRgb = function (this: Color) {
  const args = arguments;
  const arg0 = args[0];
  const arg1 = args[1];
  const arg2 = args[2];
  const arg3 = args[3];

  const ref = this.ref();
  const rgb = ref.use(RGB);

  let R, G, B, a;

  if (arg1 != null) {
    R = isFunction(arg0) ? arg0(rgb.R) : arg0;
    G = isFunction(arg1) ? arg1(rgb.G) : arg1;
    B = isFunction(arg2) ? arg2(rgb.B) : arg2;
    a = isFunction(arg3) ? arg3(rgb.a) : arg3;
  } else {
    const rgb = isFunction(arg0) ? arg0(ref.toRgb()) : arg0;

    if (rgb != null) {
      R = rgb.R;
      G = rgb.G;
      B = rgb.B;
      a = rgb.a;
    }
  }
  if (R != null) {
    rgb.R = fromByte(R);
  }
  if (G != null) {
    rgb.G = fromByte(G);
  }
  if (B != null) {
    rgb.B = fromByte(B);
  }
  if (a != null) {
    rgb.a = from01(a);
  }
  return ref;
};

colorPrototype.setRgb24 = function (this: Color, rgb24, a) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  const alpha = rgb.a;

  rgb24 = int(isFunction(rgb24) ? rgb24(this.toRgb24()) : rgb24);
  intToRgb(normalizeComponents(rgb24, 6), rgb);

  a = isFunction(a) ? a(alpha) : a;
  rgb.a = a != null ? from01(a) : alpha;

  return ref;
};

colorPrototype.setRgb32 = function (this: Color, rgb32) {
  const ref = this.ref();

  rgb32 = int(isFunction(rgb32) ? rgb32(this.toRgb32()) : rgb32);
  intToRgb(normalizeComponents(rgb32, 8), ref.use(RGB));

  return ref;
};

export interface IAccessor<T> {
  (): T;
  (value: Applicator<T>): Color;
}

function createAccessor<T>(getter: (ref: Color) => T, setter: (ref: Color, value: T) => void): IAccessor<T>  {
  return function (this: Color): any {
    if (arguments.length === 1) {
      const ref = this.ref();
      setter(ref, isFunction(arguments[0]) ? arguments[0](getter(this)) : arguments[1]);
      return ref;
    } else {
      return getter(this);
    }
  };
}

colorPrototype.red = createAccessor(
    ref => ref.get(RGB).R * 0xFF,
    (ref, value) => ref.use(RGB).R = fromByte(value),
);

// colorPrototype.red = function (this: Color) {
//   return this.get(RGB).R * 0xFF;
// };
//
// colorPrototype.red = function (this: Color, R) {
//   const ref = this.ref();
//   const rgb = ref.use(RGB);
//   rgb.R = fromByte(isFunction(R) ? R(rgb.R) : R);
//   return ref;
// };

colorPrototype.getGreen = function (this: Color) {
  return this.get(RGB).G * 0xFF;
};

colorPrototype.setGreen = function (this: Color, G) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  rgb.G = fromByte(isFunction(G) ? G(rgb.G) : G);
  return ref;
};

colorPrototype.getBlue = function (this: Color) {
  return this.get(RGB).B * 0xFF;
};

colorPrototype.setBlue = function (this: Color, B) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  rgb.B = fromByte(isFunction(B) ? B(rgb.B) : B);
  return ref;
};

colorPrototype.getAlpha = function (this: Color) {
  return this.get(RGB).a;
};

colorPrototype.setAlpha = function (this: Color, a) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  rgb.a = from01(isFunction(a) ? a(rgb.a) : a);
  return ref;
};

colorPrototype.getBrightness = function (this: Color) {
  const rgb = this.get(RGB);
  return rgb.R * 0.299 + rgb.G * 0.587 + rgb.B * 0.114;
};

colorPrototype.setBrightness = function (this: Color, b) {
  const ref = this.ref();
  const rgb = this.use(RGB);
  const brightness = ref.getBrightness();
  const ratio = brightness / fromByte(isFunction(b) ? b(brightness) : b);
  rgb.R *= ratio;
  rgb.G *= ratio;
  rgb.B *= ratio;
  return ref;
};

colorPrototype.getLuminance = function (this: Color) {
  const rgb = this.get(RGB);
  return componentLuminance(rgb.R) * 0.2126 + componentLuminance(rgb.G) * 0.7152 + componentLuminance(rgb.B) * 0.0722;
};

function componentLuminance(v: number): number {
  return v > 0.03928 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

colorPrototype.getContrast = function (this: Color, color) {
  const l1 = this.getLuminance();
  const l2 = color.getLuminance();
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

colorPrototype.mix = function (this: Color, color, ratio) {
  const ref = this.ref();
  const rgb1 = ref.use(RGB);
  const rgb2 = color.get(RGB);
  ratio = from01(ratio);

  rgb1.R = lerp(ratio, rgb1.R, rgb2.R);
  rgb1.G = lerp(ratio, rgb1.G, rgb2.G);
  rgb1.B = lerp(ratio, rgb1.B, rgb2.B);

  return ref;
};

colorPrototype.greyscale = function (this: Color) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  const value = Math.sqrt(rgb.R * rgb.R * 0.299 + rgb.G * rgb.G * 0.587 + rgb.B * rgb.B * 0.114);

  rgb.R = value;
  rgb.G = value;
  rgb.B = value;

  return ref;
};
