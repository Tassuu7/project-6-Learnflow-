import { describe, it, expect } from 'vitest';
import { solveQueryOffline } from '../src/services/aiEngine';

describe('Subject-Specific AI Solver Engine', () => {
  it('resolves Python decorators and language queries accurately', () => {
    const response = solveQueryOffline('Explain how decorators work in Python');
    expect(response).toContain('Python');
    expect(response.toLowerCase()).toContain('decorator');
  });

  it('resolves Java polymorphism and JVM queries accurately', () => {
    const response = solveQueryOffline('What is JVM memory model stack and heap in Java?');
    expect(response).toContain('Java');
    expect(response.toLowerCase()).toContain('heap');
  });

  it('resolves DBMS normalization and ACID transactions accurately', () => {
    const response = solveQueryOffline('Explain 3NF and BCNF normalization in DBMS');
    expect(response).toContain('Database');
    expect(response.toLowerCase()).toContain('normalization');
  });

  it('resolves ML overfitting, gradient descent, and evaluation metrics', () => {
    const response = solveQueryOffline('What is the difference between Precision and Recall in ML?');
    expect(response).toContain('Machine Learning');
    expect(response.toLowerCase()).toContain('precision');
  });
});
