# Paint Bucket 🪣 [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

[Highly performant](#performance), [extensible](#extensibility) and
[tiny](https://bundlephobia.com/package/paint-bucket) color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

📚 [API documentation is available here.](https://smikhalevski.github.io/paint-bucket/classes/core_src_main.Color.html)

```ts
import {color} from 'paint-bucket';

// or cherry-pick plugins to reduce bundle size
// import {color} from '@paint-bucket/core';
// import '@paint-bucket/rgb-plugin';
// import '@paint-bucket/hsl-plugin';
// import '@paint-bucket/css-plugin';

color('#abcdef').saturation((S) => S / 2).red(); // → 188
```

# Color Models

Color manipulation isn't possible without the [Color model](https://en.wikipedia.org/wiki/Color_model) concept and its
components. There's a large variety of those aimed for different operations, and bundling converters for all known
models into a single bundle would be excessive in most cases. So, to keep the reasonable size of the bundle and to make
the code highly extensible, Paint Bucket provides pluggable color models.

A color model is an object that defines methods to convert color components between its representation and RGB. Color
components are an array of numbers.

```ts
import {ColorModel} from '@paint-bucket/core';

const Cmyk: ColorModel = {

  componentsToRgb(components, rgb) {
    // Update items of the rgb array here
  },
  rgbToComponents(rgb, components) {
    // Update items of the components array here
  },
};
```

The [`@paint-bucket/core`](./packages/core) defines only the RGB color model. There are four more packages that define
HSL, HSV, CIE-L*a*b*, and CIE 1931 XYZ color models: [`@paint-bucket/hsl`](./packages/hsl),
[`@paint-bucket/hsv`](./packages/hsv), [`@paint-bucket/lab`](./packages/lab), and [`@paint-bucket/xyz`](./packages/xyz).

Color models expect component values to be in [0, 1] range. Plugin APIs may return component values in any other range,
but internally components are always normalized to [0, 1].

```ts
import {Hsl} from '@paint-bucket/hsl';

const hsl: Hsl = [/*H*/ 1, /*S*/ 0, /*L*/ 0, /*alpha*/ 1];
```

When you create a new Color instance, it uses the RGB color model and corresponding components for the black color.

```ts
import {Color} from '@paint-bucket/core';

new Color(); // Opaque black RGB color
```

You can create a color with any model and components.

```ts
import {Color} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

new Color(Hsl, [0.5, 1, 0.5, 0.7]); // 70% transparent cyan HSL color
```

`Color` provides a mechanism to acquire color components in any color model via the `Color.get` method.

```ts
import {Color, Rgb} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

new Color(Hsl, [0.5, 1, 0.5, 0.7]).get(Rgb);
// → [ /*R*/ 0, /*G*/ 1, /*B*/ 1, /*alpha*/ 0.7]
```

Here, we created a Color instance initialized with the components of the cyan color in the HSL color model and retrieved
components in the RGB color model.

`Color.get` method returns read-only color components, which are computed on the fly. To update the color components of
the `Color` instance, you should use the `Color.use` method. This method returns a writable array of components in a
particular color model.

```ts
import {Color, Rgb} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

const color = new Color(Hsl, [0.5, 1, 0.5, 0.5]); // Cyan
const rgb = color.use(Rgb);

// Set blue component value to 0 
rgb[2] = 0;

color.get(Hsl); // → Green [0.333, 1, 0.5, 0.7]
```

# Extensibility

Paint Bucket library relies on plugins in every aspect. The core package doesn't implement any color manipulation
functionality.

## Instance Methods

Below is an example that shows how to extend the `Color` prototype to implement a color component read and write
methods.

```ts
// ./plugin1.ts

import {Color, Rgb} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    /**
     * @returns The red color component in range [0, 255]
     */
    getRed(): number;

    /**
     * Sets the red color component.
     *
     * @param R The red color component in range [0, 255]
     */
    setRed(value: number): Color;
  }
}

Color.prototype.getRed = function (this: Color) {

  // Get read-only array of RGB color components where each component
  // is in [0, 1] range
  const rgb = this.get(Rgb);

  return rgb[0] * 255;
};

Color.prototype.setRed = function (this: Color, value) {

  // Get writable array of RGB color components where each component
  // is in [0, 1] range
  const rgb = this.use(Rgb);

  // Update the red component
  rgb[0] = value / 255;

  // Return Color instance to allow chaining
  return this;
};
```

To use this component we need to create a `Color` instance:

```ts
import {Color, Rgb} from '@paint-bucket/core';
import './plugin1.ts';

const color = new Color().setRed(128);

color.get(Rgb); // → [1, 0, 0, 1]
```

## Color Parsing

Using `Color` constructor and initializing colors using arrays of components isn't the most convenient way, so
`@paint-bucket/core` exports a `color` function to streamline this process.

```ts
import {color, Rgb} from '@paint-bucket/core';
import './plugin1.ts';

color().setRed(128).get(Rgb); // → [1, 0, 0, 1]
```

`color` function returns the `Color` instance. Using plugins, you can extend what arguments `color` function would
accept. Below is the example, how you can implement creating `Color` by its name.

```ts
// ./plugin2.ts

import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  // Merge declarations for the interface that the color function implements
  interface ColorFunction {

    (name: 'pink' | 'cyan' | 'bisque'): Color;
  }
}

// Add the parsing middleware
Color.overrideParser((next) => (name) => {
  switch (name) {

    case 'pink':
      return new Color(Rgb, [1, 1, 1, 1]); // #FFC0CB

    case 'cyan':
      return new Color(Rgb, [1, 1, 1, 1]); // #00FFFF

    case 'bisque':
      return new Color(Rgb, [1, 1, 1, 1]); // #FFE4C4
  }

  // If the name wasn't recognized then pass the argument to the next middleware
  // (if awailable) or to the default parser implementation
  return next(value);
});
```

Now we can use this plugin with the `color` function.

```ts
import {color, Rgb} from '@paint-bucket/core';
import './plugin2.ts';

color('cyan').get(Rgb); // → [0, 1, 1, 1]
```

# Color Manipulation

📚 [You can find docs on all manipulation methods here.](https://smikhalevski.github.io/paint-bucket/classes/core_src_main.Color.html)

There's a set of packages that extend `Color` and `color` with various methods and parsing mechanisms:
[`@paint-bucket/rgb-plugin`](./packages/rgb-plugin), [`@paint-bucket/hsl-plugin`](./packages/hsl-plugin),
[`@paint-bucket/css-plugin`](./packages/css-plugin), and
[`@paint-bucket/difference-plugin`](./packages/difference-plugin)

These packages provide API with jQuery-like getter-setter methods and React-like callback support.

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '@paint-bucket/hsl-plugin';
import '@paint-bucket/x11-plugin';
import '@paint-bucket/css-plugin';

color('pink')
    .hue(90)
    .saturation((S) => S / 2)
    .css();
// → '#e0efd0'

color([64, 128, 0])
    .rgb(([R, G, B, a]) => [R * 3, G * 2, B, a])
    .rgb();
// → [192, 255, 0, 1]

color('#ffc0cb')
    .hsl()
// → [ 349.52, 100, 87.64, 1 ]
```

`color` returns a mutable instance of `Color`. To create a copy of the `Color` instance you can use one of these
approaches:

```ts
import {color} from 'paint-bucket';

const color1 = color('pink').red(128);

// color2 is a copy of color1
const color2 = color(color1);
// or
const color3 = color1.clone();
```

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance testsuite.

Results are in millions of operations per second. The higher number is better.

|  | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
| --- | ---: | ---: | ---: | 
| Create | 12.61 | 3.35 | 1.45 |
| Parse HEX | 5.21 | 0.93 | 0.97 |
| Parse RGBa | 1.64 | 0.86 | 0.09 |
| Desaturate | 7.14 | 0.72 | 0.48 |
| Spin + Lighten | 4.65 | 0.37 | — |
| Gradient | 2.43 | — | 0.15 |

# ❤️

I cannot overestimate how much these libraries helped me to implement color model conversion algorithms:

- [@jonathantneal/convert-colors](https://github.com/jonathantneal/convert-colors)
- [@colorjs/color-space](https://github.com/colorjs/color-space)
