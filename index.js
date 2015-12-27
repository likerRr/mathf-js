'use strict';

let Mathf = {
  Deg2Rad: (Math.PI * 2) / 360,

  Epsilon: Number.EPSILON || Math.pow(2, -52),

  Infinity: Infinity,

  NegativeInfinity: -Infinity,

  PI: Math.PI,

  Rad2Deg: 360 / (Math.PI * 2),

  abs: Math.abs,

  acos: Math.acos,

  approximately: (f1, f2) => {
    return Mathf.abs(f1 - f2) < Mathf.Epsilon;
  },

  asin: Math.asin,

  atan: Math.atan,

  atan2: Math.atan2,

  ceil: Math.ceil,

  clamp: (value, min, max) => {
    return value < min ? min : (value > max ? max : value);
  },

  clamp01: (value) => {
    return value < 0 ? 0 : (value > 1 ? 1 : value);
  },

  closestPowerOfTwo: (value) => {
    value = value >> 0;

    if (value < 0) return 0;

    let nextPowerOfTwo = value;

    --nextPowerOfTwo;
    nextPowerOfTwo |= nextPowerOfTwo >> 1;
    nextPowerOfTwo |= nextPowerOfTwo >> 2;
    nextPowerOfTwo |= nextPowerOfTwo >> 4;
    nextPowerOfTwo |= nextPowerOfTwo >> 8;
    nextPowerOfTwo |= nextPowerOfTwo >> 16;
    nextPowerOfTwo += 1;

    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  },

  closestPowerOfTwoLong: (value) => {
    value = value >> 0;

    if (value < 0) return 0;

    let nextPowerOfTwo = 2 << Math.floor(Math.log2(value));

    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  },

  cos: Math.cos,

  deltaAngle: (current, target) => {
    if (Math.abs(current) > 360) {
      current %= 360;
    }

    if (Math.abs(target) > 360) {
      target %= 360;
    }

    return target - current;
  },

  exp: Math.exp,

  floor: Math.floor,

  gammaToLinearSpace: (value) => {
    return Math.pow(value, 2.2);
  },

  inverseLerp: (min, max, value) => {
    return (Mathf.clamp(value, Mathf.min(min, max), Mathf.max(min, max)) - min) / (max - min);
  },

  /**
   * @see http://stackoverflow.com/a/108360
   * @param value
   * @returns {boolean}
   */
  isPowerOfTwo: (value) => {
    value = value >> 0;

    return (value & (value - 1)) === 0;
  },

  lerp: (a, b, t) => {
    return (b - a) * Mathf.clamp01(t) + a;
  },

  lerpAngle: (a, b, t) => {
    while (a > b + 180) {
      b += 360;
    }

    while (b > a + 180) {
      b -= 360;
    }

    return Mathf.lerp(a, b, t);
  },

  lerpUnclamped: (a, b, t) => {
    if (t < 0 || t > 1) {
      return a + Math.abs(b - a) * t;
    }

    return (b - a) * Mathf.clamp01(t) + a;
  },

  linearToGammaSpace: (value) => {
    return Math.pow(value, 0.45454545);
  },

  log: Math.log,

  log10: Math.log10,

  max: Math.max,

  min: Math.min,

  moveTowards: (b, a , r) => {},

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

  sign: (f) => {
    return (f >= 0) ? 1 : -1;
  },

  sin: Math.sin,

  smoothDamp: () => {},

  smoothDampAngle: () => {},

  smoothStep: () => {},

  sqrt: Math.sqrt,

  tan: Math.tan

};

module.exports = Mathf;
