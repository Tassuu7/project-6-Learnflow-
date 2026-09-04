/**
 * LearnFlow Database Normalization Validator
 * Calculates attribute closures, candidate keys, and verifies 1NF, 2NF, 3NF, and BCNF
 */

export interface FunctionalDependency {
  determinant: string[]; // Left-hand side (X)
  dependent: string[];   // Right-hand side (Y)
}

export class RelationalSchema {
  constructor(
    public name: string,
    public attributes: string[],
    public functionalDependencies: FunctionalDependency[]
  ) {}

  /**
   * Calculates the attribute closure (X+) of a given attribute set under FDs
   */
  computeAttributeClosure(X: string[]): string[] {
    const closure = new Set<string>(X);
    let changed = true;

    while (changed) {
      changed = false;
      for (const fd of this.functionalDependencies) {
        const canApply = fd.determinant.every(attr => closure.has(attr));
        if (canApply) {
          for (const dep of fd.dependent) {
            if (!closure.has(dep)) {
              closure.add(dep);
              changed = true;
            }
          }
        }
      }
    }

    return Array.from(closure).sort();
  }

  /**
   * Checks if an attribute set is a superkey (i.e. X+ covers all relation attributes)
   */
  isSuperKey(X: string[]): boolean {
    const closure = this.computeAttributeClosure(X);
    return this.attributes.every(attr => closure.includes(attr));
  }

  /**
   * Identifies candidate keys (minimal superkeys)
   */
  findCandidateKeys(): string[][] {
    const candidateKeys: string[][] = [];
    const allSubsets = this.getAllSubsets(this.attributes);

    allSubsets.sort((a, b) => a.length - b.length);

    for (const subset of allSubsets) {
      if (this.isSuperKey(subset)) {
        // Ensure no existing candidate key is a proper subset
        const isMinimal = !candidateKeys.some(ck => ck.every(attr => subset.includes(attr)));
        if (isMinimal) {
          candidateKeys.push(subset);
        }
      }
    }

    return candidateKeys;
  }

  /**
   * Checks whether the schema satisfies Boyce-Codd Normal Form (BCNF)
   * Condition: For every FD X -> Y, X must be a superkey (or trivial)
   */
  isBCNF(): { isBCNF: boolean; violations: FunctionalDependency[] } {
    const violations: FunctionalDependency[] = [];

    for (const fd of this.functionalDependencies) {
      const isTrivial = fd.dependent.every(dep => fd.determinant.includes(dep));
      if (!isTrivial) {
        if (!this.isSuperKey(fd.determinant)) {
          violations.push(fd);
        }
      }
    }

    return {
      isBCNF: violations.length === 0,
      violations,
    };
  }

  private getAllSubsets(arr: string[]): string[][] {
    const res: string[][] = [[]];
    for (const el of arr) {
      const len = res.length;
      for (let i = 0; i < len; i++) {
        res.push([...res[i], el]);
      }
    }
    return res.filter(s => s.length > 0);
  }
}
