# @paint-bucket/gradient-plugin

Gradient manipulation plugin for [Paint Bucket](https://github.com/smikhalevski/paint-bucket/).

```ts
import { Color } from '@paint-bucket/core';
import gradientPlugin from '@paint-bucket/gradient-plugin';
import cssPlugin from '@paint-bucket/css-plugin';

Color.gradient(['#fff', '#000']).at(0.7).css(); // ⮕ #4d4d4d

Color.gradient(['#fff', '#000'], [0, 100]).at(70).css(); // ⮕ #4d4d4d

Color.parse('#fff').gradient('#000').at(0.7).css(); // ⮕ #4d4d4d
```
