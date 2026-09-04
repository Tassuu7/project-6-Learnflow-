/**
 * LearnFlow Python AST & Recursive Descent Parser
 * Parses Python source subsets into typed Abstract Syntax Trees
 */

export type ASTNodeType =
  | 'Program'
  | 'FunctionDef'
  | 'ClassDef'
  | 'ReturnStatement'
  | 'AssignStatement'
  | 'AugAssignStatement'
  | 'IfStatement'
  | 'WhileStatement'
  | 'ForStatement'
  | 'BinaryExpression'
  | 'UnaryExpression'
  | 'CallExpression'
  | 'Identifier'
  | 'NumericLiteral'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'ListLiteral'
  | 'DictLiteral'
  | 'ListComprehension';

export interface ASTNode {
  type: ASTNodeType;
  line: number;
  col: number;
}

export interface ProgramNode extends ASTNode {
  type: 'Program';
  body: ASTNode[];
}

export interface FunctionDefNode extends ASTNode {
  type: 'FunctionDef';
  name: string;
  parameters: string[];
  body: ASTNode[];
  decorators: string[];
}

export interface ClassDefNode extends ASTNode {
  type: 'ClassDef';
  name: string;
  baseClasses: string[];
  methods: FunctionDefNode[];
}

export interface AssignStatementNode extends ASTNode {
  type: 'AssignStatement';
  target: string;
  value: ASTNode;
}

export interface BinaryExpressionNode extends ASTNode {
  type: 'BinaryExpression';
  operator: '+' | '-' | '*' | '/' | '//' | '%' | '**' | '==' | '!=' | '<' | '<=' | '>' | '>=';
  left: ASTNode;
  right: ASTNode;
}

export interface CallExpressionNode extends ASTNode {
  type: 'CallExpression';
  callee: string;
  arguments: ASTNode[];
}

export interface NumericLiteralNode extends ASTNode {
  type: 'NumericLiteral';
  value: number;
}

export interface StringLiteralNode extends ASTNode {
  type: 'StringLiteral';
  value: string;
}

export class PythonTokenizer {
  private pos = 0;
  private line = 1;
  private col = 1;

  constructor(private source: string) {}

  tokenize(): { type: string; value: string; line: number; col: number }[] {
    const tokens: { type: string; value: string; line: number; col: number }[] = [];
    while (this.pos < this.source.length) {
      const ch = this.source[this.pos];
      if (ch === ' ' || ch === '\t') {
        this.pos++;
        this.col++;
        continue;
      }
      if (ch === '\n') {
        tokens.push({ type: 'NEWLINE', value: '\n', line: this.line, col: this.col });
        this.pos++;
        this.line++;
        this.col = 1;
        continue;
      }
      if (ch === '#') {
        while (this.pos < this.source.length && this.source[this.pos] !== '\n') {
          this.pos++;
        }
        continue;
      }
      if (/\d/.test(ch)) {
        let numStr = '';
        const startCol = this.col;
        while (this.pos < this.source.length && /[\d.]/.test(this.source[this.pos])) {
          numStr += this.source[this.pos++];
          this.col++;
        }
        tokens.push({ type: 'NUMBER', value: numStr, line: this.line, col: startCol });
        continue;
      }
      if (/[a-zA-Z_]/.test(ch)) {
        let idStr = '';
        const startCol = this.col;
        while (this.pos < this.source.length && /[a-zA-Z0-9_]/.test(this.source[this.pos])) {
          idStr += this.source[this.pos++];
          this.col++;
        }
        tokens.push({ type: 'IDENTIFIER', value: idStr, line: this.line, col: startCol });
        continue;
      }
      if (ch === '"' || ch === "'") {
        const quote = ch;
        let strVal = '';
        const startCol = this.col;
        this.pos++;
        this.col++;
        while (this.pos < this.source.length && this.source[this.pos] !== quote) {
          strVal += this.source[this.pos++];
          this.col++;
        }
        this.pos++;
        this.col++;
        tokens.push({ type: 'STRING', value: strVal, line: this.line, col: startCol });
        continue;
      }
      // Operators and punctuation
      const doubleOp = this.source.substr(this.pos, 2);
      if (['==', '!=', '<=', '>=', '//', '**', '+=', '-='].includes(doubleOp)) {
        tokens.push({ type: 'OPERATOR', value: doubleOp, line: this.line, col: this.col });
        this.pos += 2;
        this.col += 2;
        continue;
      }
      tokens.push({ type: 'PUNCT', value: ch, line: this.line, col: this.col });
      this.pos++;
      this.col++;
    }
    return tokens;
  }
}
