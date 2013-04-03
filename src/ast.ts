/// <reference path="tesprima.ts"/>

export enum TokenType {
    Unknown = 0,
    BooleanLiteral = 1,
    EOF = 2,
    Identifier = 3,
    Keyword = 4,
    NullLiteral = 5,
    NumericLiteral = 6,
    Punctuator = 7,
    StringLiteral = 8,
    RegularExpression = 9
}

export var TokenName:string[] = [
    'Unknown',
    'Boolean',
    '<end>',
    'Identifier',
    'Keyword',
    'Null',
    'Numeric',
    'Punctuator',
    'String',
    'RegularExpression'
];

export interface Token {
    type: TokenType;
    value?: any;
    lineNumber?: number;
    lineStart?: number;
    range: number[];
}

export interface TokenOutput {
    type: string;
    value: any;
    range: number[];
    loc:TextRange;
}

export interface Comment {
    type: string;
    value: string;
    range: number[];
    loc:TextRange;
}

export interface LiteralToken extends Token {
    value: any;
}

export interface NumericLiteralToken extends LiteralToken {
    value: number;
    octal: bool;
}

export interface StringLiteralToken extends LiteralToken {
    value: string;
    // Indicates that the string literal contains octal escape
    octal: bool;
}

export interface BooleanLiteralToken extends LiteralToken {
    value: bool;
}

export class Syntax {
    static AssignmentExpression = 'AssignmentExpression';
    static ArrayExpression = 'ArrayExpression';
    static BlockStatement = 'BlockStatement';
    static BinaryExpression = 'BinaryExpression';
    static BreakStatement = 'BreakStatement';
    static CallExpression = 'CallExpression';
    static CatchClause = 'CatchClause';
    static ConditionalExpression = 'ConditionalExpression';
    static ContinueStatement = 'ContinueStatement';
    static DoWhileStatement = 'DoWhileStatement';
    static DebuggerStatement = 'DebuggerStatement';
    static EmptyStatement = 'EmptyStatement';
    static ExpressionStatement = 'ExpressionStatement';
    static ForStatement = 'ForStatement';
    static ForInStatement = 'ForInStatement';
    static FunctionDeclaration = 'FunctionDeclaration';
    static FunctionExpression = 'FunctionExpression';
    static Identifier = 'Identifier';
    static IfStatement = 'IfStatement';
    static Literal = 'Literal';
    static LabeledStatement = 'LabeledStatement';
    static LogicalExpression = 'LogicalExpression';
    static MemberExpression = 'MemberExpression';
    static NewExpression = 'NewExpression';
    static ObjectExpression = 'ObjectExpression';
    static Program = 'Program';
    static Property = 'Property';
    static ReturnStatement = 'ReturnStatement';
    static SequenceExpression = 'SequenceExpression';
    static SwitchStatement = 'SwitchStatement';
    static SwitchCase = 'SwitchCase';
    static ThisExpression = 'ThisExpression';
    static ThrowStatement = 'ThrowStatement';
    static TryStatement = 'TryStatement';
    static UnaryExpression = 'UnaryExpression';
    static UpdateExpression = 'UpdateExpression';
    static VariableDeclaration = 'VariableDeclaration';
    static VariableDeclarator = 'VariableDeclarator';
    static WhileStatement = 'WhileStatement';
    static WithStatement = 'WithStatement';
}

export interface ASTNode {
    type:string;
    loc?:TextRange;
    range?:number[];
    groupLoc?:TextRange;
    groupRange?:number[];
}

export interface Statement extends ASTNode {

}

export interface Expression extends ASTNode {

}

export interface Primitive extends Expression {

}

export interface ArrayExpression extends Expression {
    elements:Expression[];
}

export interface AssignmentExpression extends Expression {
    operator:string;
    left:Expression;
    right:Expression;
}

export interface BinaryExpression extends Expression {
    operator:string;
    left:Expression;
    right:Expression;
}

export interface BlockStatement extends Statement {
    body:Statement[];
}

export interface BreakStatement extends Statement {
    label:string;
}

export interface CallExpression extends Expression {
    callee:Expression;
    arguments:Expression[];
}

export interface CatchClause extends ASTNode {
    param:VariableDeclaration;
    body:BlockStatement;
}

export interface ConditionalExpression extends Expression {
    test:Expression;
    consequent:Expression;
    alternate:Expression;
}

export interface ContinueStatement extends Statement {
    label:string;
}

export interface DebuggerStatement extends Statement {

}

export interface DoWhileStatement extends Statement {
    body:Statement;
    test:Expression;
}

export interface EmptyStatement extends Statement {

}

export interface ExpressionStatement extends Statement {
    expression:Expression;
}

export interface ForTypeStatement extends Statement {
    body:Statement;
}

export interface ForStatement extends ForTypeStatement {
    init:VariableDeclaration;
    test:Expression;
    update:Expression;
}

export interface ForInStatement extends ForTypeStatement {
    left:VariableDeclaration;
    right:Expression;
    each:bool;
}

export interface FunctionDeclaration extends Statement {
    id:Identifier;
    params:Identifier[];
    defaults:Expression[];
    body:BlockStatement;
    rest;
    generator:bool;
    expression:bool;
}

export interface FunctionExpression extends Expression {
    id:Identifier;
    params:Identifier[];
    defaults:Expression[];
    body:BlockStatement;
    rest;
    generator:bool;
    expression:bool;
}

export interface Identifier extends Primitive {
    name:string;
}

export interface IfStatement extends Statement {
    test:Expression;
    consequent:Statement;
    alternate:Statement;
}

export interface LabeledStatement extends Statement {
    label:string;
    body:Statement;
}

export interface Literal extends Primitive {
    value:any;
    raw:string;
}

export interface MemberExpression extends Expression {
    computed:bool;
    object:Expression;
    property:Expression;
}

export interface NewExpression extends Expression {
    callee:Expression;
    arguments:Expression[];
}

export interface ObjectExpression extends Expression {
    properties:Property[];
}


export interface Program extends ASTNode {
    body:Statement[];
}

export enum PropertyKind {
    Data = 1 << 0,
    Get = 1 << 1,
    Set = 1 << 2
}

export interface Property extends ASTNode {
    key:Primitive;
    value:Expression;
    kind:string;
}

export interface ReturnStatement extends Statement {
    argument:Expression;
}

export interface SequenceExpression extends Expression {
    expressions:Expression[];
}

export interface SwitchCase extends ASTNode {
    test:Expression;
    consequent:Statement[];
}

export interface SwitchStatement extends Statement {
    discriminant:Expression;
    cases:SwitchCase[];
}

export interface ThisExpression extends Expression {

}

export interface ThrowStatement extends Statement {
    argument:Expression;
}

export interface TryStatement extends Statement {
    block:BlockStatement;
    guardedHandlers:any[]; // Not implemented
    handlers:CatchClause[];
    finalizer:BlockStatement;
}

export interface UnaryExpression extends Expression {
    operator:string;
    argument:Expression;
}

export interface UpdateExpression extends UnaryExpression {
    operator:string;
    argument:Expression;
    prefix:bool;
}

export interface VariableDeclaration extends Statement {
    declarations:VariableDeclarator[];
    kind:string;
}

export interface VariableDeclarator extends ASTNode {
    id:Identifier;
    init:Expression;
}

export interface WhileStatement extends Statement {
    test:Expression;
    body:Statement;
}

export interface WithStatement extends Statement {
    object:Expression;
    body:Statement;
}
