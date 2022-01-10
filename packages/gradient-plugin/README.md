# @paint-bucket/gradient-plugin

Gradient manipulation plugin for [Paint Bucket](https://github.com/smikhalevski/paint-bucket/).

```ts
import {color} from '@paint-bucket/core';
import '@paint-bucket/gradient-plugin';
import '@paint-bucket/css';

color.gradient(['#fff', '#000']).at(0.7).css(); // → #4d4d4d

color.gradient(['#fff', '#000'], [0, 100]).at(70).css(); // → #4d4d4d

color('#fff').linearGradient('#000').at(0.7).css(); // → #4d4d4d
```
