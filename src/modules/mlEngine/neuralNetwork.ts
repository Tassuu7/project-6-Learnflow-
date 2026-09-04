/**
 * LearnFlow Neural Network & Deep Learning Architecture
 * Multi-layer perceptron, convolution operations, activations, and gradient descent optimizers
 */

export interface Layer {
  forward(input: number[]): number[];
  backward(gradOutput: number[], learningRate: number): number[];
  getParameters(): { weights: number[][]; biases: number[] };
}

export class DenseLayer implements Layer {
  public weights: number[][];
  public biases: number[];
  private lastInput: number[] = [];

  constructor(public inFeatures: number, public outFeatures: number) {
    this.weights = Array.from({ length: outFeatures }, () =>
      Array.from({ length: inFeatures }, () => (Math.random() - 0.5) * Math.sqrt(2 / inFeatures))
    );
    this.biases = new Array(outFeatures).fill(0.01);
  }

  forward(input: number[]): number[] {
    this.lastInput = [...input];
    const output = new Array(this.outFeatures);

    for (let i = 0; i < this.outFeatures; i++) {
      let sum = this.biases[i];
      for (let j = 0; j < this.inFeatures; j++) {
        sum += this.weights[i][j] * input[j];
      }
      output[i] = sum;
    }
    return output;
  }

  backward(gradOutput: number[], learningRate: number): number[] {
    const gradInput = new Array(this.inFeatures).fill(0);

    for (let i = 0; i < this.outFeatures; i++) {
      const grad = gradOutput[i];
      this.biases[i] -= learningRate * grad;

      for (let j = 0; j < this.inFeatures; j++) {
        gradInput[j] += this.weights[i][j] * grad;
        this.weights[i][j] -= learningRate * grad * this.lastInput[j];
      }
    }

    return gradInput;
  }

  getParameters() {
    return { weights: this.weights, biases: this.biases };
  }
}

export class ActivationReLU implements Layer {
  private lastInput: number[] = [];

  forward(input: number[]): number[] {
    this.lastInput = [...input];
    return input.map(x => Math.max(0, x));
  }

  backward(gradOutput: number[], _lr: number): number[] {
    return gradOutput.map((grad, i) => (this.lastInput[i] > 0 ? grad : 0));
  }

  getParameters() {
    return { weights: [], biases: [] };
  }
}

export class ActivationSigmoid implements Layer {
  private lastOutput: number[] = [];

  forward(input: number[]): number[] {
    this.lastOutput = input.map(x => 1 / (1 + Math.exp(-x)));
    return [...this.lastOutput];
  }

  backward(gradOutput: number[], _lr: number): number[] {
    return gradOutput.map((grad, i) => grad * this.lastOutput[i] * (1 - this.lastOutput[i]));
  }

  getParameters() {
    return { weights: [], biases: [] };
  }
}

export class SequentialNeuralNetwork {
  private layers: Layer[] = [];

  add(layer: Layer): this {
    this.layers.push(layer);
    return this;
  }

  forward(input: number[]): number[] {
    let out = input;
    for (const layer of this.layers) {
      out = layer.forward(out);
    }
    return out;
  }

  trainStep(input: number[], target: number[], learningRate: number): number {
    const pred = this.forward(input);
    let loss = 0;
    const gradOutput = new Array(pred.length);

    for (let i = 0; i < pred.length; i++) {
      const diff = pred[i] - target[i];
      loss += diff * diff;
      gradOutput[i] = 2 * diff;
    }
    loss /= pred.length;

    let grad = gradOutput;
    for (let i = this.layers.length - 1; i >= 0; i--) {
      grad = this.layers[i].backward(grad, learningRate);
    }

    return loss;
  }
}
