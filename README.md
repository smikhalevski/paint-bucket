# Paint Bucket 🪣 [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

Highly performant and extensible color manipulation library.

```shell
npm install --save-prod paint-bucket
```

# Usage

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '@paint-bucket/difference-plugin';

// or import all plugins at once using
// import {color} from 'paint-bucket';

color('#abcdef').saturation((S) => S / 2).red(); // → 188
```

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance testsuite.

Results are in millions of operations per second. The higher number is better.

|  | paint-bucket | [tinycolor2](https://github.com/bgrins/TinyColor) | [chroma.js](https://github.com/gka/chroma.js) |
| --- | ---: | ---: | ---: | 
| Create | 13.61 | 3.35 | 1.36 |
| Desaturate | 6.53 | 0.72 | 0.51 |

# ❤️

I cannot overestimate how much these libraries helped me to implement color model conversion algorithms:

- [@jonathantneal/convert-colors](https://github.com/jonathantneal/convert-colors)
- [@colorjs/color-space](https://github.com/colorjs/color-space)
