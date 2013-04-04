/// <reference path="ast.ts"/>
/// <reference path="ast_factory.ts"/>
/// <reference path="lexer.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="error.ts"/>
/// <reference path="error_reporter.ts"/>
module TypedEsprima {
    export interface Options {
        loc?: bool;
        range?: bool;
        tokens?: bool;
        source?: any;
        comment?: bool;
        tolerant?: bool;
    }

    export function tokenize(code:string, options:Options = {}) {
        if (typeof code !== 'string') {
            code = String(code);
        }
        var lexer = new Lexer(code);
        lexer.tokens = [];
        lexer.tokenize = true;

        lexer.includeRange = (typeof options.range === 'boolean') && options.range;
        lexer.includeLocation = (typeof options.loc === 'boolean') && options.loc;
        lexer.includeSource = options.source || null;

        if (typeof options.comment === 'boolean' && options.comment) {
            lexer.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
            lexer.errors = [];
        }

        lexer.patch();
        try {
            lexer.peek();
            if (lexer.lookahead.type === TokenType.EOF) {
                return lexer.tokens;
            }

            var token = lexer.lex();
            while (lexer.lookahead.type !== TokenType.EOF) {
                try {
                    token = lexer.lex();
                } catch (lexError) {
                    token = lexer.lookahead;
                    if (lexer.errors) {
                        lexer.errors.push(lexError);
                        // We have to break on the first error
                        // to avoid infinite loops.
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }

            var tokens = lexer.tokens;
            if (typeof lexer.comments !== 'undefined') {
                tokens['comments'] = lexer.comments;
            }
            if (typeof lexer.errors !== 'undefined') {
                tokens['errors'] = lexer.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            lexer.unpatch();
        }
        return tokens;
    }

    export function parse(code:string, options:Options = {}) {
        var program;

        if (typeof code !== 'string' && !(code instanceof String)) {
            code = String(code);
        }
        var factory = new ASTFactory();
        var lexer = new Lexer(code);
        var parser = new Parser(lexer, factory);

        if (typeof options !== 'undefined') {
            lexer.includeLocation = !!options.loc;
            lexer.includeRange = !!options.range;
            lexer.includeSource = options.source || null;
            if (lexer.includeLocation && options.source !== null &&
                options.source !== undefined) {
                parser.postProcess = function (node) {
                    node.loc['source'] = String(options.source);
                    return node;
                };
            }
            if (!!options.tokens) {
                lexer.tokens = [];
            }
            if (!!options.comment) {
                lexer.comments = [];
            }
            if (!!options.tolerant) {
                lexer.errors = [];
            }
        }

        parser.patch();
        try {
            program = parser.parseProgram();
            if (typeof lexer.comments !== 'undefined') {
                program.comments = lexer.comments;
            }
            if (typeof lexer.tokens !== 'undefined') {
                program.tokens = lexer.tokens;
            }
            if (typeof lexer.errors !== 'undefined') {
                program.errors = lexer.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            parser.unpatch()
        }

        return program;
    }

    // Sync with package.json and component.json.
    export var version = '0.0.1-dev';
} // module TypedEsprima

