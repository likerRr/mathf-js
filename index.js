'use strict';

module.exports = {
  Deg2Rad: (Math.PI * 2) / 360,

  Epsilon: Number.EPSILON || Math.pow(2, -52),

  Infinity: Infinity,

  NegativeInfinity: -Infinity,

  PI: Math.PI,

  Rad2Deg: 360 / (Math.PI * 2),

  abs: Math.abs,

  acos: Math.acos,

  approximately: () => {},

  asin: Math.asin,

  atan: Math.atan,

  atan2: Math.atan2,

  ceil: () => Math.ceil,

  ceilToInt: () => {},

  clamp: () => {},

  clamp01: () => {},

  closestPowerOfTwo: () => {},

  cos: Math.cos,

  deltaAngle: () => {},

  exp: Math.exp,

  floor: Math.floor,

  floorToInt: () => {},

  gammaToLinearSpace: () => {},

  inverseLerp: () => {},

  isPowerOfTwo: () => {},

  lerp: () => {},

  lerpAngle: () => {},

  lerpUnclamped: () => {},

  linearToGammaSpace: () => {},

  log: Math.log,

  log10: Math.log10,

  max: Math.max,

  min: Math.min,

  moveTowards: () => {},

  moveTowardsAngle: () => {},

  nextPowerOfTwo: () => {},

  perlinNoise: () => {},

  pingPong: () => {},

  pow: Math.pow,

  repeat: () => {},

  round: (num) => {
    let ceilVal = num + 0.5;

    if (ceilVal === Math.ceil(num)) {
      return (ceilVal % 2 === 0) ? num + 0.5 : num - 0.5;
    }

    return Math.round(num);
  },

  roundToInt: () => {},

  sign: () => {},

  sin: Math.sin,

  smoothDamp: () => {},

  smoothDampAngle: () => {},

  smoothStep: () => {},

  sqrt: Math.sqrt,

  tan: Math.tan

};
