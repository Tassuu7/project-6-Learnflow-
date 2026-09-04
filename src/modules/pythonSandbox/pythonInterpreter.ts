/**
 * LearnFlow Python Virtual Runtime
 * Environment frames, variable scope resolution, and execution engine
 */

export interface ScopeFrame {
  name: string;
  variables: Map<string, any>;
  parent: ScopeFrame | null;
}

export class PythonEnvironment {
  private currentFrame: ScopeFrame;

  constructor() {
    this.currentFrame = {
      name: 'global',
      variables: new Map<string, any>(),
      parent: null,
    };
    this.initBuiltins();
  }

  private initBuiltins(): void {
    this.currentFrame.variables.set('print', (...args: any[]) => console.log(...args));
    this.currentFrame.variables.set('len', (val: any) => val ? val.length : 0);
    this.currentFrame.variables.set('range', (start: number, end?: number, step = 1) => {
      const s = end === undefined ? 0 : start;
      const e = end === undefined ? start : end;
      const res: number[] = [];
      for (let i = s; i < e; i += step) res.push(i);
      return res;
    });
    this.currentFrame.variables.set('int', (v: any) => parseInt(v, 10));
    this.currentFrame.variables.set('float', (v: any) => parseFloat(v));
    this.currentFrame.variables.set('str', (v: any) => String(v));
    this.currentFrame.variables.set('type', (v: any) => typeof v);
  }

  pushFrame(name: string): void {
    this.currentFrame = {
      name,
      variables: new Map<string, any>(),
      parent: this.currentFrame,
    };
  }

  popFrame(): void {
    if (this.currentFrame.parent) {
      this.currentFrame = this.currentFrame.parent;
    }
  }

  set(name: string, value: any): void {
    this.currentFrame.variables.set(name, value);
  }

  get(name: string): any {
    let curr: ScopeFrame | null = this.currentFrame;
    while (curr) {
      if (curr.variables.has(name)) {
        return curr.variables.get(name);
      }
      curr = curr.parent;
    }
    throw new Error(`NameError: name '${name}' is not defined`);
  }

  has(name: string): boolean {
    let curr: ScopeFrame | null = this.currentFrame;
    while (curr) {
      if (curr.variables.has(name)) return true;
      curr = curr.parent;
    }
    return false;
  }
}

export class PythonRuntimeInterpreter {
  private env = new PythonEnvironment();
  private stdoutBuffer: string[] = [];

  constructor() {
    this.env.set('print', (...args: any[]) => {
      const out = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
      this.stdoutBuffer.push(out);
    });
  }

  executeLine(line: string): any {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return null;

    // Simple assignment: x = 10 or name = "learnflow"
    if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.includes('!=')) {
      const [left, right] = trimmed.split('=').map(s => s.trim());
      const evaluated = this.evaluateExpression(right);
      this.env.set(left, evaluated);
      return evaluated;
    }

    return this.evaluateExpression(trimmed);
  }

  evaluateExpression(expr: string): any {
    const clean = expr.trim();
    if (!isNaN(Number(clean))) return Number(clean);
    if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
      return clean.slice(1, -1);
    }
    if (clean === 'True') return true;
    if (clean === 'False') return false;
    if (clean === 'None') return null;

    if (clean.startsWith('print(') && clean.endsWith(')')) {
      const inner = clean.slice(6, -1);
      const val = this.evaluateExpression(inner);
      const printer = this.env.get('print');
      printer(val);
      return null;
    }

    if (this.env.has(clean)) {
      return this.env.get(clean);
    }

    return clean;
  }

  getStdout(): string[] {
    return this.stdoutBuffer;
  }

  clearStdout(): void {
    this.stdoutBuffer = [];
  }
}
