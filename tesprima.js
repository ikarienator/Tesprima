var TypedEsprima;
(function (TypedEsprima) {
    (function (TokenType) {
        TokenType._map = [];
        TokenType.BooleanLiteral = 1;
        TokenType.EOF = 2;
        TokenType.Identifier = 3;
        TokenType.Keyword = 4;
        TokenType.NullLiteral = 5;
        TokenType.NumericLiteral = 6;
        TokenType.Punctuator = 7;
        TokenType.StringLiteral = 8;
        TokenType.RegularExpression = 9;
    })(TypedEsprima.TokenType || (TypedEsprima.TokenType = {}));
    var TokenType = TypedEsprima.TokenType;
    TypedEsprima.TokenName = [];
    TypedEsprima.TokenName[TokenType.BooleanLiteral] = 'Boolean';
    TypedEsprima.TokenName[TokenType.EOF] = '<end>';
    TypedEsprima.TokenName[TokenType.Identifier] = 'Identifier';
    TypedEsprima.TokenName[TokenType.Keyword] = 'Keyword';
    TypedEsprima.TokenName[TokenType.NullLiteral] = 'Null';
    TypedEsprima.TokenName[TokenType.NumericLiteral] = 'Numeric';
    TypedEsprima.TokenName[TokenType.Punctuator] = 'Punctuator';
    TypedEsprima.TokenName[TokenType.StringLiteral] = 'String';
    TypedEsprima.TokenName[TokenType.RegularExpression] = 'RegularExpression';
    TypedEsprima.Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };
    (function (PropertyKind) {
        PropertyKind._map = [];
        PropertyKind.Data = 1 << 0;
        PropertyKind.Get = 1 << 1;
        PropertyKind.Set = 1 << 2;
    })(TypedEsprima.PropertyKind || (TypedEsprima.PropertyKind = {}));
    var PropertyKind = TypedEsprima.PropertyKind;
})(TypedEsprima || (TypedEsprima = {}));
var TypedEsprima;
(function (TypedEsprima) {
    var ASTFactory = (function () {
        function ASTFactory() {
            this.name = 'SyntaxTree';
        }
        ASTFactory.prototype.createArrayExpression = function (elements) {
            return {
                "type": TypedEsprima.Syntax.ArrayExpression,
                "elements": elements
            };
        };
        ASTFactory.prototype.createAssignmentExpression = function (operator, left, right) {
            return {
                "type": TypedEsprima.Syntax.AssignmentExpression,
                "operator": operator,
                "left": left,
                "right": right
            };
        };
        ASTFactory.prototype.createBinaryExpression = function (operator, left, right) {
            var type = (operator === '||' || operator === '&&') ? TypedEsprima.Syntax.LogicalExpression : TypedEsprima.Syntax.BinaryExpression;
            return {
                "type": type,
                "operator": operator,
                "left": left,
                "right": right
            };
        };
        ASTFactory.prototype.createBlockStatement = function (body) {
            return {
                "type": TypedEsprima.Syntax.BlockStatement,
                "body": body
            };
        };
        ASTFactory.prototype.createBreakStatement = function (label) {
            if (typeof label === "undefined") { label = null; }
            return {
                "type": TypedEsprima.Syntax.BreakStatement,
                "label": label
            };
        };
        ASTFactory.prototype.createCallExpression = function (callee, args) {
            return {
                "type": TypedEsprima.Syntax.CallExpression,
                "callee": callee,
                "arguments": args
            };
        };
        ASTFactory.prototype.createCatchClause = function (param, body) {
            return {
                "type": TypedEsprima.Syntax.CatchClause,
                "param": param,
                "body": body
            };
        };
        ASTFactory.prototype.createConditionalExpression = function (test, consequent, alternate) {
            return {
                "type": TypedEsprima.Syntax.ConditionalExpression,
                "test": test,
                "consequent": consequent,
                "alternate": alternate
            };
        };
        ASTFactory.prototype.createContinueStatement = function (label) {
            if (typeof label === "undefined") { label = null; }
            return {
                "type": TypedEsprima.Syntax.ContinueStatement,
                "label": label
            };
        };
        ASTFactory.prototype.createDebuggerStatement = function () {
            return {
                "type": TypedEsprima.Syntax.DebuggerStatement
            };
        };
        ASTFactory.prototype.createDoWhileStatement = function (body, test) {
            return {
                "type": TypedEsprima.Syntax.DoWhileStatement,
                "body": body,
                "test": test
            };
        };
        ASTFactory.prototype.createEmptyStatement = function () {
            return {
                "type": TypedEsprima.Syntax.EmptyStatement
            };
        };
        ASTFactory.prototype.createExpressionStatement = function (expression) {
            return {
                "type": TypedEsprima.Syntax.ExpressionStatement,
                "expression": expression
            };
        };
        ASTFactory.prototype.createForStatement = function (init, test, update, body) {
            return {
                "type": TypedEsprima.Syntax.ForStatement,
                "init": init,
                "test": test,
                "update": update,
                "body": body
            };
        };
        ASTFactory.prototype.createForInStatement = function (left, right, body) {
            return {
                "type": TypedEsprima.Syntax.ForInStatement,
                "left": left,
                "right": right,
                "body": body,
                "each": false
            };
        };
        ASTFactory.prototype.createFunctionDeclaration = function (id, params, defaults, body) {
            return {
                "type": TypedEsprima.Syntax.FunctionDeclaration,
                "id": id,
                "params": params,
                "defaults": defaults,
                "body": body,
                "rest": null,
                "generator": false,
                "expression": false
            };
        };
        ASTFactory.prototype.createFunctionExpression = function (id, params, defaults, body) {
            return {
                "type": TypedEsprima.Syntax.FunctionExpression,
                "id": id,
                "params": params,
                "defaults": defaults,
                "body": body,
                "rest": null,
                "generator": false,
                "expression": false
            };
        };
        ASTFactory.prototype.createIdentifier = function (name) {
            return {
                "type": TypedEsprima.Syntax.Identifier,
                "name": name
            };
        };
        ASTFactory.prototype.createIfStatement = function (test, consequent, alternate) {
            return {
                "type": TypedEsprima.Syntax.IfStatement,
                "test": test,
                "consequent": consequent,
                "alternate": alternate
            };
        };
        ASTFactory.prototype.createLabeledStatement = function (label, body) {
            return {
                "type": TypedEsprima.Syntax.LabeledStatement,
                "label": label,
                "body": body
            };
        };
        ASTFactory.prototype.createLiteral = function (value, raw) {
            return {
                "type": TypedEsprima.Syntax.Literal,
                "value": value,
                "raw": raw
            };
        };
        ASTFactory.prototype.createMemberExpressionComputed = function (object, property) {
            return {
                "type": TypedEsprima.Syntax.MemberExpression,
                "computed": true,
                "object": object,
                "property": property
            };
        };
        ASTFactory.prototype.createMemberExpressionNonComputed = function (object, property) {
            return {
                "type": TypedEsprima.Syntax.MemberExpression,
                "computed": false,
                "object": object,
                "property": property
            };
        };
        ASTFactory.prototype.createNewExpression = function (callee, args) {
            return {
                "type": TypedEsprima.Syntax.NewExpression,
                "callee": callee,
                "arguments": args
            };
        };
        ASTFactory.prototype.createObjectExpression = function (properties) {
            return {
                "type": TypedEsprima.Syntax.ObjectExpression,
                "properties": properties
            };
        };
        ASTFactory.prototype.createPostfixExpression = function (operator, argument) {
            return {
                "type": TypedEsprima.Syntax.UpdateExpression,
                "operator": operator,
                "argument": argument,
                "prefix": false
            };
        };
        ASTFactory.prototype.createProgram = function (body) {
            return {
                "type": TypedEsprima.Syntax.Program,
                "body": body
            };
        };
        ASTFactory.prototype.createProperty = function (kind, key, value) {
            return {
                "type": TypedEsprima.Syntax.Property,
                "key": key,
                "value": value,
                "kind": kind
            };
        };
        ASTFactory.prototype.createReturnStatement = function (argument) {
            return {
                "type": TypedEsprima.Syntax.ReturnStatement,
                "argument": argument
            };
        };
        ASTFactory.prototype.createSequenceExpression = function (expressions) {
            return {
                "type": TypedEsprima.Syntax.SequenceExpression,
                "expressions": expressions
            };
        };
        ASTFactory.prototype.createSwitchCase = function (test, consequent) {
            return {
                "type": TypedEsprima.Syntax.SwitchCase,
                "test": test,
                "consequent": consequent
            };
        };
        ASTFactory.prototype.createSwitchStatement = function (discriminant, cases) {
            return {
                "type": TypedEsprima.Syntax.SwitchStatement,
                "discriminant": discriminant,
                "cases": cases
            };
        };
        ASTFactory.prototype.createThisExpression = function () {
            return {
                "type": TypedEsprima.Syntax.ThisExpression
            };
        };
        ASTFactory.prototype.createThrowStatement = function (argument) {
            return {
                "type": TypedEsprima.Syntax.ThrowStatement,
                "argument": argument
            };
        };
        ASTFactory.prototype.createTryStatement = function (block, guardedHandlers, handlers, finalizer) {
            return {
                "type": TypedEsprima.Syntax.TryStatement,
                "block": block,
                "guardedHandlers": guardedHandlers,
                "handlers": handlers,
                "finalizer": finalizer
            };
        };
        ASTFactory.prototype.createUnaryExpression = function (operator, argument) {
            if(operator === '++' || operator === '--') {
                return {
                    "type": TypedEsprima.Syntax.UpdateExpression,
                    "operator": operator,
                    "argument": argument,
                    "prefix": true
                };
            }
            return {
                "type": TypedEsprima.Syntax.UnaryExpression,
                "operator": operator,
                "argument": argument
            };
        };
        ASTFactory.prototype.createVariableDeclaration = function (declarations, kind) {
            return {
                "type": TypedEsprima.Syntax.VariableDeclaration,
                "declarations": declarations,
                "kind": kind
            };
        };
        ASTFactory.prototype.createVariableDeclarator = function (id, init) {
            return {
                "type": TypedEsprima.Syntax.VariableDeclarator,
                "id": id,
                "init": init
            };
        };
        ASTFactory.prototype.createWhileStatement = function (test, body) {
            return {
                "type": TypedEsprima.Syntax.WhileStatement,
                "test": test,
                "body": body
            };
        };
        ASTFactory.prototype.createWithStatement = function (object, body) {
            return {
                "type": TypedEsprima.Syntax.WithStatement,
                "object": object,
                "body": body
            };
        };
        return ASTFactory;
    })();
    TypedEsprima.ASTFactory = ASTFactory;    
})(TypedEsprima || (TypedEsprima = {}));
var TypedEsprima;
(function (TypedEsprima) {
    var FnExprTokens = [
        "(", 
        "{", 
        "[", 
        "in", 
        "typeof", 
        "instanceof", 
        "new", 
        "return", 
        "case", 
        "delete", 
        "throw", 
        "void", 
        "=", 
        "+=", 
        "-=", 
        "*=", 
        "/=", 
        "%=", 
        "<<=", 
        ">>=", 
        ">>>=", 
        "&=", 
        "|=", 
        "^=", 
        ",", 
        "+", 
        "-", 
        "*", 
        "/", 
        "%", 
        "++", 
        "--", 
        "<<", 
        ">>", 
        ">>>", 
        "&", 
        "|", 
        "^", 
        "!", 
        "~", 
        "&&", 
        "||", 
        "?", 
        ":", 
        "===", 
        "==", 
        ">=", 
        "<=", 
        "<", 
        ">", 
        "!=", 
        "!=="
    ];
    var Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
        NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
    };
    var Lexer = (function () {
        function Lexer(source) {
            this.source = source;
            this.index = 0;
            this.lineStart = 0;
            this.lookahead = null;
            this.tokenize = false;
            this.openParenToken = -1;
            this.openCurlyToken = -1;
            this.lineNumber = (this.source.length > 0) ? 1 : 0;
            this.length = this.source.length;
        }
        Lexer.prototype.patch = function () {
            if(this.comments) {
                this['skipComment'] = this.scanComment;
            }
            if(this.tokens) {
                this['advance'] = this.collectToken;
                this['scanRegExp'] = this.collectRegex;
            }
        };
        Lexer.prototype.unpatch = function () {
            delete this['skipComment'];
            delete this['advance'];
            delete this['scanRegExp'];
        };
        Lexer.prototype.createError = function (token, messageFormat, args) {
            var error, msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
                TypedEsprima.assert(index < args.length, 'Message reference must be in range');
                return args[index];
            });
            error = new Error('Line ' + this.lineNumber + ': ' + msg);
            if(token) {
                error.index = token.range[0];
                error.lineNumber = token.lineNumber;
                error.column = token.range[0] - this.lineStart + 1;
            } else {
                error.index = this.index;
                error.lineNumber = this.lineNumber;
                error.column = this.index - this.lineStart + 1;
            }
            error.description = msg;
            return error;
        };
        Lexer.throwErrorArgs = [];
        Lexer.prototype.throwError = function (token, messageFormat, arg0, arg1, arg2) {
            Lexer.throwErrorArgs[0] = arg0;
            Lexer.throwErrorArgs[1] = arg1;
            Lexer.throwErrorArgs[2] = arg2;
            throw this.createError(token, messageFormat, Lexer.throwErrorArgs);
        };
        Lexer.throwErrorTolerantArgs = [];
        Lexer.prototype.throwErrorTolerant = function (token, messageFormat) {
            var error = this.createError(token, messageFormat, Lexer.throwErrorTolerantArgs);
            if(this.errors) {
                try  {
                    throw error;
                } catch (e) {
                    this.errors.push(e);
                }
            } else {
                throw error;
            }
        };
        Lexer.prototype.throwUnexpected = function (token) {
            if(token.type === TypedEsprima.TokenType.EOF) {
                this.throwError(token, TypedEsprima.Messages.UnexpectedEOS);
            }
            if(token.type === TypedEsprima.TokenType.NumericLiteral) {
                this.throwError(token, TypedEsprima.Messages.UnexpectedNumber);
            }
            if(token.type === TypedEsprima.TokenType.StringLiteral) {
                this.throwError(token, TypedEsprima.Messages.UnexpectedString);
            }
            if(token.type === TypedEsprima.TokenType.Identifier) {
                this.throwError(token, TypedEsprima.Messages.UnexpectedIdentifier);
            }
            if(token.type === TypedEsprima.TokenType.Keyword) {
                if(this.isFutureReservedWord(token.value)) {
                    this.throwError(token, TypedEsprima.Messages.UnexpectedReserved);
                } else if(this.strict && this.isStrictModeReservedWord(token.value)) {
                    this.throwErrorTolerant(token, TypedEsprima.Messages.StrictReservedWord);
                    return;
                }
                this.throwError(token, TypedEsprima.Messages.UnexpectedToken, token.value);
            }
            this.throwError(token, TypedEsprima.Messages.UnexpectedToken, token.value);
        };
        Lexer.prototype.getCharCodeRel = function (offset) {
            return this.source.charCodeAt(this.index + offset);
        };
        Lexer.prototype.slice = function (begin, end) {
            return this.source.slice(begin, end);
        };
        Lexer.prototype.isWhiteSpace = function (ch) {
            return (ch === 32) || (ch === 9) || (ch === 0xB) || (ch === 0xC) || (ch === 0xA0) || (ch >= 0x1680 && '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(String.fromCharCode(ch)) > 0);
        };
        Lexer.prototype.isLineTerminator = function (ch) {
            return (ch === 10) || (ch === 13) || (ch === 0x2028) || (ch === 0x2029);
        };
        Lexer.prototype.isIdentifierStart = function (ch) {
            return (ch === 36) || (ch === 95) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || (ch === 92) || ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
        };
        Lexer.prototype.isIdentifierPart = function (ch) {
            return (ch === 36) || (ch === 95) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57) || (ch === 92) || ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
        };
        Lexer.prototype.isFutureReservedWord = function (id) {
            switch(id) {
                case 'class':
                case 'enum':
                case 'export':
                case 'extends':
                case 'import':
                case 'super':
                    return true;
                default:
                    return false;
            }
        };
        Lexer.prototype.isStrictModeReservedWord = function (id) {
            switch(id) {
                case 'implements':
                case 'interface':
                case 'package':
                case 'private':
                case 'protected':
                case 'public':
                case 'static':
                case 'yield':
                case 'let':
                    return true;
                default:
                    return false;
            }
        };
        Lexer.prototype.isRestrictedWord = function (id) {
            return id === 'eval' || id === 'arguments';
        };
        Lexer.prototype.isKeyword = function (id) {
            if(this.strict && this.isStrictModeReservedWord(id)) {
                return true;
            }
            switch(id.length) {
                case 2:
                    return (id === 'if') || (id === 'in') || (id === 'do');
                case 3:
                    return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try') || (id === 'let');
                case 4:
                    return (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with') || (id === 'enum');
                case 5:
                    return (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw') || (id === 'const') || (id === 'yield') || (id === 'class') || (id === 'super');
                case 6:
                    return (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch') || (id === 'export') || (id === 'import');
                case 7:
                    return (id === 'default') || (id === 'finally') || (id === 'extends');
                case 8:
                    return (id === 'function') || (id === 'continue') || (id === 'debugger');
                case 10:
                    return (id === 'instanceof');
                default:
                    return false;
            }
        };
        Lexer.prototype.isDecimalDigit = function (ch) {
            return (ch >= 48 && ch <= 57);
        };
        Lexer.prototype.isHexDigit = function (ch) {
            return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
        };
        Lexer.prototype.isOctalDigit = function (ch) {
            return '01234567'.indexOf(ch) >= 0;
        };
        Lexer.prototype.isLeftHandSide = function (expr) {
            return expr.type === TypedEsprima.Syntax.Identifier || expr.type === TypedEsprima.Syntax.MemberExpression;
        };
        Lexer.prototype.skipComment = function () {
            var ch, blockComment, lineComment;
            blockComment = false;
            lineComment = false;
            while(this.index < this.length) {
                ch = this.source.charCodeAt(this.index);
                if(lineComment) {
                    ++this.index;
                    if(this.isLineTerminator(ch)) {
                        lineComment = false;
                        if(ch === 13 && this.source.charCodeAt(this.index) === 10) {
                            ++this.index;
                        }
                        ++this.lineNumber;
                        this.lineStart = this.index;
                    }
                } else if(blockComment) {
                    if(this.isLineTerminator(ch)) {
                        if(ch === 13 && this.source.charCodeAt(this.index + 1) === 10) {
                            ++this.index;
                        }
                        ++this.lineNumber;
                        ++this.index;
                        this.lineStart = this.index;
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    } else {
                        ch = this.source.charCodeAt(this.index++);
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                        if(ch === 42) {
                            ch = this.source.charCodeAt(this.index);
                            if(ch === 47) {
                                ++this.index;
                                blockComment = false;
                            }
                        }
                    }
                } else if(ch === 47) {
                    ch = this.source.charCodeAt(this.index + 1);
                    if(ch === 47) {
                        this.index += 2;
                        lineComment = true;
                    } else if(ch === 42) {
                        this.index += 2;
                        blockComment = true;
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    } else {
                        break;
                    }
                } else if(this.isWhiteSpace(ch)) {
                    ++this.index;
                } else if(this.isLineTerminator(ch)) {
                    ++this.index;
                    if(ch === 13 && this.source.charCodeAt(this.index) === 10) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                } else {
                    break;
                }
            }
        };
        Lexer.prototype.consumeSemicolon = function () {
            var line;
            if(this.source.charCodeAt(this.index) === 59) {
                this.lex();
                return;
            }
            line = this.lineNumber;
            this.skipComment();
            if(this.lineNumber !== line) {
                return;
            }
            if(this.match(';')) {
                this.lex();
                return;
            }
            if(this.lookahead.type !== TypedEsprima.TokenType.EOF && !this.match('}')) {
                this.throwUnexpected(this.lookahead);
            }
        };
        Lexer.prototype.addComment = function (type, value, start, end, loc) {
            TypedEsprima.assert(typeof start === 'number', 'Comment must have valid position');
            if(this.comments.length > 0) {
                if(this.comments[this.comments.length - 1].range[1] > start) {
                    return;
                }
            }
            this.comments.push({
                type: type,
                value: value,
                range: [
                    start, 
                    end
                ],
                loc: loc
            });
        };
        Lexer.prototype.scanComment = function () {
            var comment, ch, start, blockComment, lineComment;
            comment = '';
            blockComment = false;
            lineComment = false;
            var startLine = 0;
            var startColumn = 0;
            while(this.index < this.length) {
                ch = this.source[this.index];
                if(lineComment) {
                    ch = this.source[this.index++];
                    if(this.isLineTerminator(ch.charCodeAt(0))) {
                        lineComment = false;
                        this.addComment('Line', comment, start, this.index - 1, {
                            start: {
                                line: startLine,
                                column: startColumn
                            },
                            end: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart - 1
                            }
                        });
                        if(ch === '\r' && this.source[this.index] === '\n') {
                            ++this.index;
                        }
                        ++this.lineNumber;
                        this.lineStart = this.index;
                        comment = '';
                    } else if(this.index >= this.length) {
                        lineComment = false;
                        comment += ch;
                        this.addComment('Line', comment, start, this.length, {
                            start: {
                                line: startLine,
                                column: startColumn
                            },
                            end: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart
                            }
                        });
                    } else {
                        comment += ch;
                    }
                } else if(blockComment) {
                    if(this.isLineTerminator(ch.charCodeAt(0))) {
                        if(ch === '\r' && this.source[this.index + 1] === '\n') {
                            ++this.index;
                            comment += '\r\n';
                        } else {
                            comment += ch;
                        }
                        ++this.lineNumber;
                        ++this.index;
                        this.lineStart = this.index;
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    } else {
                        ch = this.source[this.index++];
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                        comment += ch;
                        if(ch === '*') {
                            ch = this.source[this.index];
                            if(ch === '/') {
                                comment = comment.substr(0, comment.length - 1);
                                blockComment = false;
                                ++this.index;
                                this.addComment('Block', comment, start, this.index, {
                                    start: {
                                        line: startLine,
                                        column: startColumn
                                    },
                                    end: {
                                        line: this.lineNumber,
                                        column: this.index - this.lineStart
                                    }
                                });
                                comment = '';
                            }
                        }
                    }
                } else if(ch === '/') {
                    ch = this.source[this.index + 1];
                    if(ch === '/') {
                        startLine = this.lineNumber;
                        startColumn = this.index - this.lineStart;
                        start = this.index;
                        this.index += 2;
                        lineComment = true;
                        if(this.index >= this.length) {
                            lineComment = false;
                            this.addComment('Line', comment, start, this.index, {
                                start: {
                                    line: startLine,
                                    column: startColumn
                                },
                                end: {
                                    line: this.lineNumber,
                                    column: this.index - this.lineStart
                                }
                            });
                        }
                    } else if(ch === '*') {
                        start = this.index;
                        this.index += 2;
                        blockComment = true;
                        startLine = this.lineNumber;
                        startColumn = this.index - this.lineStart - 2;
                        if(this.index >= this.length) {
                            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    } else {
                        break;
                    }
                } else if(this.isWhiteSpace(ch.charCodeAt(0))) {
                    ++this.index;
                } else if(this.isLineTerminator(ch.charCodeAt(0))) {
                    ++this.index;
                    if(ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                } else {
                    break;
                }
            }
        };
        Lexer.prototype.filterCommentLocation = function () {
            var i, entry, comment, comments = [];
            for(i = 0; i < this.comments.length; ++i) {
                entry = this.comments[i];
                comment = {
                    type: entry.type,
                    value: entry.value
                };
                if(this.includeRange) {
                    comment.range = entry.range;
                }
                if(this.includeLocation) {
                    comment.loc = entry.loc;
                }
                comments.push(comment);
            }
            this.comments = comments;
        };
        Lexer.prototype.collectToken = function () {
            var token, range, value;
            this.skipComment();
            var startLine = this.lineNumber;
            var startColumn = this.index - this.lineStart;
            token = this['constructor'].prototype.advance.call(this);
            if(token.type !== TypedEsprima.TokenType.EOF) {
                range = [
                    token.range[0], 
                    token.range[1]
                ];
                value = this.source.slice(token.range[0], token.range[1]);
                this.tokens.push({
                    type: TypedEsprima.TokenName[token.type],
                    value: value,
                    range: range,
                    loc: {
                        start: {
                            line: startLine,
                            column: startColumn
                        },
                        end: {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        }
                    }
                });
            }
            return token;
        };
        Lexer.prototype.collectRegex = function () {
            var pos, loc, regex;
            this.skipComment();
            pos = this.index;
            loc = {
                start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                }
            };
            regex = Lexer.prototype.scanRegExp.call(this);
            loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
            };
            if(!this.tokenize) {
                if(this.tokens.length > 0) {
                    var token = this.tokens[this.tokens.length - 1];
                    if(token.range[0] === pos && token.type === 'Punctuator') {
                        if(token.value === '/' || token.value === '/=') {
                            this.tokens.pop();
                        }
                    }
                }
                this.tokens.push({
                    type: 'RegularExpression',
                    value: regex.literal,
                    range: [
                        pos, 
                        this.index
                    ],
                    loc: loc
                });
            }
            return regex;
        };
        Lexer.prototype.filterTokenLocation = function () {
            var i, entry, token, tokens = [];
            for(i = 0; i < this.tokens.length; ++i) {
                entry = this.tokens[i];
                token = {
                    type: entry.type,
                    value: entry.value
                };
                if(this.includeRange) {
                    token.range = entry.range;
                }
                if(this.includeLocation) {
                    token.loc = entry.loc;
                }
                tokens.push(token);
            }
            this.tokens = tokens;
        };
        Lexer.prototype.scanHexEscape = function (prefix) {
            var i, len, ch, code = 0;
            len = (prefix === 'u') ? 4 : 2;
            for(i = 0; i < len; ++i) {
                if(this.index < this.length && this.isHexDigit(this.source[this.index])) {
                    ch = this.source[this.index++];
                    code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
                } else {
                    return '';
                }
            }
            return String.fromCharCode(code);
        };
        Lexer.prototype.getEscapedIdentifier = function () {
            var ch, id;
            ch = this.source.charCodeAt(this.index++);
            id = String.fromCharCode(ch);
            if(ch === 92) {
                if(this.source.charCodeAt(this.index) !== 117) {
                    this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++this.index;
                ch = this.scanHexEscape('u');
                if(!ch || ch === '\\' || !this.isIdentifierStart(ch.charCodeAt(0))) {
                    this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                }
                id = ch;
            }
            while(this.index < this.length) {
                ch = this.source.charCodeAt(this.index);
                if(!this.isIdentifierPart(ch)) {
                    break;
                }
                ++this.index;
                id += String.fromCharCode(ch);
                if(ch === 92) {
                    id = id.substr(0, id.length - 1);
                    if(this.source.charCodeAt(this.index) !== 117) {
                        this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    ++this.index;
                    ch = this.scanHexEscape('u');
                    if(!ch || ch === '\\' || !this.isIdentifierPart(ch.charCodeAt(0))) {
                        this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    id += ch;
                }
            }
            return id;
        };
        Lexer.prototype.getIdentifier = function () {
            var start, ch;
            start = this.index++;
            while(this.index < this.length) {
                ch = this.source.charCodeAt(this.index);
                if(ch === 92) {
                    this.index = start;
                    return this.getEscapedIdentifier();
                }
                if(this.isIdentifierPart(ch)) {
                    ++this.index;
                } else {
                    break;
                }
            }
            return this.source.slice(start, this.index);
        };
        Lexer.prototype.scanIdentifier = function () {
            var start, id, type;
            start = this.index;
            id = (this.source.charCodeAt(this.index) === 92) ? this.getEscapedIdentifier() : this.getIdentifier();
            if(id.length === 1) {
                type = TypedEsprima.TokenType.Identifier;
            } else if(this.isKeyword(id)) {
                type = TypedEsprima.TokenType.Keyword;
            } else if(id === 'null') {
                type = TypedEsprima.TokenType.NullLiteral;
            } else if(id === 'true' || id === 'false') {
                type = TypedEsprima.TokenType.BooleanLiteral;
            } else {
                type = TypedEsprima.TokenType.Identifier;
            }
            return {
                type: type,
                value: id,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.scanPunctuator = function () {
            var start = this.index, code = this.source.charCodeAt(this.index), code2, ch1 = this.source[this.index], ch2, ch3, ch4;
            switch(code) {
                case 46:
                case 40:
                case 41:
                case 59:
                case 44:
                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 63:
                case 126:
                    ++this.index;
                    if(this.tokenize) {
                        if(code === 40) {
                            this.openParenToken = this.tokens.length;
                        } else if(code === 123) {
                            this.openCurlyToken = this.tokens.length;
                        }
                    }
                    return {
                        type: TypedEsprima.TokenType.Punctuator,
                        value: String.fromCharCode(code),
                        lineNumber: this.lineNumber,
                        lineStart: this.lineStart,
                        range: [
                            start, 
                            this.index
                        ]
                    };
                default:
                    code2 = this.source.charCodeAt(this.index + 1);
                    if(code2 === 61) {
                        switch(code) {
                            case 37:
                            case 38:
                            case 42:
                            case 43:
                            case 45:
                            case 47:
                            case 60:
                            case 62:
                            case 94:
                            case 124:
                                this.index += 2;
                                return {
                                    type: TypedEsprima.TokenType.Punctuator,
                                    value: String.fromCharCode(code) + String.fromCharCode(code2),
                                    lineNumber: this.lineNumber,
                                    lineStart: this.lineStart,
                                    range: [
                                        start, 
                                        this.index
                                    ]
                                };
                            case 33:
                            case 61:
                                this.index += 2;
                                if(this.source.charCodeAt(this.index) === 61) {
                                    ++this.index;
                                }
                                return {
                                    type: TypedEsprima.TokenType.Punctuator,
                                    value: this.source.slice(start, this.index),
                                    lineNumber: this.lineNumber,
                                    lineStart: this.lineStart,
                                    range: [
                                        start, 
                                        this.index
                                    ]
                                };
                            default:
                                break;
                        }
                    }
                    break;
            }
            ch2 = this.source[this.index + 1];
            ch3 = this.source[this.index + 2];
            ch4 = this.source[this.index + 3];
            if(ch1 === '>' && ch2 === '>' && ch3 === '>') {
                if(ch4 === '=') {
                    this.index += 4;
                    return {
                        type: TypedEsprima.TokenType.Punctuator,
                        value: '>>>=',
                        lineNumber: this.lineNumber,
                        lineStart: this.lineStart,
                        range: [
                            start, 
                            this.index
                        ]
                    };
                }
            }
            if(ch1 === '>' && ch2 === '>' && ch3 === '>') {
                this.index += 3;
                return {
                    type: TypedEsprima.TokenType.Punctuator,
                    value: '>>>',
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            if(ch1 === '<' && ch2 === '<' && ch3 === '=') {
                this.index += 3;
                return {
                    type: TypedEsprima.TokenType.Punctuator,
                    value: '<<=',
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            if(ch1 === '>' && ch2 === '>' && ch3 === '=') {
                this.index += 3;
                return {
                    type: TypedEsprima.TokenType.Punctuator,
                    value: '>>=',
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            if(ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
                this.index += 2;
                return {
                    type: TypedEsprima.TokenType.Punctuator,
                    value: ch1 + ch2,
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            if('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
                ++this.index;
                return {
                    type: TypedEsprima.TokenType.Punctuator,
                    value: ch1,
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
        };
        Lexer.prototype.scanHexLiteral = function (start) {
            var number = '';
            while(this.index < this.length) {
                if(!this.isHexDigit(this.source[this.index])) {
                    break;
                }
                number += this.source[this.index++];
            }
            if(number.length === 0) {
                this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
            }
            if(this.isIdentifierStart(this.source.charCodeAt(this.index))) {
                this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
                type: TypedEsprima.TokenType.NumericLiteral,
                value: parseInt('0x' + number, 16),
                octal: false,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.scanOctalLiteral = function (start) {
            var number = '0' + this.source[this.index++];
            while(this.index < this.length) {
                if(!this.isOctalDigit(this.source[this.index])) {
                    break;
                }
                number += this.source[this.index++];
            }
            if(this.isIdentifierStart(this.source.charCodeAt(this.index)) || this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
                type: TypedEsprima.TokenType.NumericLiteral,
                value: parseInt(number, 8),
                octal: true,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.scanNumericLiteral = function () {
            var number, start, ch;
            ch = this.source[this.index];
            TypedEsprima.assert(this.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
            start = this.index;
            number = '';
            if(ch !== '.') {
                number = this.source[this.index++];
                ch = this.source[this.index];
                if(number === '0') {
                    if(ch === 'x' || ch === 'X') {
                        ++this.index;
                        return this.scanHexLiteral(start);
                    }
                    if(this.isOctalDigit(ch)) {
                        return this.scanOctalLiteral(start);
                    }
                    if(ch && this.isDecimalDigit(ch.charCodeAt(0))) {
                        this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                    }
                }
                while(this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    number += this.source[this.index++];
                }
                ch = this.source[this.index];
            }
            if(ch === '.') {
                number += this.source[this.index++];
                while(this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    number += this.source[this.index++];
                }
                ch = this.source[this.index];
            }
            if(ch === 'e' || ch === 'E') {
                number += this.source[this.index++];
                ch = this.source[this.index];
                if(ch === '+' || ch === '-') {
                    number += this.source[this.index++];
                }
                if(this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    while(this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                        number += this.source[this.index++];
                    }
                } else {
                    this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
                }
            }
            if(this.isIdentifierStart(this.source.charCodeAt(this.index))) {
                this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
                type: TypedEsprima.TokenType.NumericLiteral,
                value: parseFloat(number),
                octal: false,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.scanStringLiteral = function () {
            var str = '', ch, code, unescaped, restore, octal = false;
            var quote = this.source[this.index];
            TypedEsprima.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
            var start = this.index;
            ++this.index;
            while(this.index < this.length) {
                var ch = this.source[this.index++];
                if(ch === quote) {
                    quote = '';
                    break;
                } else if(ch === '\\') {
                    ch = this.source[this.index++];
                    if(!ch || !this.isLineTerminator(ch.charCodeAt(0))) {
                        switch(ch) {
                            case 'n':
                                str += '\n';
                                break;
                            case 'r':
                                str += '\r';
                                break;
                            case 't':
                                str += '\t';
                                break;
                            case 'u':
                            case 'x':
                                restore = this.index;
                                unescaped = this.scanHexEscape(ch);
                                if(unescaped) {
                                    str += unescaped;
                                } else {
                                    this.index = restore;
                                    str += ch;
                                }
                                break;
                            case 'b':
                                str += '\b';
                                break;
                            case 'f':
                                str += '\f';
                                break;
                            case 'v':
                                str += '\x0B';
                                break;
                            default:
                                if(this.isOctalDigit(ch)) {
                                    code = '01234567'.indexOf(ch);
                                    if(code !== 0) {
                                        octal = true;
                                    }
                                    if(this.index < this.length && this.isOctalDigit(this.source[this.index])) {
                                        octal = true;
                                        code = code * 8 + '01234567'.indexOf(this.source[this.index++]);
                                        if('0123'.indexOf(ch) >= 0 && this.index < this.length && this.isOctalDigit(this.source[this.index])) {
                                            code = code * 8 + '01234567'.indexOf(this.source[this.index++]);
                                        }
                                    }
                                    str += String.fromCharCode(code);
                                } else {
                                    str += ch;
                                }
                                break;
                        }
                    } else {
                        ++this.lineNumber;
                        if(ch === '\r' && this.source[this.index] === '\n') {
                            ++this.index;
                        }
                    }
                } else if(this.isLineTerminator(ch.charCodeAt(0))) {
                    break;
                } else {
                    str += ch;
                }
            }
            if(quote !== '') {
                this.throwError(null, TypedEsprima.Messages.UnexpectedToken, 'ILLEGAL');
            }
            return {
                type: TypedEsprima.TokenType.StringLiteral,
                value: str,
                octal: octal,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.scanRegExp = function () {
            var str, ch, start, pattern, flags, value, classMarker = false, restore, terminated = false;
            this.lookahead = null;
            this.skipComment();
            start = this.index;
            ch = this.source[this.index];
            TypedEsprima.assert(ch === '/', 'Regular expression literal must start with a slash');
            str = this.source[this.index++];
            while(this.index < this.length) {
                ch = this.source[this.index++];
                str += ch;
                if(classMarker) {
                    if(ch === ']') {
                        classMarker = false;
                    }
                } else {
                    if(ch === '\\') {
                        ch = this.source[this.index++];
                        if(this.isLineTerminator(ch.charCodeAt(0))) {
                            this.throwError(null, TypedEsprima.Messages.UnterminatedRegExp);
                        }
                        str += ch;
                    } else if(ch === '/') {
                        terminated = true;
                        break;
                    } else if(ch === '[') {
                        classMarker = true;
                    } else if(this.isLineTerminator(ch.charCodeAt(0))) {
                        this.throwError(null, TypedEsprima.Messages.UnterminatedRegExp);
                    }
                }
            }
            if(!terminated) {
                this.throwError(null, TypedEsprima.Messages.UnterminatedRegExp);
            }
            pattern = str.substr(1, str.length - 2);
            flags = '';
            while(this.index < this.length) {
                ch = this.source[this.index];
                if(!this.isIdentifierPart(ch.charCodeAt(0))) {
                    break;
                }
                ++this.index;
                if(ch === '\\' && this.index < this.length) {
                    ch = this.source[this.index];
                    if(ch === 'u') {
                        ++this.index;
                        restore = this.index;
                        ch = this.scanHexEscape('u');
                        if(ch) {
                            flags += ch;
                            for(str += '\\u'; restore < this.index; ++restore) {
                                str += this.source[restore];
                            }
                        } else {
                            this.index = restore;
                            flags += 'u';
                            str += '\\u';
                        }
                    } else {
                        str += '\\';
                    }
                } else {
                    flags += ch;
                    str += ch;
                }
            }
            try  {
                value = new RegExp(pattern, flags);
            } catch (e) {
                this.throwError(null, TypedEsprima.Messages.InvalidRegExp);
            }
            this.peek();
            if(this.tokenize) {
                return {
                    type: TypedEsprima.TokenType.RegularExpression,
                    value: value,
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        start, 
                        this.index
                    ]
                };
            }
            return {
                type: TypedEsprima.TokenType.RegularExpression,
                literal: str,
                value: value,
                range: [
                    start, 
                    this.index
                ]
            };
        };
        Lexer.prototype.isIdentifierName = function (token) {
            return token.type === TypedEsprima.TokenType.Identifier || token.type === TypedEsprima.TokenType.Keyword || token.type === TypedEsprima.TokenType.BooleanLiteral || token.type === TypedEsprima.TokenType.NullLiteral;
        };
        Lexer.prototype.advanceSlash = function () {
            var prevToken, checkToken;
            prevToken = this.tokens[this.tokens.length - 1];
            if(!prevToken) {
                return this.scanRegExp();
            }
            if(prevToken.type === "Punctuator") {
                if(prevToken.value === ")") {
                    checkToken = this.tokens[this.openParenToken - 1];
                    if(checkToken && checkToken.type === "Keyword" && (checkToken.value === "if" || checkToken.value === "while" || checkToken.value === "for" || checkToken.value === "with")) {
                        return this.scanRegExp();
                    }
                    return this.scanPunctuator();
                }
                if(prevToken.value === "}") {
                    if(this.tokens[this.openCurlyToken - 3] && this.tokens[this.openCurlyToken - 3].type === "Keyword") {
                        checkToken = this.tokens[this.openCurlyToken - 4];
                        if(!checkToken) {
                            return this.scanPunctuator();
                        }
                    } else if(this.tokens[this.openCurlyToken - 4] && this.tokens[this.openCurlyToken - 4].type === "Keyword") {
                        checkToken = this.tokens[this.openCurlyToken - 5];
                        if(!checkToken) {
                            return this.scanRegExp();
                        }
                    } else {
                        return this.scanPunctuator();
                    }
                    if(FnExprTokens.indexOf(checkToken.value) >= 0) {
                        return this.scanPunctuator();
                    }
                    return this.scanRegExp();
                }
                return this.scanRegExp();
            }
            if(prevToken.type === "Keyword") {
                return this.scanRegExp();
            }
            return this.scanPunctuator();
        };
        Lexer.prototype.advance = function () {
            var ch;
            this.skipComment();
            if(this.index >= this.length) {
                return {
                    type: TypedEsprima.TokenType.EOF,
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [
                        this.index, 
                        this.index
                    ]
                };
            }
            ch = this.source.charCodeAt(this.index);
            if(ch === 40 || ch === 41 || ch === 58) {
                return this.scanPunctuator();
            }
            if(ch === 39 || ch === 34) {
                return this.scanStringLiteral();
            }
            if(this.isIdentifierStart(ch)) {
                return this.scanIdentifier();
            }
            if(ch === 46) {
                if(this.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                    return this.scanNumericLiteral();
                }
                return this.scanPunctuator();
            }
            if(this.isDecimalDigit(ch)) {
                return this.scanNumericLiteral();
            }
            if(this.tokenize && ch === 47) {
                return this.advanceSlash();
            }
            return this.scanPunctuator();
        };
        Lexer.prototype.lex = function () {
            var token;
            token = this.lookahead;
            this.index = token.range[1];
            this.lineNumber = token.lineNumber;
            this.lineStart = token.lineStart;
            this.lookahead = this.advance();
            this.index = token.range[1];
            this.lineNumber = token.lineNumber;
            this.lineStart = token.lineStart;
            return token;
        };
        Lexer.prototype.peek = function () {
            var pos, line, start;
            pos = this.index;
            line = this.lineNumber;
            start = this.lineStart;
            this.lookahead = this.advance();
            this.index = pos;
            this.lineNumber = line;
            this.lineStart = start;
        };
        Lexer.prototype.peekLineTerminator = function () {
            var pos, line, start, found;
            pos = this.index;
            line = this.lineNumber;
            start = this.lineStart;
            this.skipComment();
            found = this.lineNumber !== line;
            this.index = pos;
            this.lineNumber = line;
            this.lineStart = start;
            return found;
        };
        Lexer.prototype.expect = function (value) {
            var token = this.lex();
            if(token.type !== TypedEsprima.TokenType.Punctuator || token.value !== value) {
                this.throwUnexpected(token);
            }
        };
        Lexer.prototype.expectKeyword = function (keyword) {
            var token = this.lex();
            if(token.type !== TypedEsprima.TokenType.Keyword || token.value !== keyword) {
                this.throwUnexpected(token);
            }
        };
        Lexer.prototype.match = function (value) {
            return this.lookahead.type === TypedEsprima.TokenType.Punctuator && this.lookahead.value === value;
        };
        Lexer.prototype.matchKeyword = function (keyword) {
            return this.lookahead.type === TypedEsprima.TokenType.Keyword && this.lookahead.value === keyword;
        };
        Lexer.prototype.matchAssign = function () {
            var op;
            if(this.lookahead.type !== TypedEsprima.TokenType.Punctuator) {
                return false;
            }
            op = this.lookahead.value;
            return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
        };
        return Lexer;
    })();
    TypedEsprima.Lexer = Lexer;    
})(TypedEsprima || (TypedEsprima = {}));
var TypedEsprima;
(function (TypedEsprima) {
    var Parser = (function () {
        function Parser(lexer, factory) {
            this.lexer = lexer;
            this.factory = factory;
            this.allowIn = true;
            this.labelSet = {
            };
            this.inFunctionBody = false;
            this.inIteration = false;
            this.inSwitch = false;
            this.postProcess = function (node) {
                return node;
            };
        }
        Parser.PatchingMethods = [
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
        Parser.prototype.createLiteral = function (token) {
            return this.factory.createLiteral(token.value, this.lexer.slice(token.range[0], token.range[1]));
        };
        Parser.prototype.parseArrayInitialiser = function () {
            var elements = [];
            this.lexer.expect('[');
            while(!this.lexer.match(']')) {
                if(this.lexer.match(',')) {
                    this.lexer.lex();
                    elements.push(null);
                } else {
                    elements.push(this.parseAssignmentExpression());
                    if(!this.lexer.match(']')) {
                        this.lexer.expect(',');
                    }
                }
            }
            this.lexer.expect(']');
            return this.factory.createArrayExpression(elements);
        };
        Parser.prototype.parsePropertyFunction = function (param, first) {
            var previousStrict, body;
            previousStrict = this.lexer.strict;
            body = this.parseFunctionSourceElements();
            if(first !== null && this.lexer.strict && this.lexer.isRestrictedWord(param[0].name)) {
                this.lexer.throwErrorTolerant(first, TypedEsprima.Messages.StrictParamName);
            }
            this.lexer.strict = previousStrict;
            return this.factory.createFunctionExpression(null, param, [], body);
        };
        Parser.prototype.parseObjectPropertyKey = function () {
            var token = this.lexer.lex();
            if(token.type === TypedEsprima.TokenType.StringLiteral || token.type === TypedEsprima.TokenType.NumericLiteral) {
                if(this.lexer.strict && token['octal']) {
                    this.lexer.throwErrorTolerant(token, TypedEsprima.Messages.StrictOctalLiteral);
                }
                return this.createLiteral(token);
            }
            return this.factory.createIdentifier(token.value);
        };
        Parser.prototype.parseObjectProperty = function () {
            var token, key, id, value, param;
            token = this.lexer.lookahead;
            if(token.type === TypedEsprima.TokenType.Identifier) {
                id = this.parseObjectPropertyKey();
                if(token.value === 'get' && !this.lexer.match(':')) {
                    key = this.parseObjectPropertyKey();
                    this.lexer.expect('(');
                    this.lexer.expect(')');
                    value = this.parsePropertyFunction([], null);
                    return this.factory.createProperty('get', key, value);
                }
                if(token.value === 'set' && !this.lexer.match(':')) {
                    key = this.parseObjectPropertyKey();
                    this.lexer.expect('(');
                    token = this.lexer.lookahead;
                    if(token.type !== TypedEsprima.TokenType.Identifier) {
                        this.lexer.throwUnexpected(this.lexer.lex());
                    }
                    param = [
                        this.parseVariableIdentifier()
                    ];
                    this.lexer.expect(')');
                    value = this.parsePropertyFunction(param, token);
                    return this.factory.createProperty('set', key, value);
                }
                this.lexer.expect(':');
                value = this.parseAssignmentExpression();
                return this.factory.createProperty('init', id, value);
            }
            if(token.type === TypedEsprima.TokenType.EOF || token.type === TypedEsprima.TokenType.Punctuator) {
                this.lexer.throwUnexpected(token);
                return null;
            } else {
                key = this.parseObjectPropertyKey();
                this.lexer.expect(':');
                value = this.parseAssignmentExpression();
                return this.factory.createProperty('init', key, value);
            }
        };
        Parser.prototype.parseObjectInitialiser = function () {
            var properties = [], property, name, key, kind, map = {
            }, toString = String;
            this.lexer.expect('{');
            while(!this.lexer.match('}')) {
                property = this.parseObjectProperty();
                if(property === null) {
                    continue;
                }
                if(property.key.type === TypedEsprima.Syntax.Identifier) {
                    name = (property.key).name;
                } else {
                    name = toString((property.key).value);
                }
                kind = (property.kind === 'init') ? TypedEsprima.PropertyKind.Data : (property.kind === 'get') ? TypedEsprima.PropertyKind.Get : TypedEsprima.PropertyKind.Set;
                key = '$' + name;
                if(Object.prototype.hasOwnProperty.call(map, key)) {
                    if(map[key] === TypedEsprima.PropertyKind.Data) {
                        if(this.lexer.strict && kind === TypedEsprima.PropertyKind.Data) {
                            this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictDuplicateProperty);
                        } else if(kind !== TypedEsprima.PropertyKind.Data) {
                            this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.AccessorDataProperty);
                        }
                    } else {
                        if(kind === TypedEsprima.PropertyKind.Data) {
                            this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.AccessorDataProperty);
                        } else if(map[key] & kind) {
                            this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.AccessorGetSet);
                        }
                    }
                    map[key] |= kind;
                } else {
                    map[key] = kind;
                }
                properties.push(property);
                if(!this.lexer.match('}')) {
                    this.lexer.expect(',');
                }
            }
            this.lexer.expect('}');
            return this.factory.createObjectExpression(properties);
        };
        Parser.prototype.parseGroupExpression = function () {
            var expr;
            this.lexer.expect('(');
            expr = this.parseExpression();
            this.lexer.expect(')');
            return expr;
        };
        Parser.prototype.parsePrimaryExpression = function () {
            var type, token;
            var lookahead = this.lexer.lookahead;
            type = lookahead.type;
            if(type === TypedEsprima.TokenType.Identifier) {
                return this.factory.createIdentifier(this.lexer.lex().value);
            }
            if(type === TypedEsprima.TokenType.StringLiteral || type === TypedEsprima.TokenType.NumericLiteral) {
                if(this.lexer.strict && lookahead['octal']) {
                    this.lexer.throwErrorTolerant(this.lexer.lookahead, TypedEsprima.Messages.StrictOctalLiteral);
                }
                return this.createLiteral(this.lexer.lex());
            }
            if(type === TypedEsprima.TokenType.Keyword) {
                if(this.lexer.matchKeyword('this')) {
                    this.lexer.lex();
                    return this.factory.createThisExpression();
                }
                if(this.lexer.matchKeyword('function')) {
                    return this.parseFunctionExpression();
                }
            }
            if(type === TypedEsprima.TokenType.BooleanLiteral) {
                token = this.lexer.lex();
                token.value = (token.value === 'true');
                return this.createLiteral(token);
            }
            if(type === TypedEsprima.TokenType.NullLiteral) {
                token = this.lexer.lex();
                token.value = null;
                return this.createLiteral(token);
            }
            if(this.lexer.match('[')) {
                return this.parseArrayInitialiser();
            }
            if(this.lexer.match('{')) {
                return this.parseObjectInitialiser();
            }
            if(this.lexer.match('(')) {
                return this.parseGroupExpression();
            }
            if(this.lexer.match('/') || this.lexer.match('/=')) {
                return this.createLiteral(this.lexer.scanRegExp());
            }
            return this.lexer.throwUnexpected(this.lexer.lex());
        };
        Parser.prototype.parseArguments = function () {
            var args = [];
            this.lexer.expect('(');
            if(!this.lexer.match(')')) {
                while(this.lexer.index < this.lexer.length) {
                    args.push(this.parseAssignmentExpression());
                    if(this.lexer.match(')')) {
                        break;
                    }
                    this.lexer.expect(',');
                }
            }
            this.lexer.expect(')');
            return args;
        };
        Parser.prototype.parseNonComputedProperty = function () {
            var token = this.lexer.lex();
            if(!this.lexer.isIdentifierName(token)) {
                this.lexer.throwUnexpected(token);
            }
            return this.factory.createIdentifier(token.value);
        };
        Parser.prototype.parseNonComputedMember = function () {
            this.lexer.expect('.');
            return this.parseNonComputedProperty();
        };
        Parser.prototype.parseComputedMember = function () {
            var expr;
            this.lexer.expect('[');
            expr = this.parseExpression();
            this.lexer.expect(']');
            return expr;
        };
        Parser.prototype.parseNewExpression = function () {
            var callee, args;
            this.lexer.expectKeyword('new');
            callee = this.parseLeftHandSideExpression();
            args = this.lexer.match('(') ? this.parseArguments() : [];
            return this.factory.createNewExpression(callee, args);
        };
        Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
            var expr, args, property;
            expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
            while(this.lexer.match('.') || this.lexer.match('[') || this.lexer.match('(')) {
                if(this.lexer.match('(')) {
                    args = this.parseArguments();
                    expr = this.factory.createCallExpression(expr, args);
                } else if(this.lexer.match('[')) {
                    property = this.parseComputedMember();
                    expr = this.factory.createMemberExpressionComputed(expr, property);
                } else {
                    property = this.parseNonComputedMember();
                    expr = this.factory.createMemberExpressionNonComputed(expr, property);
                }
            }
            return expr;
        };
        Parser.prototype.parseLeftHandSideExpression = function () {
            var expr, property;
            expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
            while(this.lexer.match('.') || this.lexer.match('[')) {
                if(this.lexer.match('[')) {
                    property = this.parseComputedMember();
                    expr = this.factory.createMemberExpressionComputed(expr, property);
                } else {
                    property = this.parseNonComputedMember();
                    expr = this.factory.createMemberExpressionNonComputed(expr, property);
                }
            }
            return expr;
        };
        Parser.prototype.parsePostfixExpression = function () {
            var expr = this.parseLeftHandSideExpressionAllowCall(), token;
            if(this.lexer.lookahead.type !== TypedEsprima.TokenType.Punctuator) {
                return expr;
            }
            if((this.lexer.match('++') || this.lexer.match('--')) && !this.lexer.peekLineTerminator()) {
                if(this.lexer.strict && expr.type === TypedEsprima.Syntax.Identifier && this.lexer.isRestrictedWord(expr.name)) {
                    this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictLHSPostfix);
                }
                if(!this.lexer.isLeftHandSide(expr)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.InvalidLHSInAssignment);
                }
                token = this.lexer.lex();
                expr = this.factory.createPostfixExpression(token.value, expr);
            }
            return expr;
        };
        Parser.prototype.parseUnaryExpression = function () {
            var token, expr;
            if(this.lexer.lookahead.type !== TypedEsprima.TokenType.Punctuator && this.lexer.lookahead.type !== TypedEsprima.TokenType.Keyword) {
                return this.parsePostfixExpression();
            }
            if(this.lexer.match('++') || this.lexer.match('--')) {
                token = this.lexer.lex();
                expr = this.parseUnaryExpression();
                if(this.lexer.strict && expr.type === TypedEsprima.Syntax.Identifier && this.lexer.isRestrictedWord(expr.name)) {
                    this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictLHSPrefix);
                }
                if(!this.lexer.isLeftHandSide(expr)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.InvalidLHSInAssignment);
                }
                return this.factory.createUnaryExpression(token.value, expr);
            }
            if(this.lexer.match('+') || this.lexer.match('-') || this.lexer.match('~') || this.lexer.match('!')) {
                token = this.lexer.lex();
                expr = this.parseUnaryExpression();
                return this.factory.createUnaryExpression(token.value, expr);
            }
            if(this.lexer.matchKeyword('delete') || this.lexer.matchKeyword('void') || this.lexer.matchKeyword('typeof')) {
                token = this.lexer.lex();
                expr = this.parseUnaryExpression();
                expr = this.factory.createUnaryExpression(token.value, expr);
                if(this.lexer.strict && expr.operator === 'delete' && expr.argument.type === TypedEsprima.Syntax.Identifier) {
                    this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictDelete);
                }
                return expr;
            }
            return this.parsePostfixExpression();
        };
        Parser.prototype.binaryPrecedence = function (token, allowIn) {
            var prec = 0;
            if(token.type !== TypedEsprima.TokenType.Punctuator && token.type !== TypedEsprima.TokenType.Keyword) {
                return 0;
            }
            switch(token.value) {
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
        };
        Parser.prototype.parseBinaryExpression = function () {
            var expr, token, prec, previousAllowIn, stack, right, operator, left, i;
            previousAllowIn = this.allowIn;
            this.allowIn = true;
            expr = this.parseUnaryExpression();
            token = this.lexer.lookahead;
            prec = this.binaryPrecedence(token, previousAllowIn);
            if(prec === 0) {
                return expr;
            }
            token.prec = prec;
            this.lexer.lex();
            stack = [
                expr, 
                token, 
                this.parseUnaryExpression()
            ];
            while((prec = this.binaryPrecedence(this.lexer.lookahead, previousAllowIn)) > 0) {
                while((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
                    right = stack.pop();
                    operator = stack.pop().value;
                    left = stack.pop();
                    stack.push(this.factory.createBinaryExpression(operator, left, right));
                }
                token = this.lexer.lex();
                token.prec = prec;
                stack.push(token);
                stack.push(this.parseUnaryExpression());
            }
            this.allowIn = previousAllowIn;
            i = stack.length - 1;
            expr = stack[i];
            while(i > 1) {
                expr = this.factory.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
                i -= 2;
            }
            return expr;
        };
        Parser.prototype.parseConditionalExpression = function () {
            var expr, previousAllowIn, consequent, alternate;
            expr = this.parseBinaryExpression();
            if(this.lexer.match('?')) {
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
        };
        Parser.prototype.parseAssignmentExpression = function () {
            var token, left, right;
            token = this.lexer.lookahead;
            left = this.parseConditionalExpression();
            if(this.lexer.matchAssign()) {
                if(!this.lexer.isLeftHandSide(left)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.InvalidLHSInAssignment);
                }
                if(this.lexer.strict && left.type === TypedEsprima.Syntax.Identifier && this.lexer.isRestrictedWord(left.name)) {
                    this.lexer.throwErrorTolerant(token, TypedEsprima.Messages.StrictLHSAssignment);
                }
                token = this.lexer.lex();
                right = this.parseAssignmentExpression();
                return this.factory.createAssignmentExpression(token.value, left, right);
            }
            return left;
        };
        Parser.prototype.parseExpression = function () {
            var expr = this.parseAssignmentExpression();
            if(this.lexer.match(',')) {
                expr = this.factory.createSequenceExpression([
                    expr
                ]);
                while(this.lexer.index < this.lexer.length) {
                    if(!this.lexer.match(',')) {
                        break;
                    }
                    this.lexer.lex();
                    expr.expressions.push(this.parseAssignmentExpression());
                }
            }
            return expr;
        };
        Parser.prototype.parseStatementList = function () {
            var list = [], statement;
            while(this.lexer.index < this.lexer.length) {
                if(this.lexer.match('}')) {
                    break;
                }
                statement = this.parseSourceElement();
                if(typeof statement === 'undefined') {
                    break;
                }
                list.push(statement);
            }
            return list;
        };
        Parser.prototype.parseBlock = function () {
            var block;
            this.lexer.expect('{');
            block = this.parseStatementList();
            this.lexer.expect('}');
            return this.factory.createBlockStatement(block);
        };
        Parser.prototype.parseVariableIdentifier = function () {
            var token = this.lexer.lex();
            if(token.type !== TypedEsprima.TokenType.Identifier) {
                this.lexer.throwUnexpected(token);
            }
            return this.factory.createIdentifier(token.value);
        };
        Parser.prototype.parseVariableDeclaration = function (isConstant) {
            var id = this.parseVariableIdentifier(), init = null;
            if(this.lexer.strict && this.lexer.isRestrictedWord(id.name)) {
                this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictVarName);
            }
            if(isConstant) {
                this.lexer.expect('=');
                init = this.parseAssignmentExpression();
            } else if(this.lexer.match('=')) {
                this.lexer.lex();
                init = this.parseAssignmentExpression();
            }
            return this.factory.createVariableDeclarator(id, init);
        };
        Parser.prototype.parseVariableDeclarationList = function (isConstant) {
            var list = [];
            do {
                list.push(this.parseVariableDeclaration(isConstant));
                if(!this.lexer.match(',')) {
                    break;
                }
                this.lexer.lex();
            }while(this.lexer.index < this.lexer.length);
            return list;
        };
        Parser.prototype.parseVariableStatement = function () {
            var declarations;
            this.lexer.expectKeyword('var');
            declarations = this.parseVariableDeclarationList(false);
            this.lexer.consumeSemicolon();
            return this.factory.createVariableDeclaration(declarations, 'var');
        };
        Parser.prototype.parseConstLetDeclaration = function (kind) {
            this.lexer.expectKeyword(kind);
            var declarations = this.parseVariableDeclarationList(kind === "const");
            this.lexer.consumeSemicolon();
            return this.factory.createVariableDeclaration(declarations, kind);
        };
        Parser.prototype.parseEmptyStatement = function () {
            this.lexer.expect(';');
            return this.factory.createEmptyStatement();
        };
        Parser.prototype.parseExpressionStatement = function () {
            var expr = this.parseExpression();
            this.lexer.consumeSemicolon();
            return this.factory.createExpressionStatement(expr);
        };
        Parser.prototype.parseIfStatement = function () {
            var test, consequent, alternate;
            this.lexer.expectKeyword('if');
            this.lexer.expect('(');
            test = this.parseExpression();
            this.lexer.expect(')');
            consequent = this.parseStatement();
            if(this.lexer.matchKeyword('else')) {
                this.lexer.lex();
                alternate = this.parseStatement();
            } else {
                alternate = null;
            }
            return this.factory.createIfStatement(test, consequent, alternate);
        };
        Parser.prototype.parseDoWhileStatement = function () {
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
            if(this.lexer.match(';')) {
                this.lexer.lex();
            }
            return this.factory.createDoWhileStatement(body, test);
        };
        Parser.prototype.parseWhileStatement = function () {
            this.lexer.expectKeyword('while');
            this.lexer.expect('(');
            var test = this.parseExpression();
            this.lexer.expect(')');
            var oldInIteration = this.inIteration;
            this.inIteration = true;
            var body = this.parseStatement();
            this.inIteration = oldInIteration;
            return this.factory.createWhileStatement(test, body);
        };
        Parser.prototype.parseForVariableDeclaration = function () {
            var token = this.lexer.lex(), declarations = this.parseVariableDeclarationList(false);
            return this.factory.createVariableDeclaration(declarations, token.value);
        };
        Parser.prototype.parseForStatement = function () {
            var init, test, update, left, right, body, oldInIteration;
            init = test = update = null;
            this.lexer.expectKeyword('for');
            this.lexer.expect('(');
            if(this.lexer.match(';')) {
                this.lexer.lex();
            } else {
                if(this.lexer.matchKeyword('var') || this.lexer.matchKeyword('let')) {
                    this.allowIn = false;
                    init = this.parseForVariableDeclaration();
                    this.allowIn = true;
                    if(init.declarations.length === 1 && this.lexer.matchKeyword('in')) {
                        this.lexer.lex();
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    }
                } else {
                    this.allowIn = false;
                    init = this.parseExpression();
                    this.allowIn = true;
                    if(this.lexer.matchKeyword('in')) {
                        if(!this.lexer.isLeftHandSide(init)) {
                            this.lexer.throwError(null, TypedEsprima.Messages.InvalidLHSInForIn);
                        }
                        this.lexer.lex();
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    }
                }
                if(typeof left === 'undefined') {
                    this.lexer.expect(';');
                }
            }
            if(typeof left === 'undefined') {
                if(!this.lexer.match(';')) {
                    test = this.parseExpression();
                }
                this.lexer.expect(';');
                if(!this.lexer.match(')')) {
                    update = this.parseExpression();
                }
            }
            this.lexer.expect(')');
            oldInIteration = this.inIteration;
            this.inIteration = true;
            body = this.parseStatement();
            this.inIteration = oldInIteration;
            if(typeof left === 'undefined') {
                return this.factory.createForStatement(init, test, update, body);
            }
            return this.factory.createForInStatement(left, right, body);
        };
        Parser.prototype.parseContinueStatement = function () {
            var label = null, key;
            this.lexer.expectKeyword('continue');
            if(this.lexer.getCharCodeRel(0) === 59) {
                this.lexer.lex();
                if(!this.inIteration) {
                    this.lexer.throwError(null, TypedEsprima.Messages.IllegalContinue);
                }
                return this.factory.createContinueStatement(null);
            }
            if(this.lexer.peekLineTerminator()) {
                if(!this.inIteration) {
                    this.lexer.throwError(null, TypedEsprima.Messages.IllegalContinue);
                }
                return this.factory.createContinueStatement(null);
            }
            if(this.lexer.lookahead.type === TypedEsprima.TokenType.Identifier) {
                label = this.parseVariableIdentifier();
                key = '$' + label.name;
                if(!Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.UnknownLabel, label.name);
                }
            }
            this.lexer.consumeSemicolon();
            if(label === null && !this.inIteration) {
                this.lexer.throwError(null, TypedEsprima.Messages.IllegalContinue);
            }
            return this.factory.createContinueStatement(label);
        };
        Parser.prototype.parseBreakStatement = function () {
            var label = null, key;
            this.lexer.expectKeyword('break');
            if(this.lexer.getCharCodeRel(0) === 59) {
                this.lexer.lex();
                if(!(this.inIteration || this.inSwitch)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.IllegalBreak);
                }
                return this.factory.createBreakStatement(null);
            }
            if(this.lexer.peekLineTerminator()) {
                if(!(this.inIteration || this.inSwitch)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.IllegalBreak);
                }
                return this.factory.createBreakStatement(null);
            }
            if(this.lexer.lookahead.type === TypedEsprima.TokenType.Identifier) {
                label = this.parseVariableIdentifier();
                key = '$' + label.name;
                if(!Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.UnknownLabel, label.name);
                }
            }
            this.lexer.consumeSemicolon();
            if(label === null && !(this.inIteration || this.inSwitch)) {
                this.lexer.throwError(null, TypedEsprima.Messages.IllegalBreak);
            }
            return this.factory.createBreakStatement(label);
        };
        Parser.prototype.parseReturnStatement = function () {
            var argument = null;
            this.lexer.expectKeyword('return');
            if(!this.inFunctionBody) {
                this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.IllegalReturn);
            }
            if(this.lexer.getCharCodeRel(0) === 32) {
                if(this.lexer.isIdentifierStart(this.lexer.getCharCodeRel(1))) {
                    argument = this.parseExpression();
                    this.lexer.consumeSemicolon();
                    return this.factory.createReturnStatement(argument);
                }
            }
            if(this.lexer.peekLineTerminator()) {
                return this.factory.createReturnStatement(null);
            }
            if(!this.lexer.match(';')) {
                if(!this.lexer.match('}') && this.lexer.lookahead.type !== TypedEsprima.TokenType.EOF) {
                    argument = this.parseExpression();
                }
            }
            this.lexer.consumeSemicolon();
            return this.factory.createReturnStatement(argument);
        };
        Parser.prototype.parseWithStatement = function () {
            var object, body;
            if(this.lexer.strict) {
                this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictModeWith);
            }
            this.lexer.expectKeyword('with');
            this.lexer.expect('(');
            object = this.parseExpression();
            this.lexer.expect(')');
            body = this.parseStatement();
            return this.factory.createWithStatement(object, body);
        };
        Parser.prototype.parseSwitchCase = function () {
            var test, consequent = [], statement;
            if(this.lexer.matchKeyword('default')) {
                this.lexer.lex();
                test = null;
            } else {
                this.lexer.expectKeyword('case');
                test = this.parseExpression();
            }
            this.lexer.expect(':');
            while(this.lexer.index < this.lexer.length) {
                if(this.lexer.match('}') || this.lexer.matchKeyword('default') || this.lexer.matchKeyword('case')) {
                    break;
                }
                statement = this.parseStatement();
                consequent.push(statement);
            }
            return this.factory.createSwitchCase(test, consequent);
        };
        Parser.prototype.parseSwitchStatement = function () {
            this.lexer.expectKeyword('switch');
            this.lexer.expect('(');
            var discriminant = this.parseExpression();
            this.lexer.expect(')');
            this.lexer.expect('{');
            if(this.lexer.match('}')) {
                this.lexer.lex();
                return this.factory.createSwitchStatement(discriminant, undefined);
            }
            var cases = [];
            var oldInSwitch = this.inSwitch;
            this.inSwitch = true;
            var defaultFound = false;
            while(this.lexer.index < this.lexer.length) {
                if(this.lexer.match('}')) {
                    break;
                }
                var clause = this.parseSwitchCase();
                if(clause.test === null) {
                    if(defaultFound) {
                        this.lexer.throwError(null, TypedEsprima.Messages.MultipleDefaultsInSwitch);
                    }
                    defaultFound = true;
                }
                cases.push(clause);
            }
            this.inSwitch = oldInSwitch;
            this.lexer.expect('}');
            return this.factory.createSwitchStatement(discriminant, cases);
        };
        Parser.prototype.parseThrowStatement = function () {
            var argument;
            this.lexer.expectKeyword('throw');
            if(this.lexer.peekLineTerminator()) {
                this.lexer.throwError(null, TypedEsprima.Messages.NewlineAfterThrow);
            }
            argument = this.parseExpression();
            this.lexer.consumeSemicolon();
            return this.factory.createThrowStatement(argument);
        };
        Parser.prototype.parseCatchClause = function () {
            var param, body;
            this.lexer.expectKeyword('catch');
            this.lexer.expect('(');
            if(this.lexer.match(')')) {
                this.lexer.throwUnexpected(this.lexer.lookahead);
            }
            param = this.parseExpression();
            if(this.lexer.strict && param.type === TypedEsprima.Syntax.Identifier && this.lexer.isRestrictedWord(param.name)) {
                this.lexer.throwErrorTolerant(null, TypedEsprima.Messages.StrictCatchVariable);
            }
            this.lexer.expect(')');
            body = this.parseBlock();
            return this.factory.createCatchClause(param, body);
        };
        Parser.prototype.parseTryStatement = function () {
            var block, handlers = [], finalizer = null;
            this.lexer.expectKeyword('try');
            block = this.parseBlock();
            if(this.lexer.matchKeyword('catch')) {
                handlers.push(this.parseCatchClause());
            }
            if(this.lexer.matchKeyword('finally')) {
                this.lexer.lex();
                finalizer = this.parseBlock();
            }
            if(handlers.length === 0 && !finalizer) {
                this.lexer.throwError(null, TypedEsprima.Messages.NoCatchOrFinally);
            }
            return this.factory.createTryStatement(block, [], handlers, finalizer);
        };
        Parser.prototype.parseDebuggerStatement = function () {
            this.lexer.expectKeyword('debugger');
            this.lexer.consumeSemicolon();
            return this.factory.createDebuggerStatement();
        };
        Parser.prototype.parseStatement = function () {
            var type = this.lexer.lookahead.type, expr, labeledBody, key;
            if(type === TypedEsprima.TokenType.EOF) {
                this.lexer.throwUnexpected(this.lexer.lookahead);
            }
            if(type === TypedEsprima.TokenType.Punctuator) {
                switch(this.lexer.lookahead.value) {
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
            if(type === TypedEsprima.TokenType.Keyword) {
                switch(this.lexer.lookahead.value) {
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
            if((expr.type === TypedEsprima.Syntax.Identifier) && this.lexer.match(':')) {
                this.lexer.lex();
                key = '$' + expr.name;
                if(Object.prototype.hasOwnProperty.call(this.labelSet, key)) {
                    this.lexer.throwError(null, TypedEsprima.Messages.Redeclaration, 'Label', expr.name);
                }
                this.labelSet[key] = true;
                labeledBody = this.parseStatement();
                delete this.labelSet[key];
                return this.factory.createLabeledStatement(expr, labeledBody);
            }
            this.lexer.consumeSemicolon();
            return this.factory.createExpressionStatement(expr);
        };
        Parser.prototype.parseFunctionSourceElements = function () {
            var sourceElement, sourceElements = [], token, directive, firstRestricted, oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody;
            this.lexer.expect('{');
            while(this.lexer.index < this.lexer.length) {
                if(this.lexer.lookahead.type !== TypedEsprima.TokenType.StringLiteral) {
                    break;
                }
                token = this.lexer.lookahead;
                sourceElement = this.parseSourceElement();
                sourceElements.push(sourceElement);
                if(sourceElement.expression.type !== TypedEsprima.Syntax.Literal) {
                    break;
                }
                directive = this.lexer.slice(token.range[0] + 1, token.range[1] - 1);
                if(directive === 'use strict') {
                    this.lexer.strict = true;
                    if(firstRestricted) {
                        this.lexer.throwErrorTolerant(firstRestricted, TypedEsprima.Messages.StrictOctalLiteral);
                    }
                } else {
                    if(!firstRestricted && token.octal) {
                        firstRestricted = token;
                    }
                }
            }
            oldLabelSet = this.labelSet;
            oldInIteration = this.inIteration;
            oldInSwitch = this.inSwitch;
            oldInFunctionBody = this.inFunctionBody;
            this.labelSet = {
            };
            this.inIteration = false;
            this.inSwitch = false;
            this.inFunctionBody = true;
            while(this.lexer.index < this.lexer.length) {
                if(this.lexer.match('}')) {
                    break;
                }
                sourceElement = this.parseSourceElement();
                if(typeof sourceElement === 'undefined') {
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
        };
        Parser.prototype.parseParams = function (firstRestricted) {
            var param, params = [], token, stricted, paramSet, key, message;
            this.lexer.expect('(');
            if(!this.lexer.match(')')) {
                paramSet = {
                };
                while(this.lexer.index < this.lexer.length) {
                    token = this.lexer.lookahead;
                    param = this.parseVariableIdentifier();
                    key = '$' + token.value;
                    if(this.lexer.strict) {
                        if(this.lexer.isRestrictedWord(token.value)) {
                            stricted = token;
                            message = TypedEsprima.Messages.StrictParamName;
                        }
                        if(Object.prototype.hasOwnProperty.call(paramSet, key)) {
                            stricted = token;
                            message = TypedEsprima.Messages.StrictParamDupe;
                        }
                    } else if(!firstRestricted) {
                        if(this.lexer.isRestrictedWord(token.value)) {
                            firstRestricted = token;
                            message = TypedEsprima.Messages.StrictParamName;
                        } else if(this.lexer.isStrictModeReservedWord(token.value)) {
                            firstRestricted = token;
                            message = TypedEsprima.Messages.StrictReservedWord;
                        } else if(Object.prototype.hasOwnProperty.call(paramSet, key)) {
                            firstRestricted = token;
                            message = TypedEsprima.Messages.StrictParamDupe;
                        }
                    }
                    params.push(param);
                    paramSet[key] = true;
                    if(this.lexer.match(')')) {
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
        };
        Parser.prototype.parseFunctionDeclaration = function () {
            var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict;
            this.lexer.expectKeyword('function');
            token = this.lexer.lookahead;
            id = this.parseVariableIdentifier();
            if(this.lexer.strict) {
                if(this.lexer.isRestrictedWord(token.value)) {
                    this.lexer.throwErrorTolerant(token, TypedEsprima.Messages.StrictFunctionName);
                }
            } else {
                if(this.lexer.isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = TypedEsprima.Messages.StrictFunctionName;
                } else if(this.lexer.isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = TypedEsprima.Messages.StrictReservedWord;
                }
            }
            tmp = this.parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if(tmp.message) {
                message = tmp.message;
            }
            previousStrict = this.lexer.strict;
            body = this.parseFunctionSourceElements();
            if(this.lexer.strict && firstRestricted) {
                this.lexer.throwError(firstRestricted, message);
            }
            if(this.lexer.strict && stricted) {
                this.lexer.throwErrorTolerant(stricted, message);
            }
            this.lexer.strict = previousStrict;
            return this.factory.createFunctionDeclaration(id, params, [], body);
        };
        Parser.prototype.parseFunctionExpression = function () {
            var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict;
            this.lexer.expectKeyword('function');
            if(!this.lexer.match('(')) {
                token = this.lexer.lookahead;
                id = this.parseVariableIdentifier();
                if(this.lexer.strict) {
                    if(this.lexer.isRestrictedWord(token.value)) {
                        this.lexer.throwErrorTolerant(token, TypedEsprima.Messages.StrictFunctionName);
                    }
                } else {
                    if(this.lexer.isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = TypedEsprima.Messages.StrictFunctionName;
                    } else if(this.lexer.isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = TypedEsprima.Messages.StrictReservedWord;
                    }
                }
            }
            tmp = this.parseParams(firstRestricted);
            params = tmp.params;
            stricted = tmp.stricted;
            firstRestricted = tmp.firstRestricted;
            if(tmp.message) {
                message = tmp.message;
            }
            previousStrict = this.lexer.strict;
            body = this.parseFunctionSourceElements();
            if(this.lexer.strict && firstRestricted) {
                this.lexer.throwError(firstRestricted, message);
            }
            if(this.lexer.strict && stricted) {
                this.lexer.throwErrorTolerant(stricted, message);
            }
            this.lexer.strict = previousStrict;
            return this.factory.createFunctionExpression(id, params, [], body);
        };
        Parser.prototype.parseSourceElement = function () {
            if(this.lexer.lookahead.type === TypedEsprima.TokenType.Keyword) {
                switch(this.lexer.lookahead.value) {
                    case 'const':
                    case 'let':
                        return this.parseConstLetDeclaration(this.lexer.lookahead.value);
                    case 'function':
                        return this.parseFunctionDeclaration();
                    default:
                        return this.parseStatement();
                }
            }
            if(this.lexer.lookahead.type !== TypedEsprima.TokenType.EOF) {
                return this.parseStatement();
            }
        };
        Parser.prototype.parseSourceElements = function () {
            var sourceElement, sourceElements = [], token, directive, firstRestricted;
            while(this.lexer.index < this.lexer.length) {
                token = this.lexer.lookahead;
                if(token.type !== TypedEsprima.TokenType.StringLiteral) {
                    break;
                }
                sourceElement = this.parseSourceElement();
                sourceElements.push(sourceElement);
                if(sourceElement.expression.type !== TypedEsprima.Syntax.Literal) {
                    break;
                }
                directive = this.lexer.slice(token.range[0] + 1, token.range[1] - 1);
                if(directive === 'use strict') {
                    this.lexer.strict = true;
                    if(firstRestricted) {
                        this.lexer.throwErrorTolerant(firstRestricted, TypedEsprima.Messages.StrictOctalLiteral);
                    }
                } else {
                    if(!firstRestricted && token.octal) {
                        firstRestricted = token;
                    }
                }
            }
            while(this.lexer.index < this.lexer.length) {
                sourceElement = this.parseSourceElement();
                if(typeof sourceElement === 'undefined') {
                    break;
                }
                sourceElements.push(sourceElement);
            }
            return sourceElements;
        };
        Parser.prototype.parseProgram = function () {
            this.lexer.strict = false;
            this.lexer.peek();
            var body = this.parseSourceElements();
            return this.factory.createProgram(body);
        };
        Parser.prototype.endMarker = function (startRange, startLine, startColumn, node) {
            if(this.lexer.includeRange && typeof node.range === 'undefined') {
                node.range = [
                    startRange, 
                    this.lexer.index
                ];
            }
            if(this.lexer.includeLocation && typeof node.loc === 'undefined') {
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
        };
        Parser.prototype.endMarkerGroup = function (startRange, startLine, startColumn, expr) {
            expr.groupRange = [
                startRange, 
                this.lexer.index
            ];
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
        };
        Parser.prototype.trackGroupExpression = function () {
            this.lexer.skipComment();
            var startRange = this.lexer.index, startLine = this.lexer.lineNumber, startColumn = this.lexer.index - this.lexer.lineStart;
            this.lexer.expect('(');
            var expr = this.parseExpression();
            this.lexer.expect(')');
            this.endMarkerGroup(startRange, startLine, startColumn, expr);
            return expr;
        };
        Parser.prototype.trackLeftHandSideExpression = function () {
            this.lexer.skipComment();
            var startRange = this.lexer.index, startLine = this.lexer.lineNumber, startColumn = this.lexer.index - this.lexer.lineStart;
            var expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
            var isDot;
            while((isDot = this.lexer.match('.')) || this.lexer.match('[')) {
                if(!isDot) {
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
        };
        Parser.prototype.trackLeftHandSideExpressionAllowCall = function () {
            var args, property;
            this.lexer.skipComment();
            var startRange = this.lexer.index, startLine = this.lexer.lineNumber, startColumn = this.lexer.index - this.lexer.lineStart;
            var expr = this.lexer.matchKeyword('new') ? this.parseNewExpression() : this.parsePrimaryExpression();
            while(this.lexer.match('.') || this.lexer.match('[') || this.lexer.match('(')) {
                if(this.lexer.match('(')) {
                    args = this.parseArguments();
                    expr = this.factory.createCallExpression(expr, args);
                    this.endMarker(startRange, startLine, startColumn, expr);
                } else if(this.lexer.match('[')) {
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
        };
        Parser.prototype.wrapTrackingFunction = function (range, loc) {
            var _this = this;
            return function (parseFunction) {
                function isBinary(node) {
                    return node.type === TypedEsprima.Syntax.LogicalExpression || node.type === TypedEsprima.Syntax.BinaryExpression;
                }
                var visit = function (node) {
                    var start, end;
                    if(isBinary(node.left)) {
                        visit(node.left);
                    }
                    if(isBinary(node.right)) {
                        visit(node.right);
                    }
                    if(range) {
                        if(node.left.groupRange || node.right.groupRange) {
                            start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0];
                            end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1];
                            node.range = [
                                start, 
                                end
                            ];
                        } else if(typeof node.range === 'undefined') {
                            start = node.left.range[0];
                            end = node.right.range[1];
                            node.range = [
                                start, 
                                end
                            ];
                        }
                    }
                    if(loc) {
                        if(node.left.groupLoc || node.right.groupLoc) {
                            start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start;
                            end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end;
                            node.loc = {
                                start: start,
                                end: end
                            };
                            node = _this.postProcess(node);
                        } else if(typeof node.loc === 'undefined') {
                            node.loc = {
                                start: node.left.loc.start,
                                end: node.right.loc.end
                            };
                            node = _this.postProcess(node);
                        }
                    }
                };
                return function () {
                    _this.lexer.skipComment();
                    var startRange = _this.lexer.index, startLine = _this.lexer.lineNumber, startColumn = _this.lexer.index - _this.lexer.lineStart;
                    var node = parseFunction.apply(_this, arguments);
                    _this.endMarker(startRange, startLine, startColumn, node);
                    if(isBinary(node)) {
                        visit(node);
                    }
                    return node;
                };
            };
        };
        Parser.prototype.patch = function () {
            var _this = this;
            var wrapTracking;
            this.lexer.patch();
            if(this.lexer.includeRange || this.lexer.includeLocation) {
                this['parseGroupExpression'] = this.trackGroupExpression;
                this['parseLeftHandSideExpression'] = this.trackLeftHandSideExpression;
                this['parseLeftHandSideExpressionAllowCall'] = this.trackLeftHandSideExpressionAllowCall;
                wrapTracking = this.wrapTrackingFunction(this.lexer.includeRange, this.lexer.includeLocation);
                Parser.PatchingMethods.forEach(function (method) {
                    _this[method] = wrapTracking(_this[method]);
                });
            }
        };
        Parser.prototype.unpatch = function () {
            var _this = this;
            delete this['parseGroupExpression'];
            delete this['parseLeftHandSideExpressionAllowCall'];
            Parser.PatchingMethods.forEach(function (method) {
                delete _this[method];
            });
        };
        return Parser;
    })();
    TypedEsprima.Parser = Parser;    
})(TypedEsprima || (TypedEsprima = {}));
var TypedEsprima;
(function (TypedEsprima) {
    TypedEsprima.Messages = {
        UnexpectedToken: 'Unexpected token %0',
        UnexpectedNumber: 'Unexpected number',
        UnexpectedString: 'Unexpected string',
        UnexpectedIdentifier: 'Unexpected identifier',
        UnexpectedReserved: 'Unexpected reserved word',
        UnexpectedEOS: 'Unexpected end of input',
        NewlineAfterThrow: 'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp: 'Invalid regular expression: missing /',
        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally: 'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        StrictModeWith: 'Strict mode code may not include a with statement',
        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
        AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord: 'Use of future reserved word in strict mode'
    };
    function assert(condition, message) {
        if(!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }
    TypedEsprima.assert = assert;
})(TypedEsprima || (TypedEsprima = {}));
var TypedEsprima;
(function (TypedEsprima) {
    function filterGroup(node) {
        var name;
        delete node.groupRange;
        delete node.groupLoc;
        for(name in node) {
            if(node.hasOwnProperty(name)) {
                if(typeof node[name] === 'object' && node[name]) {
                    if(node[name].type || (node[name].length && !node[name].substr)) {
                        filterGroup(node[name]);
                    }
                }
            }
        }
    }
    function tokenize(code, options) {
        if (typeof options === "undefined") { options = {
        }; }
        if(typeof code !== 'string') {
            code = String(code);
        }
        var lexer = new TypedEsprima.Lexer(code);
        lexer.tokens = [];
        lexer.tokenize = true;
        lexer.includeRange = (typeof options.range === 'boolean') && options.range;
        lexer.includeLocation = (typeof options.loc === 'boolean') && options.loc;
        if(typeof options.comment === 'boolean' && options.comment) {
            lexer.comments = [];
        }
        if(typeof options.tolerant === 'boolean' && options.tolerant) {
            lexer.errors = [];
        }
        lexer.patch();
        try  {
            lexer.peek();
            if(lexer.lookahead.type === TypedEsprima.TokenType.EOF) {
                return lexer.tokens;
            }
            var token = lexer.lex();
            while(lexer.lookahead.type !== TypedEsprima.TokenType.EOF) {
                try  {
                    token = lexer.lex();
                } catch (lexError) {
                    token = lexer.lookahead;
                    if(lexer.errors) {
                        lexer.errors.push(lexError);
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }
            lexer.filterTokenLocation();
            var tokens = lexer.tokens;
            if(typeof lexer.comments !== 'undefined') {
                lexer.filterCommentLocation();
                tokens['comments'] = lexer.comments;
            }
            if(typeof lexer.errors !== 'undefined') {
                tokens['errors'] = lexer.errors;
            }
        } catch (e) {
            throw e;
        }finally {
            lexer.unpatch();
        }
        return tokens;
    }
    TypedEsprima.tokenize = tokenize;
    function parse(code, options) {
        if (typeof options === "undefined") { options = {
        }; }
        var program;
        if(typeof code !== 'string' && !(code instanceof String)) {
            code = String(code);
        }
        var factory = new TypedEsprima.ASTFactory();
        var lexer = new TypedEsprima.Lexer(code);
        var parser = new TypedEsprima.Parser(lexer, factory);
        if(typeof options !== 'undefined') {
            lexer.includeLocation = !!options.loc;
            lexer.includeRange = !!options.range;
            if(lexer.includeLocation && options.source !== null && options.source !== undefined) {
                parser.postProcess = function (node) {
                    node.loc['source'] = String(options.source);
                    return node;
                };
            }
            if(!!options.tokens) {
                lexer.tokens = [];
            }
            if(!!options.comment) {
                lexer.comments = [];
            }
            if(!!options.tolerant) {
                lexer.errors = [];
            }
        }
        parser.patch();
        try  {
            program = parser.parseProgram();
            if(typeof lexer.comments !== 'undefined') {
                lexer.filterCommentLocation();
                program.comments = lexer.comments;
            }
            if(typeof lexer.tokens !== 'undefined') {
                lexer.filterTokenLocation();
                program.tokens = lexer.tokens;
            }
            if(typeof lexer.errors !== 'undefined') {
                program.errors = lexer.errors;
            }
            if(options.range || options.loc) {
                filterGroup(program.body);
            }
        } catch (e) {
            throw e;
        }finally {
            parser.unpatch();
        }
        return program;
    }
    TypedEsprima.parse = parse;
    TypedEsprima.version = '0.0.1-dev';
})(TypedEsprima || (TypedEsprima = {}));
//@ sourceMappingURL=tesprima.js.map
(function (root, factory) {
  'use strict';

  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
  // Rhino, and plain browser loading.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.esprima = {}));
  }
})(this, function(exports) {
  exports.version = TypedEsprima.version;
  exports.tokenize = TypedEsprima.tokenize;
  exports.parse = TypedEsprima.parse;
  exports.Syntax = (function () {
    var name, types = {};

    if (typeof Object.create === 'function') {
      types = Object.create(null);
    }

    for (name in TypedEsprima.Syntax) {
      if (TypedEsprima.Syntax.hasOwnProperty(name)) {
        types[name] = TypedEsprima.Syntax[name];
      }
    }

    if (typeof Object.freeze === 'function') {
      Object.freeze(types);
    }

    return types;
  }());
});
//@ sourceMappingURL=tesprima.js.map