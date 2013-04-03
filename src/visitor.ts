/// <reference path="tesprima.ts"/>

export interface ASTVisitor {
    visitArrayExpression(node:ArrayExpression, parent:ASTNode, context?:any);
    visitAssignmentExpression(node:AssignmentExpression, parent:ASTNode, context?:any);
    visitBinaryExpression(node:BinaryExpression, parent:ASTNode, context?:any);
    visitBlockStatement(node:BlockStatement, parent:ASTNode, context?:any);
    visitBreakStatement(node:BreakStatement, parent:ASTNode, context?:any);
    visitCallExpression(node:CallExpression, parent:ASTNode, context?:any);
    visitCatchClause(node:CatchClause, parent:ASTNode, context?:any);
    visitConditionalExpression(node:ConditionalExpression, parent:ASTNode, context?:any);
    visitContinueStatement(node:ContinueStatement, parent:ASTNode, context?:any);
    visitDebuggerStatement(node:DebuggerStatement, parent:ASTNode, context?:any);
    visitDoWhileStatement(node:DoWhileStatement, parent:ASTNode, context?:any);
    visitEmptyStatement(node:EmptyStatement, parent:ASTNode, context?:any);
    visitExpressionStatement(node:ExpressionStatement, parent:ASTNode, context?:any);
    visitForStatement(node:ForStatement, parent:ASTNode, context?:any);
    visitForInStatement(node:ForInStatement, parent:ASTNode, context?:any);
    visitFunctionDeclaration(node:FunctionDeclaration, parent:ASTNode, context?:any);
    visitFunctionExpression(node:FunctionExpression, parent:ASTNode, context?:any);
    visitIdentifier(node:Identifier, parent:ASTNode, context?:any);
    visitIfStatement(node:IfStatement, parent:ASTNode, context?:any);
    visitLabeledStatement(node:LabeledStatement, parent:ASTNode, context?:any);
    visitLiteral(node:Literal, parent:ASTNode, context?:any);
    visitLogicalExpression(node:BinaryExpression, parent:ASTNode, context?:any);
    visitMemberExpression(node:MemberExpression, parent:ASTNode, context?:any);
    visitNewExpression(node:NewExpression, parent:ASTNode, context?:any);
    visitObjectExpression(node:ObjectExpression, parent:ASTNode, context?:any);
    visitPostfixExpression(node:UpdateExpression, parent:ASTNode, context?:any);
    visitProgram(node:Program, parent:ASTNode, context?:any);
    visitProperty(node:Property, parent:ASTNode, context?:any);
    visitReturnStatement(node:ReturnStatement, parent:ASTNode, context?:any);
    visitSequenceExpression(node:SequenceExpression, parent:ASTNode, context?:any);
    visitSwitchCase(node:SwitchCase, parent:ASTNode, context?:any);
    visitSwitchStatement(node:SwitchStatement, parent:ASTNode, context?:any);
    visitThisExpression(node:ThisExpression, parent:ASTNode, context?:any);
    visitThrowStatement(node:ThrowStatement, parent:ASTNode, context?:any);
    visitTryStatement(node:TryStatement, parent:ASTNode, context?:any);
    visitUnaryExpression(node:UnaryExpression, parent:ASTNode, context?:any);
    visitUpdateExpression(node:UpdateExpression, parent:ASTNode, context?:any);
    visitVariableDeclaration(node:VariableDeclaration, parent:ASTNode, context?:any);
    visitVariableDeclarator(node:VariableDeclarator, parent:ASTNode, context?:any);
    visitWhileStatement(node:WhileStatement, parent:ASTNode, context?:any);
    visitWithStatement(node:WithStatement, parent:ASTNode, context?:any);
}

export class ASTTraversor {
    private traverse(node:Statement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor, context:any):void {
        if ('traverse' + node.type in this) {
            this['traverse' + node.type](node, parent, preVisitor, postVisitor, context);
        }
    }

    private traverseStatement(node:Statement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor, context:any):void {
        if ('traverse' + node.type in this) {
            if (!(node.type.substr(-10) === 'Expression' || node.type === 'Identifier' || node.type === 'Literal')) {
                this['traverse' + node.type](node, parent, preVisitor, postVisitor, context);
                return;
            }
        }
        throw new Error("Invalid ASTNode type: " + node.type);
    }

    private traverseExpression(node:Expression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor, context:any):void {
        if ('traverse' + node.type in this) {
            if (node.type.substr(-10) === 'Expression' || node.type === 'Identifier' || node.type === 'Literal') {
                this['traverse' + node.type](node, parent, preVisitor, postVisitor, context);
                return;
            }
        }
        throw new Error("Invalid ASTNode type: " + node.type);
    }

    traverseArrayExpression(node:ArrayExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitArrayExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        for (var elements = node.elements, i = 0, ln = elements.length; i < ln; i++) {
            this.traverseExpression(elements[i], parent, preVisitor, postVisitor, context);
        }
        if (postVisitor) {
            postVisitor.visitArrayExpression(node, parent, context);
        }
    }

    traverseAssignmentExpression(node:AssignmentExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitAssignmentExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.left, parent, preVisitor, postVisitor, context);
        this.traverseExpression(node.right, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitAssignmentExpression(node, parent, context);
        }
    }

    traverseBinaryExpression(node:BinaryExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitBinaryExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.left, parent, preVisitor, postVisitor, context);
        this.traverseExpression(node.right, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            preVisitor.visitBinaryExpression(node, parent, context);
        }
    }

    traverseBlockStatement(node:BlockStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitBlockStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        for (var elements = node.body, i = 0, ln = elements.length; i < ln; i++) {
            this.traverseStatement(elements[i], parent, preVisitor, postVisitor, context);
        }
        if (postVisitor) {
            postVisitor.visitBlockStatement(node, parent, context);
        }
    }

    traverseBreakStatement(node:BreakStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitBreakStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitBreakStatement(node, parent, context);
        }
    }

    traverseCallExpression(node:CallExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitCallExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.callee, parent, preVisitor, postVisitor, context);
        for (var elements = node.arguments, i = 0, ln = elements.length; i < ln; i++) {
            this.traverseExpression(elements[i], parent, preVisitor, postVisitor, context);
        }
        if (postVisitor) {
            postVisitor.visitCallExpression(node, parent, context);
        }
    }

    traverseCatchClause(node:CatchClause, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitCatchClause(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseVariableDeclaration(node.param, parent, preVisitor, postVisitor, context);
        this.traverseStatement(node, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitCatchClause(node, parent, context);
        }
    }

    traverseConditionalExpression(node:ConditionalExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitConditionalExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.test, parent, preVisitor, postVisitor, context);
        if (node.consequent) {
            this.traverseExpression(node.consequent, parent, preVisitor, postVisitor, context);
        }
        if (node.alternate) {
            this.traverseExpression(node.alternate, parent, preVisitor, postVisitor, context);
        }
        if (postVisitor) {
            postVisitor.visitConditionalExpression(node, parent, context);
        }
    }

    traverseContinueStatement(node:ContinueStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitContinueStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitContinueStatement(node, parent, context);
        }
    }

    traverseDebuggerStatement(node:DebuggerStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitDebuggerStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitDebuggerStatement(node, parent, context);
        }
    }

    traverseDoWhileStatement(node:DoWhileStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitDoWhileStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseStatement(node.body, parent, preVisitor, postVisitor, context);
        this.traverseExpression(node.test, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitDoWhileStatement(node, parent, context);
        }
    }

    traverseEmptyStatement(node:EmptyStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitEmptyStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitEmptyStatement(node, parent, context);
        }
    }

    traverseExpressionStatement(node:ExpressionStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitExpressionStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.expression, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitExpressionStatement(node, parent, context);
        }
    }

    traverseForStatement(node:ForStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitForStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseVariableDeclaration(node.init, parent, preVisitor, postVisitor, context);
        this.traverseExpression(node.test, parent, preVisitor, postVisitor, context);
        this.traverseExpression(node.update, parent, preVisitor, postVisitor, context);

        if (postVisitor) {
            postVisitor.visitForStatement(node, parent, context);
        }
    }

    traverseForInStatement(node:ForInStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitForInStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseVariableDeclaration(node.left, parent, preVisitor, postVisitor, context);
        if (node.right) {
            this.traverseExpression(node.right, parent, preVisitor, postVisitor, context);
        }
        this.traverseStatement(node.body, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitForInStatement(node, parent, context);
        }
    }

    traverseFunctionDeclaration(node:FunctionDeclaration, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitFunctionDeclaration(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseIdentifier(node.id, parent, preVisitor, postVisitor, context);
        for (var elements = node.params, i = 0, ln = elements.length; i < ln; i++) {
            this.traverseIdentifier(elements[i], parent, preVisitor, postVisitor, context);
            if (node.defaults[i]) {
                this.traverseExpression(node.defaults[i], parent, preVisitor, postVisitor, context);
            }
        }
        this.traverseBlockStatement(node.body, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitFunctionDeclaration(node, parent, context);
        }
    }

    traverseFunctionExpression(node:FunctionExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitFunctionExpression(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseIdentifier(node.id, parent, preVisitor, postVisitor, context);
        for (var elements = node.params, i = 0, ln = elements.length; i < ln; i++) {
            this.traverseIdentifier(elements[i], parent, preVisitor, postVisitor, context);
            if (node.defaults[i]) {
                this.traverseExpression(node.defaults[i], parent, preVisitor, postVisitor, context);
            }
        }
        this.traverseBlockStatement(node.body, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitFunctionExpression(node, parent, context);
        }
    }

    traverseIdentifier(node:Identifier, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitIdentifier(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitIdentifier(node, parent, context);
        }
    }

    traverseIfStatement(node:IfStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitIfStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseExpression(node.test, parent, preVisitor, postVisitor, context);
        if (node.consequent) {
            this.traverseStatement(node.consequent, parent, preVisitor, postVisitor, context);
        }
        if (node.alternate) {
            this.traverseStatement(node.alternate, parent, preVisitor, postVisitor, context);
        }
        if (postVisitor) {
            postVisitor.visitIfStatement(node, parent, context);
        }
    }

    traverseLabeledStatement(node:LabeledStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitLabeledStatement(node, parent, context);
            if (false === result) {
                return;
            }
        }
        this.traverseStatement(node.body, parent, preVisitor, postVisitor, context);
        if (postVisitor) {
            postVisitor.visitLabeledStatement(node, parent, context);
        }
    }

    traverseLiteral(node:Literal, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {
        if (preVisitor) {
            var result = preVisitor.visitLiteral(node, parent, context);
            if (false === result) {
                return;
            }
        }
        if (postVisitor) {
            postVisitor.visitLiteral(node, parent, context);
        }
    }

    traverseLogicalExpression(node:BinaryExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseMemberExpression(node:MemberExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseNewExpression(node:NewExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseObjectExpression(node:ObjectExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traversePostfixExpression(node:UpdateExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseProgram(node:Program, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseProperty(node:Property, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseReturnStatement(node:ReturnStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseSequenceExpression(node:SequenceExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseSwitchCase(node:SwitchCase, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseSwitchStatement(node:SwitchStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseThisExpression(node:ThisExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseThrowStatement(node:ThrowStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseTryStatement(node:TryStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseUnaryExpression(node:UnaryExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseUpdateExpression(node:UpdateExpression, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseVariableDeclaration(node:VariableDeclaration, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseVariableDeclarator(node:VariableDeclarator, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseWhileStatement(node:WhileStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}

    traverseWithStatement(node:WithStatement, parent:ASTNode, preVisitor:ASTVisitor, postVisitor:ASTVisitor = null, context?:any = undefined):void {}
}
