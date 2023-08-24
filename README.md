<p align="center">
  <a href="#readme">
    <img alt="Paint Bucket" src="images/logo.png" width="600"/>
  </a>
</p>

[Highly performant](#performance), [extensible](#plugins), and
[tiny](https://bundlephobia.com/package/paint-bucket) color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

🔎 [API documentation is available here.](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html)

```ts
import { clr } from 'paint-bucket';

clr('#abcdef').saturation(S => S / 2).red(); // ⮕ 188
```

You can cherry-pick plugins that you need:

```ts
import { clr, Color } from 'paint-bucket/core';
import rgbPlugin from 'paint-bucket/plugin/rgb';

rgbPlugin(Color);

clr().red(); // ✅

clr().saturation(); // ❌ Error: saturation not defined
```

Most methods provide getter-setter semantics:

```ts
// Setter
clr('#f00').red(127.5); // ⮕ Color instance
// or
clr('#f00').red(R => R / 2); // ⮕ Color instance

// Getter
clr('#f00').red(); // ⮕ 255
```

Mutate multiple components at the same time:

```ts
clr([64, 128, 0])
  .rgb(([R, G, B, a]) => [R * 3, G * 2, B, a])
  .rgb();
// ⮕ [192, 255, 0, 1]
```

[`clr`](https://smikhalevski.github.io/paint-bucket/functions/paint_bucket_core.clr-1.html) returns a mutable instance
of the [`Color`](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html) class. To create a
copy of the `Color` instance you can use one of these approaches:

```ts
const color1 = clr('#f00');

// color2 is a copy of color1
const color2 = clr(color1);
// or
const color3 = color1.clone();
```

Parse and serialize CSS color strings:

```ts
clr('pink').css(); // ⮕ "#ffc0cb"

clr('rgba(255, 192, 203)').css(); // ⮕ "#ffc0cb"
```

Create gradients and obtain color at arbitrary position:

```ts
clr.gradient(['red', 'blue']).at(0.7).css(); // ⮕ "#4d00b3"
```

Create multi-stop gradients with custom stop values:

```ts
clr.gradient()
  .stop(0, 'red')
  .stop(50, 'pink')
  .stop(100, 'blue')
  .at(70)
  .css();
// ⮕ "#9973e0"
```

# Concepts

<dl>
<dt><a href="https://en.wikipedia.org/wiki/Color_model">Color model</a></dt>
<dd>

An abstract mathematical model describing the way colors can be represented as tuples of numbers (aka color components).

There's a large variety of color models aimed for different purposes. Different color models define different color
components. For example, RGB color model defines three color components: red, green and blue; while HSL defines hue,
saturation and lightness color components. One color model can be converted to the other.

</dd>
<dt><a href="https://en.wikipedia.org/wiki/Color_space">Color space</a></dt>
<dd>

Defines how color components of the particular color model are serialized.

For example, RGB color model can be represented as Adobe RGB or sRGB color space.

</dd>
</dl>

Paint Bucket provides an abstraction for color models which are represented as objects that define methods to convert
color components between color model representation and RGB. Color components are an array of numbers.

```ts
import { ColorModel, RGB } from 'paint-bucket/core';

const CMYK: ColorModel = {
  name: 'CMYK',

  // The number of color components that this model uses:
  // cyan, magenta, yellow, black, and alpha 
  componentCount: 5,

  convertComponentsToRGB(components: readonly number[], rgb: RGB): void {
    // Update elements of the rgb array
  },
  convertRGBToComponents(rgb: Readonly<RGB>, components: number[]): void {
    // Update elements of the components array
  },
};
```

Color models are pluggable.

- `paint-bucket/color-model/hsl` for [HSL color model](https://en.wikipedia.org/wiki/HSL_and_HSV);

- `paint-bucket/color-model/hsv` for [HSV color model](https://en.wikipedia.org/wiki/HSL_and_HSV);

- `paint-bucket/color-model/lab` for [CIE-L\*a\*b\* color model](https://en.wikipedia.org/wiki/CIELAB_color_space);

- `paint-bucket/color-model/xyz` for [CIE 1931 XYZ color model](https://en.wikipedia.org/wiki/CIE_1931_color_space);

Color model converters expect component values to be in [0, 1] range. Plugin APIs may return component values in any
other range, but internally components are always normalized to [0, 1].

```ts
import { HSL } from 'paint-bucket/color-model/hsl';

const hsl: HSL = [
  1, // Hue
  0, // Saturation
  0, // Lightness
  1, // Alpha
];
```

When you create a new `Color` instance, it uses the RGB color model and corresponding components for the black color.

```ts
import { Color } from 'paint-bucket/core';

new Color(); // Opaque black RGB color
```

You can create a color with any model and components.

```ts
import { Color } from 'paint-bucket/core';
import { HSL } from 'paint-bucket/color-model/hsl';

new Color(HSL, [0.5, 1, 0.5, 0.7]); // 70% transparent cyan HSL color
```

`Color` provides a mechanism to acquire color components in any color model via the
[`getComponents`](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html#getComponents)
method.

```ts
import { Color, RGB } from 'paint-bucket/core';
import { HSL } from 'paint-bucket/color-model/hsl';

new Color(HSL, [0.5, 1, 0.5, 0.7]).getComponents(RGB); // ⮕ [0, 1, 1, 0.7]
```

Here, we created a Color instance initialized with the components of the cyan color in the HSL color model and retrieved
components in the RGB color model.

[`getComponents`](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html#getComponents) method
returns read-only color components, which are computed on the fly. To update the color components of the `Color`
instance, you should useComponents the
[`useComponents`](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html#useComponents)
method. This method returns a writable array of components in a particular color model.

```ts
import { Color, RGB } from 'paint-bucket/core';
import { HSL } from 'paint-bucket/color-model/hsl';

const color = new Color(HSL, [0.5, 1, 0.5, 0.5]); // cyan
const rgb = color.useComponents(RGB);

// Set blue component value to 0 
rgb[2] = 0;

color.getComponents(HSL); // ⮕ Green [0.333, 1, 0.5, 0.7]
```

# Plugins

Paint Bucket relies on plugins in every aspect. The `paint-bucket/core` doesn't implement any color manipulation
functionality.

```ts
import { clr, Color } from 'paint-bucket/core';
import rgbPlugin from 'paint-bucket/plugin/rgb';

rgbPlugin(Color);

clr().red(64).red(R => R * 2).red(); // ⮕ 128
```

Here's a list of plugins in this repo:

- `paint-bucket/plugin/rgb` implements RGBa color model manipulation methods;

- `paint-bucket/plugin/hsl` implements HSLa color model manipulation methods;

- `paint-bucket/plugin/palette` creates various color palettes from the base color;

- `paint-bucket/plugin/difference` provides [color difference](https://en.wikipedia.org/wiki/Color_difference)
  computation methods;

- `paint-bucket/plugin/css` enables
  [`clr`](https://smikhalevski.github.io/paint-bucket/functions/paint_bucket_core.clr-1.html) function to parse CSS
  color strings;

- `paint-bucket/plugin/x11` enables
  [`clr`](https://smikhalevski.github.io/paint-bucket/functions/paint_bucket_core.clr-1.html) to recognize
  [X11 color names](https://en.wikipedia.org/wiki/X11_color_names).

## Extend color instance

Below is an example that shows how to extend the
[`Color`](https://smikhalevski.github.io/paint-bucket/classes/paint_bucket_core.Color.html)
prototype to implement a color component read and write methods.

```ts
// ./my-plugin.ts
import { Color, RGB } from 'paint-bucket/core';

declare module 'paint-bucket/core' {
  interface Color {
    // Returns the green color component in range [0, 255]
    getGreen(): number;

    // Sets the green color component in range [0, 255]
    setGreen(green: number): Color;
  }
}

export default function (ctor: typeof Color): void {

  ctor.prototype.getGreen = function () {
    // Get read-only array of RGB color components where each component
    // is in [0, 1] range
    const rgb = this.getComponents(RGB);

    return rgb[1] * 255;
  };

  ctor.prototype.setGreen = function (green) {
    // Get writable array of RGB color components where each component
    // is in [0, 1] range
    const rgb = this.useComponents(RGB);

    // Update the green component
    rgb[1] = green / 255;

    // Return Color instance to allow chaining
    return this;
  };
}
```

To use this plugin we need to create a `Color` instance:

```ts
import { clr, Color, RGB } from 'paint-bucket/core';
import myPlugin from './my-plugin';

myPlugin(Color);

const color = clr().setRed(128);

color.getComponents(RGB); // ⮕ [0.5, 0, 0, 1]
```

# Performance

Clone this repo and use `npm ci && npm run build && npm run perf` to run the performance testsuite.

Results are in millions of operations per second [^1]. The higher number is better.

|                                                   | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
|---------------------------------------------------|-------------:|--------------------------------------------------:|----------------------------------------------:| 
| `clr([255, 255, 255])`                            |         18.1 |                                               3.8 |                                           2.1 |
| `clr('#abc')`                                     |          6.5 |                                               1.6 |                                           1.7 |
| `clr('#abcdef')`                                  |          6.2 |                                               1.8 |                                           1.9 |
| `clr('#abcdefff')`                                |          5.7 |                                               1.8 |                                           1.7 |
| `clr(0xab_cd_ef)`                                 |         15.3 |                                                🚫 |                                           2.9 |
| `clr().rgb32(0xab_cd_ef_ff)`                      |         15.6 |                                                🚫 |                                            🚫 |
| `clr('rgba(128, 128, 128, 0.5)')`                 |          3.0 |                                               1.5 |                                           0.2 |
| `clr(…).saturation(50).rgb()`                     |         11.0 |                                               0.9 |                                           1.0 |
| `clr(…).hue(90).lightness(10).rgb()`              |          9.5 |                                               0.6 |                                            🚫 |
| `clr.gradient(['#fff', '#000'])`                  |          3.3 |                                                🚫 |                                           0.5 |
| `clr.gradient(…).at(0.5, RGB, lerp)` [^2]         |          8.5 |                                                🚫 |                                           3.7 |
| `clr.gradient(…).at(0.5, LAB, csplineMonot)` [^2] |          8.4 |                                                🚫 |                                           3.8 |

[^1]: Performance was measured on Apple M1 Max using [TooFast](https://github.com/smikhalevski/toofast).

[^2]: [`lerp`](https://github.com/smikhalevski/algomatic/#lerp) and
[`csplineMonot`](https://github.com/smikhalevski/algomatic/#csplinemonot) are linear and monotonous cubic spline
interpolation factories respectively from [Algomatic](https://github.com/smikhalevski/algomatic).
