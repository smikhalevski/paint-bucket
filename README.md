# Paint Bucket 🪣 [![build](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/paint-bucket/actions/workflows/master.yml)

Highly performant and extensible color manipulation library.

https://jonneal.dev/convert-colors/lab-xyz.js.html#line44
https://github.com/colorjs/color-space/blob/master/test/index.js

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '@paint-bucket/perception-plugin';

color(0xFF_00_00).toGrayscale().isIndistinguishable(color(0xAA_AA_AA)); // → true
```
