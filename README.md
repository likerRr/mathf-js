# Mathf
Unity3D's [Mathf](http://docs.unity3d.com/ScriptReference/Mathf.html) port

## What is this?
This is js port of Unity3D's Mathf class. It has been achieved by reverse engineering the work of original class and all the ported methods work exactly the same (except `PerlinNoise` method, cuz of different random realization and seed value). You can use this library in game development or in any other cases where you find existing methods useful.

## Which platform should I use?
Originally it is `node` plugin serving by `npm` and using available ES6 features, but you can easily adopt it to work in browser with help of [Babel](https://babeljs.io/) or another ES6 transpiler

## What's not included
Useless within javascript methods:
* `CeilToInt`
* `FloorToInt`
* `RoundToInt`

Built-in js native methods and constants:
* `Infinity`
* `PI`
* `Abs`
* `Acos`
* `Asin`
* `Atan`
* `Atan2`
* `Ceil`
* `Cos`
* `Exp`
* `Floor`
* `Log`
* `Log10`
* `Max`
* `Min`
* `Pow`
* `Sin`
* `Sqrt`
* `Tan`

> **Note:** Unity3D's `Mathf.Round` has different behavior then native javascript's `Math.round`, so this method has own implementation `Mathf.round`

## What's included?
This port includes almost (read below why) all non default (for native `js`) methods and properties available in the Unity3D's `Mathf` class. Namely:

### Static Variables

#### `Deg2Rad`
*Degrees-to-radians conversion constant*

#### `Epsilon`
*A tiny floating point value*

#### `NegativeInfinity`
*A representation of negative infinity*

#### `Rad2Deg`
*Radians-to-degrees conversion constant*

### Static Functions

#### `approximately(f1, f2)`
*Compares two floating point values if they are similar*

#### `clamp(value, min, max)`
*Clamps a value between a minimum float and maximum float value*

#### `clamp01(value)`
*Clamps value between 0 and 1 and returns value*

#### `closestPowerOfTwo(value)`
*Returns the closest power of two value*

#### `deltaAngle(current, target)`
*Calculates the shortest difference between two given angles given in degrees*

#### `gammaToLinearSpace(value)`
*Converts the given value from gamma (sRGB) to linear color space*

#### `inverseLerp(a, b, value)`
*Calculates the linear parameter t that produces the interpolant value within the range [a, b]*

#### `isPowerOfTwo(value)`
*Returns true if the value is power of two*

#### `lerp(a, b, t)`
*Linearly interpolates between a and b by t*

#### `lerpAngle(a, b, t)`
*Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees*

#### `lerpUnclamped(a, b, t)`
*Linearly interpolates between a and b by t*

#### `linearToGammaSpace(value)`
*Converts the given value from linear to gamma (sRGB) color space*

#### `moveTowards(current, target , maxDelta)`
*Moves a value current towards target*

#### `nextPowerOfTwo(value)`
*Returns the next power of two value*

#### `perlinNoise(x, y)`
*Generate 2D Perlin noise*

#### `pingPong(t, length)`
*PingPongs the value t, so that it is never larger than length and never smaller than 0*

#### `repeat(t, length)`
*Loops the value t, so that it is never larger than length and never smaller than 0*

#### `round(f)`
*Returns f rounded to the nearest integer*

#### `sign(f)`
*Returns the sign of f*

### Not ported methods
I didn't find proper implementations for them, so if you know it welcome to PR

#### `moveTowardsAngle(current, target, maxDelta)`
*Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees*

#### `smoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime)`
*Gradually changes a value towards a desired goal over time*

#### `smoothDampAngle(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime)`
*Gradually changes an angle given in degrees towards a desired goal angle over time*

#### `smoothStep(a, b, t)`
*Interpolates between min and max with smoothing at the limits*

Additional:
#### `closestPowerOfTwoLong(value)`
*Same as `closestPowerOfTwo`, but deals well with big numbers. Use it if you really need to work with big numbers*

## How to use?
As simple as usual `node` module

1. Install it:
`npm install mathf`

2. Require it:

```javascript
let Mathf = require('mathf');
let rad = 2;

console.log(rad + ' radians are equal to ' + (rad * Mathf.Rad2Deg) + ' degrees');
// 2 radians are equal to 114.59155902616465 degrees
```
