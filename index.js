'use strict';

const FULL_ANGLE = 360;

const STRAIGHT_ANGLE = 180;

const GAMMA_TO_LINEAR = 2.2;

const LINEAR_TO_GAMMA = 0.45454545;

const IS_INTEGER = 0.5;

const EPSILON = Math.pow(2, -52);

const RANDOM_SEED = 0.8694896071683615;

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

    // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo
    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      // prev power of two
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  }

  static closestPowerOfTwoLong(value) {
    value = toInt(value);

    if (value < 0) return 0;

    // algorithm to find next power of two for long integers
    let nextPowerOfTwo = 2 << Math.floor(Math.log2(value));

    // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo
    if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
      // prev power of two
      return nextPowerOfTwo >> 1;
    }

    return nextPowerOfTwo;
  }

  static deltaAngle(current, target) {
    if (Math.abs(current) > FULL_ANGLE) {
      current %= FULL_ANGLE;
    }

    if (Math.abs(target) > FULL_ANGLE) {
      target %= FULL_ANGLE;
    }

    return target - current;
  }

  static gammaToLinearSpace(value) {
    return Math.pow(value, GAMMA_TO_LINEAR);
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
    while (a > b + STRAIGHT_ANGLE) {
      b += FULL_ANGLE;
    }

    while (b > a + STRAIGHT_ANGLE) {
      b -= FULL_ANGLE;
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
    return Math.pow(value, LINEAR_TO_GAMMA);
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

  static perlinNoise(x, y) {
    return (new SimplexNoise(RANDOM_SEED)).noise(x, y);
  }

  static pingPong(t, length) {
    if (t < 0) t = -t;
    var mod = t % length;
    // if mod is even
    if (Math.ceil(t / length) % 2 === 0) {
      return (mod === 0) ? 0 : length - (mod);
    }

    return (mod === 0) ? length : mod;
  }

  static repeat() {}

  static round(num) {
    let ceilVal = num + IS_INTEGER;

    if (ceilVal === Math.ceil(num)) {
      return (ceilVal % 2 === 0) ? num + IS_INTEGER : num - IS_INTEGER;
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

Mathf.Deg2Rad = (Math.PI * 2) / FULL_ANGLE;
Mathf.Epsilon = Number.EPSILON || EPSILON;
Mathf.NegativeInfinity = -Infinity;
Mathf.Rad2Deg = FULL_ANGLE / (Math.PI * 2);

module.exports = Mathf;

// =====================================================================================
// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com
// credits https://gist.github.com/banksean/304522#file-perlin-noise-simplex-js-L156

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
function SimplexNoise(seed) {
  let i;
  if (!seed) seed = Math.random();
  this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
  this.p = [];
  for (i = 0; i < 256; i++) {
    this.p[i] = Math.floor(seed * 256);
  }
  // To remove the need for index wrapping, double the permutation table length
  this.perm = [];
  for (i = 0; i < 512; i++) {
    this.perm[i] = this.p[i & 255];
  }
}

SimplexNoise.prototype.dot = function(g, x, y) {
  return g[0]*x + g[1]*y;
};

SimplexNoise.prototype.noise = function (xin, yin) {
  let n0, n1, n2, // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
    F2 = 0.5 * (Math.sqrt(3.0) - 1.0),
    s = (xin + yin) * F2, // Hairy factor for 2D
    i = Math.floor(xin + s),
    j = Math.floor(yin + s),
    G2 = (3.0 - Math.sqrt(3.0)) / 6.0,
    t = (i + j) * G2,
    X0 = i - t, // Unskew the cell origin back to (x,y) space
    Y0 = j - t,
    x0 = xin - X0, // The x,y distances from the cell origin
    y0 = yin - Y0,
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
    i1, j1, // Offsets for second (middle) corner of simplex in (i,j) coords
    x1, x2, y1, y2,
    ii, jj, gi0, gi1, gi2,
    t0, t1, t2;
  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1;
    j1 = 0;
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0;
    j1 = 1;
  }
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
  y1 = y0 - j1 + G2;
  x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
  y2 = y0 - 1.0 + 2.0 * G2;
  // Work out the hashed gradient indices of the three simplex corners
  ii = i & 255;
  jj = j & 255;
  gi0 = this.perm[ii + this.perm[jj]] % 12;
  gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
  gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
  // Calculate the contribution from the three corners
  t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) {
    n0 = 0.0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient
  }
  t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) {
    n1 = 0.0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
  }
  t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 < 0) {
    n2 = 0.0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70.0 * (n0 + n1 + n2);
};
// =====================================================================================
