/**
 * LearnFlow Supervised Machine Learning Algorithms
 * Linear Regression, Logistic Regression, and Decision Tree Classifier
 */

export class LinearRegression {
  public weights: number[] = [];
  public bias: number = 0;

  fit(X: number[][], y: number[], learningRate = 0.01, epochs = 1000): void {
    const numSamples = X.length;
    const numFeatures = X[0].length;

    this.weights = new Array(numFeatures).fill(0);
    this.bias = 0;

    for (let epoch = 0; epoch < epochs; epoch++) {
      const dw = new Array(numFeatures).fill(0);
      let db = 0;

      for (let i = 0; i < numSamples; i++) {
        const yPred = this.predictRow(X[i]);
        const error = yPred - y[i];

        for (let j = 0; j < numFeatures; j++) {
          dw[j] += (2 / numSamples) * error * X[i][j];
        }
        db += (2 / numSamples) * error;
      }

      for (let j = 0; j < numFeatures; j++) {
        this.weights[j] -= learningRate * dw[j];
      }
      this.bias -= learningRate * db;
    }
  }

  predict(X: number[][]): number[] {
    return X.map(row => this.predictRow(row));
  }

  private predictRow(row: number[]): number {
    let val = this.bias;
    for (let i = 0; i < row.length; i++) {
      val += this.weights[i] * row[i];
    }
    return val;
  }
}

export class LogisticRegression {
  public weights: number[] = [];
  public bias: number = 0;

  private sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
  }

  fit(X: number[][], y: number[], learningRate = 0.05, epochs = 1000): void {
    const numSamples = X.length;
    const numFeatures = X[0].length;

    this.weights = new Array(numFeatures).fill(0);
    this.bias = 0;

    for (let epoch = 0; epoch < epochs; epoch++) {
      const dw = new Array(numFeatures).fill(0);
      let db = 0;

      for (let i = 0; i < numSamples; i++) {
        const z = this.predictRaw(X[i]);
        const yPred = this.sigmoid(z);
        const error = yPred - y[i];

        for (let j = 0; j < numFeatures; j++) {
          dw[j] += (1 / numSamples) * error * X[i][j];
        }
        db += (1 / numSamples) * error;
      }

      for (let j = 0; j < numFeatures; j++) {
        this.weights[j] -= learningRate * dw[j];
      }
      this.bias -= learningRate * db;
    }
  }

  predictProbability(X: number[][]): number[] {
    return X.map(row => this.sigmoid(this.predictRaw(row)));
  }

  predict(X: number[][], threshold = 0.5): number[] {
    return this.predictProbability(X).map(p => p >= threshold ? 1 : 0);
  }

  private predictRaw(row: number[]): number {
    let val = this.bias;
    for (let i = 0; i < row.length; i++) {
      val += this.weights[i] * row[i];
    }
    return val;
  }
}
