'use strict';

function toInt(value) {
  return value >> 0;
}


class Mathf {

  static approximately(f1, f2) {
    return Math.abs(f1 - f2) < Mathf.Epsilon;
  }

  static clamp(value, min, max) {
    return value < min ? min : (value > max ? max : value);
  }

  static clamp01(value) {
    return value < 0 ? 0 : (value > 1 ? 1 : value);
  }

  static closestPowerOfTwo(value) {
    let nextPowerOfTwo = Mathf.nextPowerOfTwo(value);

    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  }

  static closestPowerOfTwoLong(value) {
    value = toInt(value);

    if (value < 0) return 0;

    let nextPowerOfTwo = 2 << Math.floor(Math.log2(value));

    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  }

  static deltaAngle(current, target) {
    if (Math.abs(current) > 360) {
      current %= 360;
    }

    if (Math.abs(target) > 360) {
      target %= 360;
    }

    return target - current;
  }

  static gammaToLinearSpace(value) {
    return Math.pow(value, 2.2);
  }

  static inverseLerp(min, max, value) {
    return (Mathf.clamp(value, Math.min(min, max), Math.max(min, max)) - min) / (max - min);
  }

  /**
  * @see http://stackoverflow.com/a/108360
    * @param value
  * @returns {boolean}
  */
  static isPowerOfTwo(value) {
    value = toInt(value);

    return (value & (value - 1)) === 0;
  }

  static lerp(a, b, t) {
    return (b - a) * Mathf.clamp01(t) + a;
  }

  static lerpAngle(a, b, t) {
    while (a > b + 180) {
      b += 360;
    }

    while (b > a + 180) {
      b -= 360;
    }

    return Mathf.lerp(a, b, t);
  }

  static lerpUnclamped(a, b, t) {
    if (t < 0 || t > 1) {
      return a + Math.abs(b - a) * t;
    }

    return (b - a) * Mathf.clamp01(t) + a;
  }

  static linearToGammaSpace(value) {
    return Math.pow(value, 0.45454545);
  }

  static moveTowards(current, target , maxDelta) {
    if (maxDelta > 0) {
      if (target < current && current - maxDelta < target) return target;
      else if (target > current && current + maxDelta > target) return target
    }

    if (current > target) {
      return current - maxDelta;
    }

    return current + maxDelta;
  }

  static moveTowardsAngle() {}

  static nextPowerOfTwo(value) {
    value = toInt(value);

    if (value < 0) return 0;

    --value;
    value |= value >> 1;
    value |= value >> 2;
    value |= value >> 4;
    value |= value >> 8;
    value |= value >> 16;
    value += 1;

    return value;
  }

  static perlinNoise() {}

  static pingPong(t, length) {
    if (t < 0) t = -t;
    var mod = t % length;
    // even
    if (Math.ceil(t / length) % 2 === 0) {
      return (mod === 0) ? 0 : length - (mod);
    }

    return (mod === 0) ? length : mod;
  }

  static repeat() {}

  static round(num) {
    let ceilVal = num + 0.5;

    if (ceilVal === Math.ceil(num)) {
      return (ceilVal % 2 === 0) ? num + 0.5 : num - 0.5;
    }

    return Math.round(num);
  }

  static sign(f) {
    return (f >= 0) ? 1 : -1;
  }

  static smoothDamp() {}

  static smoothDampAngle() {}

  static smoothStep() {}

}

Mathf.Deg2Rad = (Math.PI * 2) / 360;
Mathf.Epsilon = Number.EPSILON || Math.pow(2, -52);
Mathf.NegativeInfinity = -Infinity;
Mathf.Rad2Deg = 360 / (Math.PI * 2);

module.exports = Mathf;
