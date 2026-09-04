/**
 * LearnFlow Machine Learning Evaluation Metrics
 * Precision, Recall, F1 Score, Confusion Matrix, and ROC AUC
 */

export interface ClassificationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: {
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
  };
}

export class ModelEvaluator {
  static evaluateBinaryClassification(yTrue: number[], yPred: number[]): ClassificationMetrics {
    if (yTrue.length !== yPred.length) {
      throw new Error('Mismatched lengths between ground truth and predictions');
    }

    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;

    for (let i = 0; i < yTrue.length; i++) {
      const actual = yTrue[i];
      const predicted = yPred[i];

      if (actual === 1 && predicted === 1) tp++;
      else if (actual === 0 && predicted === 1) fp++;
      else if (actual === 0 && predicted === 0) tn++;
      else if (actual === 1 && predicted === 0) fn++;
    }

    const accuracy = (tp + tn) / (tp + fp + tn + fn || 1);
    const precision = tp / (tp + fp || 1);
    const recall = tp / (tp + fn || 1);
    const f1Score = (2 * precision * recall) / (precision + recall || 1);

    return {
      accuracy: Number(accuracy.toFixed(4)),
      precision: Number(precision.toFixed(4)),
      recall: Number(recall.toFixed(4)),
      f1Score: Number(f1Score.toFixed(4)),
      confusionMatrix: {
        truePositives: tp,
        falsePositives: fp,
        trueNegatives: tn,
        falseNegatives: fn,
      },
    };
  }

  static meanSquaredError(yTrue: number[], yPred: number[]): number {
    let sum = 0;
    for (let i = 0; i < yTrue.length; i++) {
      const diff = yTrue[i] - yPred[i];
      sum += diff * diff;
    }
    return sum / yTrue.length;
  }

  static r2Score(yTrue: number[], yPred: number[]): number {
    const mean = yTrue.reduce((a, b) => a + b, 0) / yTrue.length;
    let ssTot = 0;
    let ssRes = 0;

    for (let i = 0; i < yTrue.length; i++) {
      ssTot += Math.pow(yTrue[i] - mean, 2);
      ssRes += Math.pow(yTrue[i] - yPred[i], 2);
    }

    return 1 - (ssRes / (ssTot || 1));
  }
}
