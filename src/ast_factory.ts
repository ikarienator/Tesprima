/// <reference path="tesprima.ts"/>
module TypedEsprima {
  export class ASTFactory {
    name = 'SyntaxTree';

    createArrayExpression(elements:TypedEsprima.Expression[]):ArrayExpression {
      return {
        "type": Syntax.ArrayExpression,
        "elements": elements
      };
    }

    createAssignmentExpression(operator:string, left:Expression, right:Expression):AssignmentExpression {
      return {
        "type": Syntax.AssignmentExpression,
        "operator": operator,
        "left": left,
        "right": right
      };
    }

    createBinaryExpression(operator, left, right):BinaryExpression {
      var type = (operator === '||' || operator === '&&') ?
          Syntax.LogicalExpression :
          Syntax.BinaryExpression;
      return {
        "type": type,
        "operator": operator,
        "left": left,
        "right": right
      };
    }

    createBlockStatement(body:Statement[]):BlockStatement {
      return {
        "type": Syntax.BlockStatement,
        "body": body
      };
    }

    createBreakStatement(label:string = null):BreakStatement {
      return {
        "type": Syntax.BreakStatement,
        "label": label
      };
    }

    createCallExpression(callee, args:Expression[]):CallExpression {
      return {
        "type": Syntax.CallExpression,
        "callee": callee,
        "arguments": args
      };
    }

    createCatchClause(param:VariableDeclaration, body):CatchClause {
      return {
        "type": Syntax.CatchClause,
        "param": param,
        "body": body
      };
    }

    createConditionalExpression(test:Expression, consequent:Expression, alternate:Expression):ConditionalExpression {
      return {
        "type": Syntax.ConditionalExpression,
        "test": test,
        "consequent": consequent,
        "alternate": alternate
      };
    }


    createContinueStatement(label:string = null):ContinueStatement {
      return {
        "type": Syntax.ContinueStatement,
        "label": label
      };
    }

    createDebuggerStatement():DebuggerStatement {
      return {
        "type": Syntax.DebuggerStatement
      };
    }

    createDoWhileStatement(body:Statement[], test:Expression):DoWhileStatement {
      return {
        "type": Syntax.DoWhileStatement,
        "body": body,
        "test": test
      };
    }


    createEmptyStatement():EmptyStatement {
      return {
        "type": Syntax.EmptyStatement
      };
    }


    createExpressionStatement(expression:Expression):ExpressionStatement {
      return {
        "type": Syntax.ExpressionStatement,
        "expression": expression
      };
    }


    createForStatement(init:VariableDeclaration, test:Expression, update:Expression, body:Statement):ForStatement {
      return {
        "type": Syntax.ForStatement,
        "init": init,
        "test": test,
        "update": update,
        "body": body
      };
    }


    createForInStatement(left:VariableDeclaration, right:Expression, body:Statement):ForInStatement {
      return {
        "type": Syntax.ForInStatement,
        "left": left,
        "right": right,
        "body": body,
        "each": false
      };
    }


    createFunctionDeclaration(id:Identifier, params:Identifier[], defaults:Expression[], body:Statement[]):FunctionDeclaration {
      return {
        "type": Syntax.FunctionDeclaration,
        "id": id,
        "params": params,
        "defaults": defaults,
        "body": body,
        "rest": null,
        "generator": false,
        "expression": false
      };
    }


    createFunctionExpression(id:Identifier, params:Identifier[], defaults:Expression[], body:Statement[]):FunctionExpression {
      return {
        "type": Syntax.FunctionExpression,
        "id": id,
        "params": params,
        "defaults": defaults,
        "body": body,
        "rest": null,
        "generator": false,
        "expression": false
      };
    }


    createIdentifier(name:string):Identifier {
      return {
        "type": Syntax.Identifier,
        "name": name
      };
    }


    createIfStatement(test:Expression, consequent:Statement, alternate:Statement):IfStatement {
      return {
        "type": Syntax.IfStatement,
        "test": test,
        "consequent": consequent,
        "alternate": alternate
      };
    }


    createLabeledStatement(label:string, body:Statement):LabeledStatement {
      return <LabeledStatement>{
        "type": Syntax.LabeledStatement,
        "label": label,
        "body": body
      };
    }


    createLiteral(value:any, raw:string):Literal {
      return <Literal>{
        "type": Syntax.Literal,
        "value": value,
        "raw": raw
      };
    }


    createMemberExpressionComputed(object:Expression, property:Expression):MemberExpression {
      return {
        "type": Syntax.MemberExpression,
        "computed": true,
        "object": object,
        "property": property
      };
    }

    createMemberExpressionNonComputed(object:Expression, property:Expression):MemberExpression {
      return {
        "type": Syntax.MemberExpression,
        "computed": false,
        "object": object,
        "property": property
      };
    }


    createNewExpression(callee:Expression, args:Expression[]):NewExpression {
      return {
        "type": Syntax.NewExpression,
        "callee": callee,
        "arguments": args
      };
    }


    createObjectExpression(properties:Property[]):ObjectExpression {
      return {
        "type": Syntax.ObjectExpression,
        "properties": properties
      };
    }


    createPostfixExpression(operator:string, argument:Expression):UpdateExpression {
      return {
        "type": Syntax.UpdateExpression,
        "operator": operator,
        "argument": argument,
        "prefix": false
      };
    }


    createProgram(body:Statement[]):Program {
      return {
        "type": Syntax.Program,
        "body": body
      };
    }

    createProperty(kind:string, key:Primitive, value:Expression):Property {
      return {
        "type": Syntax.Property,
        "key": key,
        "value": value,
        "kind": kind
      };
    }


    createReturnStatement(argument:Expression):ReturnStatement {
      return {
        "type": Syntax.ReturnStatement,
        "argument": argument
      };
    }


    createSequenceExpression(expressions:Expression[]):SequenceExpression {
      return {
        "type": Syntax.SequenceExpression,
        "expressions": expressions
      };
    }


    createSwitchCase(test:Expression, consequent:Statement[]):SwitchCase {
      return <SwitchCase>{
        "type": Syntax.SwitchCase,
        "test": test,
        "consequent": consequent
      };
    }


    createSwitchStatement(discriminant:Expression, cases:SwitchCase[]):SwitchStatement {
      return {
        "type": Syntax.SwitchStatement,
        "discriminant": discriminant,
        "cases": cases
      };
    }


    createThisExpression():ThisExpression {
      return {
        "type": Syntax.ThisExpression
      };
    }


    createThrowStatement(argument:Expression):ThrowStatement {
      return {
        "type": Syntax.ThrowStatement,
        "argument": argument
      };
    }


    createTryStatement(block:Statement[], guardedHandlers:any[], handlers:CatchClause[], finalizer:Statement[]):TryStatement {
      return {
        "type": Syntax.TryStatement,
        "block": block,
        "guardedHandlers": guardedHandlers,
        "handlers": handlers,
        "finalizer": finalizer
      };
    }


    createUnaryExpression(operator:string, argument):UnaryExpression {
      if (operator === '++' || operator === '--') {
        return <UpdateExpression>{
          "type": Syntax.UpdateExpression,
          "operator": operator,
          "argument": argument,
          "prefix": true
        };
      }
      return {
        "type": Syntax.UnaryExpression,
        "operator": operator,
        "argument": argument
      };
    }


    createVariableDeclaration(declarations:VariableDeclarator[], kind:string):VariableDeclaration {
      return {
        "type": Syntax.VariableDeclaration,
        "declarations": declarations,
        "kind": kind
      };
    }


    createVariableDeclarator(id:Identifier, init:Expression):VariableDeclarator {
      return {
        "type": Syntax.VariableDeclarator,
        "id": id,
        "init": init
      };
    }


    createWhileStatement(test:Expression, body:Statement):WhileStatement {
      return {
        "type": Syntax.WhileStatement,
        "test": test,
        "body": body
      };
    }


    createWithStatement(object:Expression, body:Statement[]):WithStatement {
      return {
        "type": Syntax.WithStatement,
        "object": object,
        "body": body
      };
    }
  }
}