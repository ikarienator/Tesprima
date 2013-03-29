/// <reference path="tesprima.ts"/>
module TypedEsprima {

  export interface LocationMarker {
    startRange: number;
    startLine: number;
    startColumn: number;
  }

  export class Parser {
    allowIn:bool = true;
    labelSet:{[key:string]:bool;} = {};
    inFunctionBody:bool = false;
    inIteration:bool = false;
    inSwitch:bool = false;

    postProcess:(node:TypedEsprima.Node)=>TypedEsprima.Node = (node) => node;

    private static PatchingMethods = [
      'parseAssignmentExpression',
      'parseBinaryExpression',
      'parseBlock',
      'parseFunctionSourceElements',
      'parseCatchClause',
      'parseComputedMember',
      'parseConditionalExpression',
      'parseConstLetDeclaration',
      'parseExpression',
      'parseForVariableDeclaration',
      'parseFunctionDeclaration',
      'parseFunctionExpression',
      'parseLeftHandSideExpression',
      'parseNewExpression',
      'parseNonComputedProperty',
      'parseObjectProperty',
      'parseObjectPropertyKey',
      'parsePostfixExpression',
      'parsePrimaryExpression',
      'parseProgram',
      'parsePropertyFunction',
      'parseStatement',
      'parseSwitchCase',
      'parseUnaryExpression',
      'parseVariableDeclaration',
      'parseVariableIdentifier'
    ];

    constructor(public lexer:ILexer, public factory:ASTFactory) {
    }

    createLiteral(token:Token) {
      return this.factory.createLiteral(token.value, this.lexer.slice(token.range[0], token.range[1]));
    }

    // 11.1.4 Array Initialiser
    parseArrayInitialiser() {
      var elements:Expression[] = [];

      this.lexer.expect('[');

      while (!this.lexer.match(']')) {
        if (this.lexer.match(',')) {
          this.lexer.lex();
          elements.push(null);
        } else {
          elements.push(this.parseAssignmentExpression());

          if (!this.lexer.match(']')) {
            this.lexer.expect(',');
          }
        }
      }

      this.lexer.expect(']');

      return this.factory.createArrayExpression(elements);
    }

    // 11.1.5 Object Initialiser
    parsePropertyFunction(param:Identifier[], first:Token):FunctionExpression {
      var previousStrict, body;

      previousStrict = this.lexer.strict;
      body = this.parseFunctionSourceElements();
      if (first !== null && this.lexer.strict && this.lexer.isRestrictedWord(param[0].name)) {
        this.lexer.throwErrorTolerant(first, Messages.StrictParamName);
      }
      this.lexer.strict = previousStrict;
      return this.factory.createFunctionExpression(null, param, [], body);
    }

    parseObjectPropertyKey():Primitive {
      var token = this.lexer.lex();

      // Note: This is called only from parseObjectProperty(), where
      // EOF and Punctuator tokens are already filtered out.

      if (token.type === TokenType.StringLiteral ||
          token.type === TokenType.NumericLiteral) {

        if (this.lexer.strict && token['octal']) {
          this.lexer.throwErrorTolerant(token, Messages.StrictOctalLiteral);
        }
        return this.createLiteral(token);
      }

      return this.factory.createIdentifier(token.value);
    }

    parseObjectProperty():Property {
      var token, key, id, value, param;

      token = this.lexer.lookahead;

      if (token.type === TokenType.Identifier) {

        id = this.parseObjectPropertyKey();

        // Property Assignment: Getter and Setter.

        if (token.value === 'get' && !this.lexer.match(':')) {
          key = this.parseObjectPropertyKey();
          this.lexer.expect('(');
          this.lexer.expect(')');
          value = this.parsePropertyFunction([], null);
          return this.factory.createProperty('get', key, value);
        }
        if (token.value === 'set' && !this.lexer.match(':')) {
          key = this.parseObjectPropertyKey();
          this.lexer.expect('(');
          token = this.lexer.lookahead;
          if (token.type !== TokenType.Identifier) {
            this.lexer.throwUnexpected(this.lexer.lex());
          }
          param = [ this.parseVariableIdentifier() ];
          this.lexer.expect(')');
          value = this.parsePropertyFunction(param, token);
          return this.factory.createProperty('set', key, value);
        }
        this.lexer.expect(':');
        value = this.parseAssignmentExpression();
        return this.factory.createProperty('init', id, value);
      }
      if (token.type === TokenType.EOF || token.type === TokenType.Punctuator) {
        this.lexer.throwUnexpected(token);
        return null;
      } else {
        key = this.parseObjectPropertyKey();
        this.lexer.expect(':');
        value = this.parseAssignmentExpression();
        return this.factory.createProperty('init', key, value);
      }
    }

    parseObjectInitialiser() {
      var properties = [], property, name, key, kind, map = {}, toString = String;

      this.lexer.expect('{');

      while (!this.lexer.match('}')) {
        property = this.parseObjectProperty();
        if (property === null) continue;
        if (property.key.type === Syntax.Identifier) {
          name = (<Identifier>property.key).name;
        } else {
          name = toString((<Literal>property.key).value);
        }
        kind = (property.kind === 'init') ? PropertyKind.Data :
            (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;

        key = '$' + name;
        if (Object.prototype.hasOwnProperty.call(map, key)) {
          if (map[key] === PropertyKind.Data) {
            if (this.lexer.strict && kind === PropertyKind.Data) {
              this.lexer.throwErrorTolerant(null, Messages.StrictDuplicateProperty);
            } else if (kind !== PropertyKind.Data) {
              this.lexer.throwErrorTolerant(null, Messages.AccessorDataProperty);
            }
          } else {
            if (kind === PropertyKind.Data) {
              this.lexer.throwErrorTolerant(null, Messages.AccessorDataProperty);
            } else if (map[key] & kind) {
              this.lexer.throwErrorTolerant(null, Messages.AccessorGetSet);
            }
          }
          map[key] |= kind;
        } else {
          map[key] = kind;
        }

        properties.push(property);

        if (!this.lexer.match('}')) {
          this.lexer.expect(',');
        }
      }

      this.lexer.expect('}');

      return this.factory.createObjectExpression(properties);
    }

// 11.1.6 The Grouping Operator

    parseGroupExpression() {
      var expr;

      this.lexer.expect('(');

      expr = this.parseExpression();

      this.lexer.expect(')');

      return expr;
    }


// 11.1 Primary Expressions

    parsePrimaryExpression() {
      var type, token;
      var lookahead = this.lexer.lookahead;
      type = lookahead.type;

      if (type === TokenType.Identifier) {
        return this.factory.createIdentifier(this.lexer.lex().value);
      }

      if (type === TokenType.StringLiteral || type === TokenType.NumericLiteral) {
        if (this.lexer.strict && lookahead['octal']) {
          this.lexer.throwErrorTolerant(this.lexer.lookahead, Messages.StrictOctalLiteral);
        }
        return this.createLiteral(this.lexer.lex());
      }

      if (type === TokenType.Keyword) {
        if (this.lexer.matchKeyword('this')) {
          this.lexer.lex();
          return this.factory.createThisExpression();
        }

        if (this.lexer.matchKeyword('function')) {
          return this.parseFunctionExpression();
        }
      }

      if (type === TokenType.BooleanLiteral) {
        token = this.lexer.lex();
        token.value = (token.value === 'true');
        return this.createLiteral(token);
      }

      if (type === TokenType.NullLiteral) {
        token = this.lexer.lex();
        token.value = null;
        return this.createLiteral(token);
      }

      if (this.lexer.match('[')) {
        return this.parseArrayInitialiser();
      }

      if (this.lexer.match('{')) {
        return this.parseObjectInitialiser();
      }

      if (this.lexer.match('(')) {
        return this.parseGroupExpression();
      }

      if (this.lexer.match('/') || this.lexer.match('/=')) {
        return this.createLiteral(this.lexer.scanRegExp());
      }

      return this.lexer.throwUnexpected(this.lexer.lex());
    }

// 11.2 Left-Hand-Side Expressions

    parseArguments() {
      var args = [];

      this.lexer.expect('(');

      if (!this.lexer.match(')')) {
        while (this.lexer.index < this.lexer.length) {
          args.push(this.parseAssignmentExpression());
          if (this.lexer.match(')')) {
            break;
          }
          this.lexer.expect(',');
        }
      }

      this.lexer.expect(')');

      return args;
    }

    parseNonComputedProperty() {
      var token = this.lexer.lex();

      if (!this.lexer.isIdentifierName(token)) {
        this.lexer.throwUnexpected(token);
      }

      return this.factory.createIdentifier(token.value);
    }

    parseNonComputedMember() {
      this.lexer.expect('.');
      return this.parseNonComputedProperty();
    }

    parseComputedMember() {
      var expr;

      this.lexer.expect('[');

      expr = this.parseExpression();

      this.lexer.expect(']');

      return expr;
    }

    parseNewExpression() {
      var callee, args;

      this.lexer.expectKeyword('new');
      callee = this.parseLeftHandSideExpression();
      args = this.lexer.match('(') ? this.parseArguments() : [];

      return this.factory.createNewExpression(callee, args);
    }

    parseLeftHandSideExpressionAllowCall() {
      var expr, args, property;

      expr =
          this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();

      while (this.lexer.match('.') || this.lexer.match('[') || this.lexer.match('(')) {
        if (this.lexer.match('(')) {
          args = this.parseArguments();
          expr = this.factory.createCallExpression(expr, args);
        } else if (this.lexer.match('[')) {
          property = this.parseComputedMember();
          expr = this.factory.createMemberExpressionComputed(expr, property);
        } else {
          property = this.parseNonComputedMember();
          expr = this.factory.createMemberExpressionNonComputed(expr, property);
        }
      }
      return expr;
    }


    parseLeftHandSideExpression() {
      var expr, property;

      expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();

      while (this.lexer.match('.') || this.lexer.match('[')) {
        if (this.lexer.match('[')) {
          property = this.parseComputedMember();
          expr = this.factory.createMemberExpressionComputed(expr, property);
        } else {
          property = this.parseNonComputedMember();
          expr = this.factory.createMemberExpressionNonComputed(expr, property);
        }
      }

      return expr;
    }

    // 11.3 Postfix Expressions
    parsePostfixExpression() {
      var expr = this.parseLeftHandSideExpressionAllowCall(), token;

      if (this.lexer.lookahead.type !== TokenType.Punctuator) {
        return expr;
      }

      if ((this.lexer.match('++') || this.lexer.match('--')) && !this.lexer.peekLineTerminator()) {
        // 11.3.1, 11.3.2
        if (this.lexer.strict && expr.type === Syntax.Identifier &&
            this.lexer.isRestrictedWord(expr.name)) {
          this.lexer.throwErrorTolerant(null, Messages.StrictLHSPostfix);
        }

        if (!this.lexer.isLeftHandSide(expr)) {
          this.lexer.throwError(null, Messages.InvalidLHSInAssignment);
        }

        token = this.lexer.lex();
        expr = this.factory.createPostfixExpression(token.value, expr);
      }

      return expr;
    }

    // 11.4 Unary Operators
    parseUnaryExpression() {
      var token, expr;

      if (this.lexer.lookahead.type !== TokenType.Punctuator &&
          this.lexer.lookahead.type !== TokenType.Keyword) {
        return this.parsePostfixExpression();
      }

      if (this.lexer.match('++') || this.lexer.match('--')) {
        token = this.lexer.lex();
        expr = this.parseUnaryExpression();
        // 11.4.4, 11.4.5
        if (this.lexer.strict && expr.type === Syntax.Identifier &&
            this.lexer.isRestrictedWord(expr.name)) {
          this.lexer.throwErrorTolerant(null, Messages.StrictLHSPrefix);
        }

        if (!this.lexer.isLeftHandSide(expr)) {
          this.lexer.throwError(null, Messages.InvalidLHSInAssignment);
        }

        return this.factory.createUnaryExpression(token.value, expr);
      }

      if (this.lexer.match('+') || this.lexer.match('-') || this.lexer.match('~') || this.lexer.match('!')) {
        token = this.lexer.lex();
        expr = this.parseUnaryExpression();
        return this.factory.createUnaryExpression(token.value, expr);
      }

      if (this.lexer.matchKeyword('delete') || this.lexer.matchKeyword('void') ||
          this.lexer.matchKeyword('typeof')) {
        token = this.lexer.lex();
        expr = this.parseUnaryExpression();
        expr = this.factory.createUnaryExpression(token.value, expr);
        if (this.lexer.strict && expr.operator === 'delete' &&
            expr.argument.type === Syntax.Identifier) {
          this.lexer.throwErrorTolerant(null, Messages.StrictDelete);
        }
        return expr;
      }

      return this.parsePostfixExpression();
    }

    binaryPrecedence(token, allowIn) {
      var prec = 0;

      if (token.type !== TokenType.Punctuator &&
          token.type !== TokenType.Keyword) {
        return 0;
      }

      switch (token.value) {
        case '||':
          prec = 1;
          break;

        case '&&':
          prec = 2;
          break;

        case '|':
          prec = 3;
          break;

        case '^':
          prec = 4;
          break;

        case '&':
          prec = 5;
          break;

        case '==':
        case '!=':
        case '===':
        case '!==':
          prec = 6;
          break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
          prec = 7;
          break;

        case 'in':
          prec = allowIn ? 7 : 0;
          break;

        case '<<':
        case '>>':
        case '>>>':
          prec = 8;
          break;

        case '+':
        case '-':
          prec = 9;
          break;

        case '*':
        case '/':
        case '%':
          prec = 11;
          break;

        default:
          break;
      }

      return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators
    parseBinaryExpression() {
      var expr, token, prec, previousAllowIn, stack, right, operator, left, i;

      previousAllowIn = this.allowIn;
      this.allowIn = true;

      expr = this.parseUnaryExpression();

      token = this.lexer.lookahead;
      prec = this.binaryPrecedence(token, previousAllowIn);
      if (prec === 0) {
        return expr;
      }
      token.prec = prec;
      this.lexer.lex();

      stack = [expr, token, this.parseUnaryExpression()];

      while ((prec = this.binaryPrecedence(this.lexer.lookahead, previousAllowIn)) > 0) {

        // Reduce: make a binary expression from the three topmost entries.
        while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
          right = stack.pop();
          operator = stack.pop().value;
          left = stack.pop();
          stack.push(this.factory.createBinaryExpression(operator, left, right));
        }

        // Shift.
        token = this.lexer.lex();
        token.prec = prec;
        stack.push(token);
        stack.push(this.parseUnaryExpression());
      }

      this.allowIn = previousAllowIn;

      // Final reduce to clean-up the stack.
      i = stack.length - 1;
      expr = stack[i];
      while (i > 1) {
        expr = this.factory.createBinaryExpression(stack[i - 1].value, stack[i - 2],
            expr);
        i -= 2;
      }
      return expr;
    }


// 11.12 Conditional Operator

    parseConditionalExpression() {
      var expr, previousAllowIn, consequent, alternate;

      expr = this.parseBinaryExpression();

      if (this.lexer.match('?')) {
        this.lexer.lex();
        previousAllowIn = this.allowIn;
        this.allowIn = true;
        consequent = this.parseAssignmentExpression();
        this.allowIn = previousAllowIn;
        this.lexer.expect(':');
        alternate = this.parseAssignmentExpression();

        expr = this.factory.createConditionalExpression(expr, consequent, alternate);
      }

      return expr;
    }

// 11.13 Assignment Operators
    parseAssignmentExpression() {
      var token, left, right;

      token = this.lexer.lookahead;
      left = this.parseConditionalExpression();

      if (this.lexer.matchAssign()) {
        // LeftHandSideExpression
        if (!this.lexer.isLeftHandSide(left)) {
          this.lexer.throwError(null, Messages.InvalidLHSInAssignment);
        }

        // 11.13.1
        if (this.lexer.strict && left.type === Syntax.Identifier &&
            this.lexer.isRestrictedWord(left.name)) {
          this.lexer.throwErrorTolerant(token, Messages.StrictLHSAssignment);
        }

        token = this.lexer.lex();
        right = this.parseAssignmentExpression();
        return this.factory.createAssignmentExpression(token.value, left, right);
      }

      return left;
    }

// 11.14 Comma Operator

    parseExpression() {
      var expr = this.parseAssignmentExpression();

      if (this.lexer.match(',')) {
        expr = this.factory.createSequenceExpression([ expr ]);

        while (this.lexer.index < this.lexer.length) {
          if (!this.lexer.match(',')) {
            break;
          }
          this.lexer.lex();
          expr.expressions.push(this.parseAssignmentExpression());
        }

      }
      return expr;
    }

// 12.1 Block

    parseStatementList() {
      var list = [],
          statement;

      while (this.lexer.index < this.lexer.length) {
        if (this.lexer.match('}')) {
          break;
        }
        statement = this.parseSourceElement();
        if (typeof statement === 'undefined') {
          break;
        }
        list.push(statement);
      }

      return list;
    }

    parseBlock() {
      var block;

      this.lexer.expect('{');

      block = this.parseStatementList();

      this.lexer.expect('}');

      return this.factory.createBlockStatement(block);
    }

// 12.2 Variable Statement

    parseVariableIdentifier():Identifier {
      var token = this.lexer.lex();

      if (token.type !== TokenType.Identifier) {
        this.lexer.throwUnexpected(token);
      }

      return this.factory.createIdentifier(token.value);
    }

    parseVariableDeclaration(isConstant:bool) {
      var id = this.parseVariableIdentifier(),
          init = null;

      // 12.2.1
      if (this.lexer.strict && this.lexer.isRestrictedWord(id.name)) {
        this.lexer.throwErrorTolerant(null, Messages.StrictVarName);
      }

      if (isConstant) {
        this.lexer.expect('=');
        init = this.parseAssignmentExpression();
      } else if (this.lexer.match('=')) {
        this.lexer.lex();
        init = this.parseAssignmentExpression();
      }

      return this.factory.createVariableDeclarator(id, init);
    }

    parseVariableDeclarationList(isConstant:bool) {
      var list = [];

      do {
        list.push(this.parseVariableDeclaration(isConstant));
        if (!this.lexer.match(',')) {
          break;
        }
        this.lexer.lex();
      } while (this.lexer.index < this.lexer.length);

      return list;
    }

    parseVariableStatement() {
      var declarations;

      this.lexer.expectKeyword('var');

      declarations = this.parseVariableDeclarationList(false);

      this.lexer.consumeSemicolon();

      return this.factory.createVariableDeclaration(declarations, 'var');
    }

// kind may be `const` or `let`
// Both are experimental and not in the specification yet.
// see http://wiki.ecmascript.org/doku.php?id=harmony:const
// and http://wiki.ecmascript.org/doku.php?id=harmony:let
    parseConstLetDeclaration(kind:string):VariableDeclaration {
      this.lexer.expectKeyword(kind);

      var declarations = this.parseVariableDeclarationList(kind === "const");

      this.lexer.consumeSemicolon();

      return this.factory.createVariableDeclaration(declarations, kind);
    }

// 12.3 Empty Statement

    parseEmptyStatement():EmptyStatement {
      this.lexer.expect(';');
      return this.factory.createEmptyStatement();
    }

// 12.4 Expression Statement

    parseExpressionStatement() {
      var expr = this.parseExpression();
      this.lexer.consumeSemicolon();
      return this.factory.createExpressionStatement(expr);
    }

// 12.5 If statement

    parseIfStatement() {
      var test, consequent, alternate;

      this.lexer.expectKeyword('if');

      this.lexer.expect('(');

      test = this.parseExpression();

      this.lexer.expect(')');

      consequent = this.parseStatement();

      if (this.lexer.matchKeyword('else')) {
        this.lexer.lex();
        alternate = this.parseStatement();
      } else {
        alternate = null;
      }

      return this.factory.createIfStatement(test, consequent, alternate);
    }

// 12.6 Iteration Statements

    parseDoWhileStatement() {
      var body, test, oldInIteration;

      this.lexer.expectKeyword('do');

      oldInIteration = this.inIteration;
      this.inIteration = true;

      body = this.parseStatement();

      this.inIteration = oldInIteration;

      this.lexer.expectKeyword('while');

      this.lexer.expect('(');

      test = this.parseExpression();

      this.lexer.expect(')');

      if (this.lexer.match(';')) {
        this.lexer.lex();
      }

      return this.factory.createDoWhileStatement(body, test);
    }

    parseWhileStatement():WhileStatement {
      this.lexer.expectKeyword('while');

      this.lexer.expect('(');

      var test = this.parseExpression();

      this.lexer.expect(')');

      var oldInIteration = this.inIteration;
      this.inIteration = true;

      var body = this.parseStatement();

      this.inIteration = oldInIteration;

      return this.factory.createWhileStatement(test, body);
    }

    parseForVariableDeclaration() {
      var token = this.lexer.lex(),
          declarations = this.parseVariableDeclarationList(false);

      return this.factory.createVariableDeclaration(declarations, token.value);
    }

    parseForStatement():ForTypeStatement {
      var init, test, update, left, right, body, oldInIteration;

      init = test = update = null;

      this.lexer.expectKeyword('for');

      this.lexer.expect('(');

      if (this.lexer.match(';')) {
        this.lexer.lex();
      } else {
        if (this.lexer.matchKeyword('var') || this.lexer.matchKeyword('let')) {
          this.allowIn = false;
          init = this.parseForVariableDeclaration();
          this.allowIn = true;

          if (init.declarations.length === 1 && this.lexer.matchKeyword('in')) {
            this.lexer.lex();
            left = init;
            right = this.parseExpression();
            init = null;
          }
        } else {
          this.allowIn = false;
          init = this.parseExpression();
          this.allowIn = true;

          if (this.lexer.matchKeyword('in')) {
            // LeftHandSideExpression
            if (!this.lexer.isLeftHandSide(init)) {
              this.lexer.throwError(null, Messages.InvalidLHSInForIn);
            }

            this.lexer.lex();
            left = init;
            right = this.parseExpression();
            init = null;
          }
        }

        if (typeof left === 'undefined') {
          this.lexer.expect(';');
        }
      }

      if (typeof left === 'undefined') {

        if (!this.lexer.match(';')) {
          test = this.parseExpression();
        }
        this.lexer.expect(';');

        if (!this.lexer.match(')')) {
          update = this.parseExpression();
        }
      }

      this.lexer.expect(')');

      oldInIteration = this.inIteration;
      this.inIteration = true;

      body = this.parseStatement();

      this.inIteration = oldInIteration;

      if (typeof left === 'undefined') {
        return this.factory.createForStatement(init, test, update, body);
      }
      return this.factory.createForInStatement(left, right, body);
    }

// 12.7 The continue statement

    parseContinueStatement() {
      var label = null, key;

      this.lexer.expectKeyword('continue');

      // Optimize the most common form: 'continue;'.
      if (this.lexer.getCharCodeRel(0) === 59) {
        this.lexer.lex();

        if (!this.inIteration) {
          this.lexer.throwError(null, Messages.IllegalContinue);
        }

        return this.factory.createContinueStatement(null);
      }

      if (this.lexer.peekLineTerminator()) {
        if (!this.inIteration) {
          this.lexer.throwError(null, Messages.IllegalContinue);
        }

        return this.factory.createContinueStatement(null);
      }

      if (this.lexer.lookahead.type === TokenType.Identifier) {
        label = this.parseVariableIdentifier();

        key = '$' + label.name;
        if (!Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
          this.lexer.throwError(null, Messages.UnknownLabel, label.name);
        }
      }

      this.lexer.consumeSemicolon();

      if (label === null && !this.inIteration) {
        this.lexer.throwError(null, Messages.IllegalContinue);
      }

      return this.factory.createContinueStatement(label);
    }

// 12.8 The break statement

    parseBreakStatement() {
      var label = null, key;

      this.lexer.expectKeyword('break');

      // Catch the very common case first: immediately a semicolon (char #59).
      if (this.lexer.getCharCodeRel(0) === 59) {
        this.lexer.lex();

        if (!(this.inIteration || this.inSwitch)) {
          this.lexer.throwError(null, Messages.IllegalBreak);
        }

        return this.factory.createBreakStatement(null);
      }

      if (this.lexer.peekLineTerminator()) {
        if (!(this.inIteration || this.inSwitch)) {
          this.lexer.throwError(null, Messages.IllegalBreak);
        }

        return this.factory.createBreakStatement(null);
      }

      if (this.lexer.lookahead.type === TokenType.Identifier) {
        label = this.parseVariableIdentifier();

        key = '$' + label.name;
        if (!Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
          this.lexer.throwError(null, Messages.UnknownLabel, label.name);
        }
      }

      this.lexer.consumeSemicolon();

      if (label === null && !(this.inIteration || this.inSwitch)) {
        this.lexer.throwError(null, Messages.IllegalBreak);
      }

      return this.factory.createBreakStatement(label);
    }

// 12.9 The return statement

    parseReturnStatement() {
      var argument = null;

      this.lexer.expectKeyword('return');

      if (!this.inFunctionBody) {
        this.lexer.throwErrorTolerant(null, Messages.IllegalReturn);
      }

      // 'return' followed by a space and an identifier is very common.
      if (this.lexer.getCharCodeRel(0) === 32) {
        if (this.lexer.isIdentifierStart(this.lexer.getCharCodeRel(1))) {
          argument = this.parseExpression();
          this.lexer.consumeSemicolon();
          return this.factory.createReturnStatement(argument);
        }
      }

      if (this.lexer.peekLineTerminator()) {
        return this.factory.createReturnStatement(null);
      }

      if (!this.lexer.match(';')) {
        if (!this.lexer.match('}') && this.lexer.lookahead.type !== TokenType.EOF) {
          argument = this.parseExpression();
        }
      }

      this.lexer.consumeSemicolon();

      return this.factory.createReturnStatement(argument);
    }

// 12.10 The with statement

    parseWithStatement() {
      var object, body;

      if (this.lexer.strict) {
        this.lexer.throwErrorTolerant(null, Messages.StrictModeWith);
      }

      this.lexer.expectKeyword('with');

      this.lexer.expect('(');

      object = this.parseExpression();

      this.lexer.expect(')');

      body = this.parseStatement();

      return this.factory.createWithStatement(object, body);
    }

// 12.10 The swith statement

    parseSwitchCase() {
      var test,
          consequent = [],
          statement;

      if (this.lexer.matchKeyword('default')) {
        this.lexer.lex();
        test = null;
      } else {
        this.lexer.expectKeyword('case');
        test = this.parseExpression();
      }
      this.lexer.expect(':');

      while (this.lexer.index < this.lexer.length) {
        if (this.lexer.match('}') || this.lexer.matchKeyword('default') || this.lexer.matchKeyword('case')) {
          break;
        }
        statement = this.parseStatement();
        consequent.push(statement);
      }

      return this.factory.createSwitchCase(test, consequent);
    }

    parseSwitchStatement():SwitchStatement {
      this.lexer.expectKeyword('switch');

      this.lexer.expect('(');

      var discriminant = this.parseExpression();

      this.lexer.expect(')');

      this.lexer.expect('{');

      if (this.lexer.match('}')) {
        this.lexer.lex();
        // TODO: Why this is undefined?
        return this.factory.createSwitchStatement(discriminant, undefined);
      }

      var cases:SwitchCase[] = [];

      var oldInSwitch = this.inSwitch;
      this.inSwitch = true;
      var defaultFound = false;

      while (this.lexer.index < this.lexer.length) {
        if (this.lexer.match('}')) {
          break;
        }
        var clause = this.parseSwitchCase();
        if (clause.test === null) {
          if (defaultFound) {
            this.lexer.throwError(null, Messages.MultipleDefaultsInSwitch);
          }
          defaultFound = true;
        }
        cases.push(clause);
      }

      this.inSwitch = oldInSwitch;

      this.lexer.expect('}');

      return this.factory.createSwitchStatement(discriminant, cases);
    }

// 12.13 The throw statement

    parseThrowStatement() {
      var argument;

      this.lexer.expectKeyword('throw');

      if (this.lexer.peekLineTerminator()) {
        this.lexer.throwError(null, Messages.NewlineAfterThrow);
      }

      argument = this.parseExpression();

      this.lexer.consumeSemicolon();

      return this.factory.createThrowStatement(argument);
    }

// 12.14 The try statement

    parseCatchClause() {
      var param, body;

      this.lexer.expectKeyword('catch');

      this.lexer.expect('(');
      if (this.lexer.match(')')) {
        this.lexer.throwUnexpected(this.lexer.lookahead);
      }

      param = this.parseExpression();
      // 12.14.1
      if (this.lexer.strict && param.type === Syntax.Identifier &&
          this.lexer.isRestrictedWord(param.name)) {
        this.lexer.throwErrorTolerant(null, Messages.StrictCatchVariable);
      }

      this.lexer.expect(')');
      body = this.parseBlock();
      return this.factory.createCatchClause(param, body);
    }

    parseTryStatement() {
      var block, handlers = [], finalizer = null;

      this.lexer.expectKeyword('try');

      block = this.parseBlock();

      if (this.lexer.matchKeyword('catch')) {
        handlers.push(this.parseCatchClause());
      }

      if (this.lexer.matchKeyword('finally')) {
        this.lexer.lex();
        finalizer = this.parseBlock();
      }

      if (handlers.length === 0 && !finalizer) {
        this.lexer.throwError(null, Messages.NoCatchOrFinally);
      }

      return this.factory.createTryStatement(block, [], handlers, finalizer);
    }

// 12.15 The debugger statement

    parseDebuggerStatement() {
      this.lexer.expectKeyword('debugger');

      this.lexer.consumeSemicolon();

      return this.factory.createDebuggerStatement();
    }

// 12 Statements

    parseStatement():Statement {
      var type = this.lexer.lookahead.type,
          expr,
          labeledBody,
          key;

      if (type === TokenType.EOF) {
        this.lexer.throwUnexpected(this.lexer.lookahead);
      }

      if (type === TokenType.Punctuator) {
        switch (this.lexer.lookahead.value) {
          case ';':
            return this.parseEmptyStatement();
          case '{':
            return this.parseBlock();
          case '(':
            return this.parseExpressionStatement();
          default:
            break;
        }
      }

      if (type === TokenType.Keyword) {
        switch (this.lexer.lookahead.value) {
          case 'break':
            return this.parseBreakStatement();
          case 'continue':
            return this.parseContinueStatement();
          case 'debugger':
            return this.parseDebuggerStatement();
          case 'do':
            return this.parseDoWhileStatement();
          case 'for':
            return this.parseForStatement();
          case 'function':
            return this.parseFunctionDeclaration();
          case 'if':
            return this.parseIfStatement();
          case 'return':
            return this.parseReturnStatement();
          case 'switch':
            return this.parseSwitchStatement();
          case 'throw':
            return this.parseThrowStatement();
          case 'try':
            return this.parseTryStatement();
          case 'var':
            return this.parseVariableStatement();
          case 'while':
            return this.parseWhileStatement();
          case 'with':
            return this.parseWithStatement();
          default:
            break;
        }
      }

      expr = this.parseExpression();

      // 12.12 Labelled Statements
      if ((expr.type === Syntax.Identifier) && this.lexer.match(':')) {
        this.lexer.lex();

        key = '$' + expr.name;
        if (Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
          this.lexer.throwError(null, Messages.Redeclaration, 'Label', expr.name);
        }

        this.labelSet[key] = true;
        labeledBody = this.parseStatement();
        delete this.labelSet[key];
        return this.factory.createLabeledStatement(expr, labeledBody);
      }

      this.lexer.consumeSemicolon();

      return this.factory.createExpressionStatement(expr);
    }

// 13 Function Definition

    parseFunctionSourceElements() {
      var sourceElement, sourceElements = [], token, directive, firstRestricted,
          oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody;

      this.lexer.expect('{');

      while (this.lexer.index < this.lexer.length) {
        if (this.lexer.lookahead.type !== TokenType.StringLiteral) {
          break;
        }
        token = this.lexer.lookahead;

        sourceElement = this.parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== Syntax.Literal) {
          // this is not directive
          break;
        }
        directive = this.lexer.slice(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          this.lexer.strict = true;
          if (firstRestricted) {
            this.lexer.throwErrorTolerant(firstRestricted,
                Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }

      oldLabelSet = this.labelSet;
      oldInIteration = this.inIteration;
      oldInSwitch = this.inSwitch;
      oldInFunctionBody = this.inFunctionBody;

      this.labelSet = {};
      this.inIteration = false;
      this.inSwitch = false;
      this.inFunctionBody = true;

      while (this.lexer.index < this.lexer.length) {
        if (this.lexer.match('}')) {
          break;
        }
        sourceElement = this.parseSourceElement();
        if (typeof sourceElement === 'undefined') {
          break;
        }
        sourceElements.push(sourceElement);
      }

      this.lexer.expect('}');

      this.labelSet = oldLabelSet;
      this.inIteration = oldInIteration;
      this.inSwitch = oldInSwitch;
      this.inFunctionBody = oldInFunctionBody;

      return this.factory.createBlockStatement(sourceElements);
    }

    parseParams(firstRestricted) {
      var param, params = [], token, stricted, paramSet, key, message;
      this.lexer.expect('(');

      if (!this.lexer.match(')')) {
        paramSet = {};
        while (this.lexer.index < this.lexer.length) {
          token = this.lexer.lookahead;
          param = this.parseVariableIdentifier();
          key = '$' + token.value;
          if (this.lexer.strict) {
            if (this.lexer.isRestrictedWord(token.value)) {
              stricted = token;
              message = Messages.StrictParamName;
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
              stricted = token;
              message = Messages.StrictParamDupe;
            }
          } else if (!firstRestricted) {
            if (this.lexer.isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (this.lexer.isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }
          params.push(param);
          paramSet[key] = true;
          if (this.lexer.match(')')) {
            break;
          }
          this.lexer.expect(',');
        }
      }

      this.lexer.expect(')');

      return {
        params: params,
        stricted: stricted,
        firstRestricted: firstRestricted,
        message: message
      };
    }

    parseFunctionDeclaration():FunctionDeclaration {
      var id, params = [
      ], body, token, stricted, tmp, firstRestricted, message, previousStrict;

      this.lexer.expectKeyword('function');
      token = this.lexer.lookahead;
      id = this.parseVariableIdentifier();
      if (this.lexer.strict) {
        if (this.lexer.isRestrictedWord(token.value)) {
          this.lexer.throwErrorTolerant(token, Messages.StrictFunctionName);
        }
      } else {
        if (this.lexer.isRestrictedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictFunctionName;
        } else if (this.lexer.isStrictModeReservedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictReservedWord;
        }
      }

      tmp = this.parseParams(firstRestricted);
      params = tmp.params;
      stricted = tmp.stricted;
      firstRestricted = tmp.firstRestricted;
      if (tmp.message) {
        message = tmp.message;
      }

      previousStrict = this.lexer.strict;
      body = this.parseFunctionSourceElements();
      if (this.lexer.strict && firstRestricted) {
        this.lexer.throwError(firstRestricted, message);
      }
      if (this.lexer.strict && stricted) {
        this.lexer.throwErrorTolerant(stricted, message);
      }
      this.lexer.strict = previousStrict;

      return this.factory.createFunctionDeclaration(id, params, [], body);
    }

    parseFunctionExpression() {
      var token, id = null, stricted, firstRestricted, message, tmp, params = [
      ], body, previousStrict;

      this.lexer.expectKeyword('function');

      if (!this.lexer.match('(')) {
        token = this.lexer.lookahead;
        id = this.parseVariableIdentifier();
        if (this.lexer.strict) {
          if (this.lexer.isRestrictedWord(token.value)) {
            this.lexer.throwErrorTolerant(token, Messages.StrictFunctionName);
          }
        } else {
          if (this.lexer.isRestrictedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictFunctionName;
          } else if (this.lexer.isStrictModeReservedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictReservedWord;
          }
        }
      }

      tmp = this.parseParams(firstRestricted);
      params = tmp.params;
      stricted = tmp.stricted;
      firstRestricted = tmp.firstRestricted;
      if (tmp.message) {
        message = tmp.message;
      }

      previousStrict = this.lexer.strict;
      body = this.parseFunctionSourceElements();
      if (this.lexer.strict && firstRestricted) {
        this.lexer.throwError(firstRestricted, message);
      }
      if (this.lexer.strict && stricted) {
        this.lexer.throwErrorTolerant(stricted, message);
      }
      this.lexer.strict = previousStrict;

      return this.factory.createFunctionExpression(id, params, [], body);
    }

// 14 Program

    parseSourceElement():Statement {
      if (this.lexer.lookahead.type === TokenType.Keyword) {
        switch (this.lexer.lookahead.value) {
          case 'const':
          case 'let':
            return this.parseConstLetDeclaration(this.lexer.lookahead.value);
          case 'function':
            return this.parseFunctionDeclaration();
          default:
            return this.parseStatement();
        }
      }

      if (this.lexer.lookahead.type !== TokenType.EOF) {
        return this.parseStatement();
      }
    }

    parseSourceElements() {
      var sourceElement, sourceElements = [], token, directive, firstRestricted;

      while (this.lexer.index < this.lexer.length) {
        token = this.lexer.lookahead;
        if (token.type !== TokenType.StringLiteral) {
          break;
        }

        sourceElement = this.parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== Syntax.Literal) {
          // this is not directive
          break;
        }
        directive = this.lexer.slice(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          this.lexer.strict = true;
          if (firstRestricted) {
            this.lexer.throwErrorTolerant(firstRestricted,
                Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }

      while (this.lexer.index < this.lexer.length) {
        sourceElement = this.parseSourceElement();
        if (typeof sourceElement === 'undefined') {
          break;
        }
        sourceElements.push(sourceElement);
      }
      return sourceElements;
    }

    parseProgram():Program {
      this.lexer.strict = false;
      this.lexer.peek();
      var body = this.parseSourceElements();
      return this.factory.createProgram(body);
    }

    endMarker(startRange:number, startLine:number, startColumn:number, node:Expression) {
      if (this.lexer.includeRange && typeof node.range === 'undefined') {
        node.range = [startRange, this.lexer.index];
      }
      if (this.lexer.includeLocation && typeof node.loc === 'undefined') {
        node.loc = {
          start: {
            line: startLine,
            column: startColumn
          },
          end: {
            line: this.lexer.lineNumber,
            column: this.lexer.index - this.lexer.lineStart
          }
        };
        this.postProcess(node);
      }
    }

    endMarkerGroup(startRange:number, startLine:number, startColumn:number, expr:Expression) {
      expr.groupRange = [startRange, this.lexer.index];
      expr.groupLoc = {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: this.lexer.lineNumber,
          column: this.lexer.index - this.lexer.lineStart
        }
      };
      this.postProcess(expr);
    }

    trackGroupExpression() {
      this.lexer.skipComment();

      var startRange = this.lexer.index,
          startLine = this.lexer.lineNumber,
          startColumn = this.lexer.index - this.lexer.lineStart;
      this.lexer.expect('(');
      var expr = this.parseExpression();
      this.lexer.expect(')');
      this.endMarkerGroup(startRange, startLine, startColumn, expr);
      return expr;
    }

    trackLeftHandSideExpression() {
      this.lexer.skipComment();

      var startRange = this.lexer.index,
          startLine = this.lexer.lineNumber,
          startColumn = this.lexer.index - this.lexer.lineStart;
      var expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
      var isDot:bool;
      while ((isDot = this.lexer.match('.')) || this.lexer.match('[')) {
        if (!isDot) {
          var property = this.parseComputedMember();
          expr = this.factory.createMemberExpressionComputed(expr, property);
          this.endMarker(startRange, startLine, startColumn, expr);
        } else {
          property = this.parseNonComputedMember();
          expr = this.factory.createMemberExpressionNonComputed(expr, property);
          this.endMarker(startRange, startLine, startColumn, expr);
        }
      }
      return expr;
    }

    trackLeftHandSideExpressionAllowCall() {
      var args, property;

      this.lexer.skipComment();
      var startRange = this.lexer.index,
          startLine = this.lexer.lineNumber,
          startColumn = this.lexer.index - this.lexer.lineStart;
      var expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
      while (this.lexer.match('.') || this.lexer.match('[') || this.lexer.match('(')) {
        if (this.lexer.match('(')) {
          args = this.parseArguments();
          expr = this.factory.createCallExpression(expr, args);
          this.endMarker(startRange, startLine, startColumn, expr);
        } else if (this.lexer.match('[')) {
          property = this.parseComputedMember();
          expr = this.factory.createMemberExpressionComputed(expr, property);
          this.endMarker(startRange, startLine, startColumn, expr);
        } else {
          property = this.parseNonComputedMember();
          expr = this.factory.createMemberExpressionNonComputed(expr, property);
          this.endMarker(startRange, startLine, startColumn, expr);
        }
      }

      return expr;
    }

    wrapTrackingFunction(range:bool, loc:bool) {
      return (parseFunction:Function):Function => {

        function isBinary(node:Node):bool {
          return node.type === Syntax.LogicalExpression ||
              node.type === Syntax.BinaryExpression;
        }

        var visit = (node:BinaryExpression) => {
          var start, end;

          if (isBinary(node.left)) {
            visit(<BinaryExpression>node.left);
          }
          if (isBinary(node.right)) {
            visit(<BinaryExpression>node.right);
          }

          if (range) {
            if (node.left.groupRange || node.right.groupRange) {
              start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0];
              end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1];
              node.range = [start, end];
            } else if (typeof node.range === 'undefined') {
              start = node.left.range[0];
              end = node.right.range[1];
              node.range = [start, end];
            }
          }
          if (loc) {
            if (node.left.groupLoc || node.right.groupLoc) {
              start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start;
              end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end;
              node.loc = {
                start: start,
                end: end
              };
              node = <BinaryExpression> this.postProcess(node);
            } else if (typeof node.loc === 'undefined') {
              node.loc = {
                start: node.left.loc.start,
                end: node.right.loc.end
              };
              node = <BinaryExpression> this.postProcess(node);
            }
          }
        }

        return () => {
          this.lexer.skipComment();
          var startRange = this.lexer.index,
              startLine = this.lexer.lineNumber,
              startColumn = this.lexer.index - this.lexer.lineStart;
          var node = <Node> parseFunction.apply(this, arguments);
          this.endMarker(startRange, startLine, startColumn, node);
          if (isBinary(node)) {
            visit(<BinaryExpression> node);
          }
          return node;
        };
      };
    }

    patch() {
      var wrapTracking;
      this.lexer.patch();

      if (this.lexer.includeRange || this.lexer.includeLocation) {

        this['parseGroupExpression'] = this.trackGroupExpression;
        this['parseLeftHandSideExpression'] = this.trackLeftHandSideExpression;
        this['parseLeftHandSideExpressionAllowCall'] = this.trackLeftHandSideExpressionAllowCall;

        wrapTracking = this.wrapTrackingFunction(this.lexer.includeRange, this.lexer.includeLocation);

        Parser.PatchingMethods.forEach((method) => {
          this[method] = wrapTracking(this[method]);
        });
      }
    }

    unpatch() {
      delete this['parseGroupExpression'];
      delete this['parseLeftHandSideExpressionAllowCall'];
      Parser.PatchingMethods.forEach((method) => {
        delete this[method];
      });
    }
  }
}