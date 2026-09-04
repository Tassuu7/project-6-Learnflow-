/**
 * LearnFlow Tensor & Linear Algebra Core
 * N-dimensional tensor manipulation, matrix broadcasting, and vector operations
 */

export class Tensor {
  public data: Float64Array;
  public shape: number[];
  public strides: number[];

  constructor(data: number[] | Float64Array, shape: number[]) {
    this.shape = shape;
    this.data = data instanceof Float64Array ? data : new Float64Array(data);
    this.strides = this.computeStrides(shape);
  }

  static zeros(shape: number[]): Tensor {
    const size = shape.reduce((a, b) => a * b, 1);
    return new Tensor(new Float64Array(size), shape);
  }

  static ones(shape: number[]): Tensor {
    const size = shape.reduce((a, b) => a * b, 1);
    const data = new Float64Array(size).fill(1);
    return new Tensor(data, shape);
  }

  static randn(shape: number[]): Tensor {
    const size = shape.reduce((a, b) => a * b, 1);
    const data = new Float64Array(size);
    for (let i = 0; i < size; i++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.random();
      const u2 = Math.random();
      data[i] = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }
    return new Tensor(data, shape);
  }

  add(other: Tensor): Tensor {
    if (this.data.length !== other.data.length) {
      throw new Error('ShapeMismatchError: Tensors must have identical shapes for element-wise addition');
    }
    const out = new Float64Array(this.data.length);
    for (let i = 0; i < this.data.length; i++) {
      out[i] = this.data[i] + other.data[i];
    }
    return new Tensor(out, [...this.shape]);
  }

  matmul(other: Tensor): Tensor {
    if (this.shape.length !== 2 || other.shape.length !== 2) {
      throw new Error('Matrix multiplication currently requires 2D matrices');
    }
    const [M, K1] = this.shape;
    const [K2, N] = other.shape;
    if (K1 !== K2) {
      throw new Error(`ShapeMismatchError: Incompatible inner matrix dimensions: ${K1} vs ${K2}`);
    }

    const out = new Float64Array(M * N);
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        let sum = 0;
        for (let k = 0; k < K1; k++) {
          sum += this.data[i * K1 + k] * other.data[k * N + j];
        }
        out[i * N + j] = sum;
      }
    }
    return new Tensor(out, [M, N]);
  }

  transpose(): Tensor {
    if (this.shape.length !== 2) throw new Error('Transpose currently requires 2D matrices');
    const [M, N] = this.shape;
    const out = new Float64Array(M * N);
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        out[j * M + i] = this.data[i * N + j];
      }
    }
    return new Tensor(out, [N, M]);
  }

  private computeStrides(shape: number[]): number[] {
    const strides = new Array(shape.length);
    let s = 1;
    for (let i = shape.length - 1; i >= 0; i--) {
      strides[i] = s;
      s *= shape[i];
    }
    return strides;
  }
}
