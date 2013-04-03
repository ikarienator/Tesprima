/// <reference path="tesprima.ts"/>

// A function following one of those tokens is an expression.
var FnExprTokens = ["(", "{", "[", "in", "typeof", "instanceof", "new",
    "return", "case", "delete", "throw", "void",
    // assignment operators
    "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
    "&=", "|=", "^=", ",",
    // binary/unary operators
    "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&",
    "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=",
    "<=", "<", ">", "!=", "!=="];

// See also tools/generate-unicode-regex.py.
var Regex = {
    NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
    NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
};

export interface SourceLocation {
    line:number;
    column:number;
}

export interface TextRange {
    start: SourceLocation;
    end: SourceLocation;
}

export interface ILexer extends IErrorReporter {
    includeRange:bool;
    includeLocation:bool;

    strict:bool;
    index:number;
    lineNumber:number;
    lineStart:number;
    length:number;
    lookahead:Token;
    tokens:TokenOutput[];
    errors:Error[];
    comments:Comment[];

    getCharCodeRel(index:number):number;
    slice(begin:number, end:number):string;


    isIdentifierStart(ch:number):bool;
    isRestrictedWord(text:string):bool;
    isStrictModeReservedWord(text:string):bool;
    isIdentifierName(text:Token):bool;
    isLeftHandSide(expr:Expression):bool;

    expect(text:string):void;
    expectKeyword(text:string):void;
    match(text:string):bool;
    matchAssign():bool;
    matchKeyword(text:string):bool;

    consumeSemicolon():void;
    peekLineTerminator():void;
    peek():void; // In to look ahead
    skipComment():void;

    scanRegExp():Token;
    lex():Token;

    patch();
    unpatch();
}

export class Lexer implements ILexer {
    strict:bool = false;
    index:number = 0;
    lineNumber:number;
    lineStart:number = 0;
    length:number;
    lookahead:Token = null;
    errors:Error[];

    // Indicates that we are in a tokenization routine.
    public tokenize:bool = false;

    // Save all the tokens in the `tokens` array.
    public tokens:TokenOutput[];

    public comments:Comment[];

    public includeRange:bool;
    public includeLocation:bool;

    public openParenToken = -1;
    public openCurlyToken = -1;

    constructor(public source:string) {
        this.lineNumber = (this.source.length > 0) ? 1 : 0;
        this.length = this.source.length;
    }

    patch() {
        if (this.comments) {
            this['skipComment'] = this.scanComment;
        }
        if (this.tokens) {
            this['advance'] = this.collectToken;
            this['scanRegExp'] = this.collectRegex;
        }
    }

    unpatch() {
        delete this['skipComment'];
        delete this['advance'];
        delete this['scanRegExp'];
    }

    private createError(token:Token, messageFormat:string, args:string[]) {
        var error,
            msg = messageFormat.replace(
                /%(\d)/g,
                (whole, index) => {
                    assert(index < args.length, 'Message reference must be in range');
                    return args[index];
                }
            );
        error = new Error('Line ' + this.lineNumber + ': ' + msg);
        if (token) {
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
    }


    private static throwErrorArgs = [];

    // Throw an exception
    throwError(token:Token, messageFormat:string, arg0?:string, arg1?:string, arg2?:string) {
        Lexer.throwErrorArgs[0] = arg0;
        Lexer.throwErrorArgs[1] = arg1;
        Lexer.throwErrorArgs[2] = arg2;
        throw this.createError(token, messageFormat, Lexer.throwErrorArgs);
    }

    private static throwErrorTolerantArgs = [];

    throwErrorTolerant(token:Token, messageFormat:string) {
        var error = this.createError(token, messageFormat, Lexer.throwErrorTolerantArgs);
        if (this.errors) {
            try {
                // Throw the error for stack information.
                throw error;
            } catch (e) {
                this.errors.push(e);
            }
        } else {
            throw error;
        }
    }

    // Throw an exception because of the token.
    throwUnexpected(token:Token) {
        if (token.type === TokenType.EOF) {
            this.throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === TokenType.NumericLiteral) {
            this.throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === TokenType.StringLiteral) {
            this.throwError(token, Messages.UnexpectedString);
        }

        if (token.type === TokenType.Identifier) {
            this.throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === TokenType.Keyword) {
            if (this.isFutureReservedWord(token.value)) {
                this.throwError(token, Messages.UnexpectedReserved);
            } else if (this.strict && this.isStrictModeReservedWord(token.value)) {
                this.throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
            }
            this.throwError(token, Messages.UnexpectedToken, token.value);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        this.throwError(token, Messages.UnexpectedToken, token.value);
    }

    getCharCodeRel(offset:number):number {
        return this.source.charCodeAt(this.index + offset);
    }

    slice(begin:number, end:number):string {
        return this.source.slice(begin, end);
    }

    // 7.2 White Space
    isWhiteSpace(ch:number):bool {
        return (ch === 32) ||  // space
            (ch === 9) ||      // tab
            (ch === 0xB) ||
            (ch === 0xC) ||
            (ch === 0xA0) ||
            (ch >= 0x1680 &&
                '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(String.fromCharCode(ch)) >
                    0);
    }

    // 7.3 Line Terminators
    isLineTerminator(ch:number):bool {
        return (ch === 10) || (ch === 13) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers
    isIdentifierStart(ch:number):bool {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) &&
                Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    isIdentifierPart(ch:number):bool {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch >= 48 && ch <= 57) ||         // 0..9
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) &&
                Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    // 7.6.1.2 Future Reserved Words
    isFutureReservedWord(id:string):bool {
        switch (id) {
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
    }

    isStrictModeReservedWord(id:string):bool {
        switch (id) {
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
    }

    isRestrictedWord(id:string):bool {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords
    isKeyword(id:string):bool {
        if (this.strict && this.isStrictModeReservedWord(id)) {
            return true;
        }

        // 'const' is specialized as Keyword in V8.
        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
            case 2:
                return (id === 'if') || (id === 'in') || (id === 'do');
            case 3:
                return (id === 'var') || (id === 'for') || (id === 'new') ||
                    (id === 'try') || (id === 'let');
            case 4:
                return (id === 'this') || (id === 'else') || (id === 'case') ||
                    (id === 'void') || (id === 'with') || (id === 'enum');
            case 5:
                return (id === 'while') || (id === 'break') || (id === 'catch') ||
                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
                    (id === 'class') || (id === 'super');
            case 6:
                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                    (id === 'switch') || (id === 'export') || (id === 'import');
            case 7:
                return (id === 'default') || (id === 'finally') || (id === 'extends');
            case 8:
                return (id === 'function') || (id === 'continue') ||
                    (id === 'debugger');
            case 10:
                return (id === 'instanceof');
            default:
                return false;
        }
    }

    isDecimalDigit(ch:number):bool {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    isHexDigit(ch:string):bool {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    isOctalDigit(ch:string):bool {
        return '01234567'.indexOf(ch) >= 0;
    }

    // Return true if provided expression is LeftHandSideExpression
    isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier ||
            expr.type === Syntax.MemberExpression;
    }

    // 7.4 Comments
    skipComment() {
        var ch, blockComment, lineComment;

        blockComment = false;
        lineComment = false;

        while (this.index < this.length) {
            ch = this.source.charCodeAt(this.index);

            if (lineComment) {
                ++this.index;
                if (this.isLineTerminator(ch)) {
                    lineComment = false;
                    if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                }
            } else if (blockComment) {
                if (this.isLineTerminator(ch)) {
                    if (ch === 13 && this.source.charCodeAt(this.index + 1) === 10) {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    ++this.index;
                    this.lineStart = this.index;
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = this.source.charCodeAt(this.index++);
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    // Block comment ends with '*/' (char #42, char #47).
                    if (ch === 42) {
                        ch = this.source.charCodeAt(this.index);
                        if (ch === 47) {
                            ++this.index;
                            blockComment = false;
                        }
                    }
                }
            } else if (ch === 47) {
                ch = this.source.charCodeAt(this.index + 1);
                // Line comment starts with '//' (char #47, char #47).
                if (ch === 47) {
                    this.index += 2;
                    lineComment = true;
                } else if (ch === 42) {
                    // Block comment starts with '/*' (char #47, char #42).
                    this.index += 2;
                    blockComment = true;
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (this.isWhiteSpace(ch)) {
                ++this.index;
            } else if (this.isLineTerminator(ch)) {
                ++this.index;
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                    ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
            } else {
                break;
            }
        }
    }


    consumeSemicolon() {
        var line;

        // Catch the very common case first: immediately a semicolon (char #59).
        if (this.source.charCodeAt(this.index) === 59) {
            this.lex();
            return;
        }

        line = this.lineNumber;
        this.skipComment();
        if (this.lineNumber !== line) {
            return;
        }

        if (this.match(';')) {
            this.lex();
            return;
        }

        if (this.lookahead.type !== TokenType.EOF && !this.match('}')) {
            this.throwUnexpected(this.lookahead);
        }
    }


    // The following functions are needed only when the option to preserve
    // the comments is active.
    addComment(type:string, value:string, start:number, end:number, loc:TextRange) {
        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (this.comments.length > 0) {
            if (this.comments[this.comments.length - 1].range[1] >
                start) {
                return;
            }
        }

        this.comments.push({
            type: type,
            value: value,
            range: [start, end],
            loc: loc
        });
    }

    scanComment() {
        var comment, ch, start, blockComment, lineComment;

        comment = '';
        blockComment = false;
        lineComment = false;

        var startLine = 0;
        var startColumn = 0;

        while (this.index < this.length) {
            ch = this.source[this.index];

            if (lineComment) {
                ch = this.source[this.index++];
                if (this.isLineTerminator(ch.charCodeAt(0))) {
                    lineComment = false;
                    this.addComment('Line', comment, start, this.index - 1, {start: {
                        line: startLine,
                        column: startColumn
                    }, end: {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 1
                    }});
                    if (ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                    ++this.lineNumber;
                    this.lineStart = this.index;
                    comment = '';
                } else if (this.index >= this.length) {
                    lineComment = false;
                    comment += ch;
                    this.addComment('Line', comment, start, this.length, {
                        start: {
                            line: startLine,
                            column: startColumn
                        }, end: {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        }
                    });
                } else {
                    comment += ch;
                }
            } else if (blockComment) {
                if (this.isLineTerminator(ch.charCodeAt(0))) {
                    if (ch === '\r' && this.source[this.index + 1] === '\n') {
                        ++this.index;
                        comment += '\r\n';
                    } else {
                        comment += ch;
                    }
                    ++this.lineNumber;
                    ++this.index;
                    this.lineStart = this.index;
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = this.source[this.index++];
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    comment += ch;
                    if (ch === '*') {
                        ch = this.source[this.index];
                        if (ch === '/') {
                            comment = comment.substr(0, comment.length - 1);
                            blockComment = false;
                            ++this.index;
                            this.addComment('Block', comment, start, this.index, {
                                start: {
                                    line: startLine,
                                    column: startColumn
                                }, end: {
                                    line: this.lineNumber,
                                    column: this.index - this.lineStart
                                }
                            });
                            comment = '';
                        }
                    }
                }
            } else if (ch === '/') {
                ch = this.source[this.index + 1];
                if (ch === '/') {
                    startLine = this.lineNumber;
                    startColumn = this.index - this.lineStart;

                    start = this.index;
                    this.index += 2;
                    lineComment = true;
                    if (this.index >= this.length) {
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
                } else if (ch === '*') {
                    start = this.index;
                    this.index += 2;
                    blockComment = true;
                    startLine = this.lineNumber;
                    startColumn = this.index - this.lineStart - 2;
                    if (this.index >= this.length) {
                        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (this.isWhiteSpace(ch.charCodeAt(0))) {
                ++this.index;
            } else if (this.isLineTerminator(ch.charCodeAt(0))) {
                ++this.index;
                if (ch === '\r' && this.source[this.index] === '\n') {
                    ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
            } else {
                break;
            }
        }
    }

    filterCommentLocation() {
        var i, entry, comment, comments = [];

        for (i = 0; i < this.comments.length; ++i) {
            entry = this.comments[i];
            comment = {
                type: entry.type,
                value: entry.value
            };
            if (this.includeRange) {
                comment.range = entry.range;
            }
            if (this.includeLocation) {
                comment.loc = entry.loc;
            }
            comments.push(comment);
        }

        this.comments = comments;
    }

    collectToken() {
        var token, range, value;

        this.skipComment();
        var startLine = this.lineNumber;
        var startColumn = this.index - this.lineStart;
        token = this['constructor'].prototype.advance.call(this);
        if (token.type !== TokenType.EOF) {
            range = [token.range[0], token.range[1]];
            value = this.source.slice(token.range[0], token.range[1]);
            this.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: range,
                loc: {
                    start: {
                        line: startLine,
                        column: startColumn
                    }, end: {
                        line: this.lineNumber,
                        column: this.index - this.lineStart
                    }
                }
            });
        }

        return token;
    }

    collectRegex() {
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

        if (!this.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (this.tokens.length > 0) {
                var token = this.tokens[this.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                    if (token.value === '/' || token.value === '/=') {
                        this.tokens.pop();
                    }
                }
            }

            this.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, this.index],
                loc: loc
            });
        }

        return regex;
    }

    filterTokenLocation() {
        var i, entry, token, tokens = [];

        for (i = 0; i < this.tokens.length; ++i) {
            entry = this.tokens[i];
            token = {
                type: entry.type,
                value: entry.value
            };
            if (this.includeRange) {
                token.range = entry.range;
            }
            if (this.includeLocation) {
                token.loc = entry.loc;
            }
            tokens.push(token);
        }

        this.tokens = tokens;
    }


    scanHexEscape(prefix:string):string {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (this.index < this.length && this.isHexDigit(this.source[this.index])) {
                ch = this.source[this.index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    getEscapedIdentifier():string {
        var ch, id;

        ch = this.source.charCodeAt(this.index++);
        id = String.fromCharCode(ch);

        // '\u' (char #92, char #117) denotes an escaped character.
        if (ch === 92) {
            if (this.source.charCodeAt(this.index) !== 117) {
                this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++this.index;
            ch = this.scanHexEscape('u');
            if (!ch || ch === '\\' || !this.isIdentifierStart(ch.charCodeAt(0))) {
                this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
        }

        while (this.index < this.length) {
            ch = this.source.charCodeAt(this.index);
            if (!this.isIdentifierPart(ch)) {
                break;
            }
            ++this.index;
            id += String.fromCharCode(ch);

            // '\u' (char #92, char #117) denotes an escaped character.
            if (ch === 92) {
                id = id.substr(0, id.length - 1);
                if (this.source.charCodeAt(this.index) !== 117) {
                    this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++this.index;
                ch = this.scanHexEscape('u');
                if (!ch || ch === '\\' || !this.isIdentifierPart(ch.charCodeAt(0))) {
                    this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
            }
        }

        return id;
    }

    getIdentifier():string {
        var start, ch;

        start = this.index++;
        while (this.index < this.length) {
            ch = this.source.charCodeAt(this.index);
            if (ch === 92) {
                // Blackslash (char #92) marks Unicode escape sequence.
                this.index = start;
                return this.getEscapedIdentifier();
            }
            if (this.isIdentifierPart(ch)) {
                ++this.index;
            } else {
                break;
            }
        }

        return this.source.slice(start, this.index);
    }

    scanIdentifier():Token {
        var start:number,
            id:string,
            type:TokenType;

        start = this.index;

        // Backslash (char #92) starts an escaped character.
        id = (this.source.charCodeAt(this.index) === 92) ? this.getEscapedIdentifier() :
            this.getIdentifier();

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = TokenType.Identifier;
        } else if (this.isKeyword(id)) {
            type = TokenType.Keyword;
        } else if (id === 'null') {
            type = TokenType.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = TokenType.BooleanLiteral;
        } else {
            type = TokenType.Identifier;
        }

        return {
            type: type,
            value: id,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            range: [start, this.index]
        };
    }


    // 7.7 Punctuators
    scanPunctuator():Token {
        var start = this.index,
            code = this.source.charCodeAt(this.index),
            code2,
            ch1 = this.source[this.index],
            ch2,
            ch3,
            ch4;

        switch (code) {

            // Check for most common single-character punctuators.
            case 46:   // . dot
            case 40:   // ( open bracket
            case 41:   // ) close bracket
            case 59:   // ; semicolon
            case 44:   // , comma
            case 123:  // { open curly brace
            case 125:  // } close curly brace
            case 91:   // [
            case 93:   // ]
            case 58:   // :
            case 63:   // ?
            case 126:  // ~
                ++this.index;
                if (this.tokenize) {
                    if (code === 40) {
                        this.openParenToken = this.tokens.length;
                    } else if (code === 123) {
                        this.openCurlyToken = this.tokens.length;
                    }
                }
                return {
                    type: TokenType.Punctuator,
                    value: String.fromCharCode(code),
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [start, this.index]
                };

            default:
                code2 = this.source.charCodeAt(this.index + 1);

                // '=' (char #61) marks an assignment or comparison operator.
                if (code2 === 61) {
                    switch (code) {
                        case 37:  // %
                        case 38:  // &
                        case 42:  // *:
                        case 43:  // +
                        case 45:  // -
                        case 47:  // /
                        case 60:  // <
                        case 62:  // >
                        case 94:  // ^
                        case 124: // |
                            this.index += 2;
                            return {
                                type: TokenType.Punctuator,
                                value: String.fromCharCode(code) + String.fromCharCode(code2),
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                range: [start, this.index]
                            };

                        case 33: // !
                        case 61: // =
                            this.index += 2;

                            // !== and ===
                            if (this.source.charCodeAt(this.index) === 61) {
                                ++this.index;
                            }
                            return {
                                type: TokenType.Punctuator,
                                value: this.source.slice(start, this.index),
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                range: [start, this.index]
                            };
                        default:
                            break;
                    }
                }
                break;
        }

        // Peek more characters.

        ch2 = this.source[this.index + 1];
        ch3 = this.source[this.index + 2];
        ch4 = this.source[this.index + 3];

        // 4-character punctuator: >>>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            if (ch4 === '=') {
                this.index += 4;
                return {
                    type: TokenType.Punctuator,
                    value: '>>>=',
                    lineNumber: this.lineNumber,
                    lineStart: this.lineStart,
                    range: [start, this.index]
                };
            }
        }

        // 3-character punctuators: === !== >>> <<= >>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            this.index += 3;
            return {
                type: TokenType.Punctuator,
                value: '>>>',
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            this.index += 3;
            return {
                type: TokenType.Punctuator,
                value: '<<=',
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            this.index += 3;
            return {
                type: TokenType.Punctuator,
                value: '>>=',
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }

        // Other 2-character punctuators: ++ -- << >> && ||

        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
            this.index += 2;
            return {
                type: TokenType.Punctuator,
                value: ch1 + ch2,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }

        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++this.index;
            return {
                type: TokenType.Punctuator,
                value: ch1,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }

        this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
    }

    // 7.8.3 Numeric Literals
    scanHexLiteral(start:number):NumericLiteralToken {
        var number = '';

        while (this.index < this.length) {
            if (!this.isHexDigit(this.source[this.index])) {
                break;
            }
            number += this.source[this.index++];
        }

        if (number.length === 0) {
            this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (this.isIdentifierStart(this.source.charCodeAt(this.index))) {
            this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return  {
            type: TokenType.NumericLiteral,
            value: parseInt('0x' + number, 16),
            octal: false,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            range: [start, this.index]
        };
    }

    scanOctalLiteral(start):NumericLiteralToken {
        var number = '0' + this.source[this.index++];
        while (this.index < this.length) {
            if (!this.isOctalDigit(this.source[this.index])) {
                break;
            }
            number += this.source[this.index++];
        }

        if (this.isIdentifierStart(this.source.charCodeAt(this.index)) ||
            this.isDecimalDigit(this.source.charCodeAt(this.index))) {
            this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: TokenType.NumericLiteral,
            value: parseInt(number, 8),
            octal: true,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            range: [start, this.index]
        };
    }

    scanNumericLiteral():NumericLiteralToken {
        var number:string,
            start:number,
            ch:string;

        ch = this.source[this.index];
        assert(this.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
            'Numeric literal must start with a decimal digit or a decimal point');

        start = this.index;
        number = '';
        if (ch !== '.') {
            number = this.source[this.index++];
            ch = this.source[this.index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++this.index;
                    return this.scanHexLiteral(start);
                }
                if (this.isOctalDigit(ch)) {
                    return this.scanOctalLiteral(start);
                }

                // decimal number starts with '0' such as '09' is illegal.
                if (ch && this.isDecimalDigit(ch.charCodeAt(0))) {
                    this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
                }
            }

            while (this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                number += this.source[this.index++];
            }
            ch = this.source[this.index];
        }

        if (ch === '.') {
            number += this.source[this.index++];
            while (this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                number += this.source[this.index++];
            }
            ch = this.source[this.index];
        }

        if (ch === 'e' || ch === 'E') {
            number += this.source[this.index++];

            ch = this.source[this.index];
            if (ch === '+' || ch === '-') {
                number += this.source[this.index++];
            }
            if (this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                while (this.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    number += this.source[this.index++];
                }
            } else {
                this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (this.isIdentifierStart(this.source.charCodeAt(this.index))) {
            this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: TokenType.NumericLiteral,
            value: parseFloat(number),
            octal: false,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            range: [start, this.index]
        };
    }

    // 7.8.4 String Literals
    scanStringLiteral():StringLiteralToken {
        var str = '', ch, code, unescaped, restore, octal = false;

        var quote = this.source[this.index];
        assert((quote === '\'' || quote === '"'),
            'String literal must starts with a quote');

        var start = this.index;
        ++this.index;

        while (this.index < this.length) {
            var ch = this.source[this.index++];

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = this.source[this.index++];
                if (!ch || !this.isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
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
                            if (unescaped) {
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
                            if (this.isOctalDigit(ch)) {
                                code = '01234567'.indexOf(ch);

                                // \0 is not octal escape sequence
                                if (code !== 0) {
                                    octal = true;
                                }

                                if (this.index < this.length && this.isOctalDigit(this.source[this.index])) {
                                    octal = true;
                                    code = code * 8 + '01234567'.indexOf(this.source[this.index++]);

                                    // 3 digits are only allowed when string starts
                                    // with 0, 1, 2, 3
                                    if ('0123'.indexOf(ch) >= 0 &&
                                        this.index < this.length &&
                                        this.isOctalDigit(this.source[this.index])) {
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
                    if (ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                }
            } else if (this.isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            this.throwError(null, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: TokenType.StringLiteral,
            value: str,
            octal: octal,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            range: [start, this.index]
        };
    }

    scanRegExp():Token {
        var str, ch, start, pattern, flags, value, classMarker = false, restore, terminated = false;

        this.lookahead = null;
        this.skipComment();

        start = this.index;
        ch = this.source[this.index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = this.source[this.index++];

        while (this.index < this.length) {
            ch = this.source[this.index++];
            str += ch;
            if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '\\') {
                    ch = this.source[this.index++];
                    // ECMA-262 7.8.5
                    if (this.isLineTerminator(ch.charCodeAt(0))) {
                        this.throwError(null, Messages.UnterminatedRegExp);
                    }
                    str += ch;
                } else if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                } else if (this.isLineTerminator(ch.charCodeAt(0))) {
                    this.throwError(null, Messages.UnterminatedRegExp);
                }
            }
        }

        if (!terminated) {
            this.throwError(null, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (this.index < this.length) {
            ch = this.source[this.index];
            if (!this.isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }

            ++this.index;
            if (ch === '\\' && this.index < this.length) {
                ch = this.source[this.index];
                if (ch === 'u') {
                    ++this.index;
                    restore = this.index;
                    ch = this.scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < this.index; ++restore) {
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

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            this.throwError(null, Messages.InvalidRegExp);
        }

        this.peek();

        if (this.tokenize) {
            return {
                type: TokenType.RegularExpression,
                value: value,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [start, this.index]
            };
        }
        return {
            type: TokenType.RegularExpression,
            literal: str,
            value: value,
            range: [start, this.index]
        };
    }

    isIdentifierName(token) {
        return token.type === TokenType.Identifier ||
            token.type === TokenType.Keyword ||
            token.type === TokenType.BooleanLiteral ||
            token.type === TokenType.NullLiteral;
    }

    advanceSlash() {
        var prevToken,
            checkToken;
        // Using the following algorithm:
        // https://github.com/mozilla/sweet.js/wiki/design
        prevToken = this.tokens[this.tokens.length - 1];
        if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return this.scanRegExp();
        }
        if (prevToken.type === "Punctuator") {
            if (prevToken.value === ")") {
                checkToken = this.tokens[this.openParenToken - 1];
                if (checkToken &&
                    checkToken.type === "Keyword" &&
                    (checkToken.value === "if" ||
                        checkToken.value === "while" ||
                        checkToken.value === "for" ||
                        checkToken.value === "with")) {
                    return this.scanRegExp();
                }
                return this.scanPunctuator();
            }
            if (prevToken.value === "}") {
                // Dividing a by anything makes little sense,
                // but we have to check for that.
                if (this.tokens[this.openCurlyToken - 3] &&
                    this.tokens[this.openCurlyToken - 3].type ===
                        "Keyword") {
                    // Anonymous function.
                    checkToken = this.tokens[this.openCurlyToken - 4];
                    if (!checkToken) {
                        return this.scanPunctuator();
                    }
                } else if (this.tokens[this.openCurlyToken - 4] &&
                    this.tokens[this.openCurlyToken - 4].type ===
                        "Keyword") {
                    // Named function.
                    checkToken = this.tokens[this.openCurlyToken - 5];
                    if (!checkToken) {
                        return this.scanRegExp();
                    }
                } else {
                    return this.scanPunctuator();
                }
                // checkToken determines whether the is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                    // It is an expression.
                    return this.scanPunctuator();
                }
                // It is a declaration.
                return this.scanRegExp();
            }
            return this.scanRegExp();
        }
        if (prevToken.type === "Keyword") {
            return this.scanRegExp();
        }
        return this.scanPunctuator();
    }

    advance():Token {
        var ch;

        this.skipComment();

        if (this.index >= this.length) {
            return {
                type: TokenType.EOF,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                range: [this.index, this.index]
            };
        }

        ch = this.source.charCodeAt(this.index);

        // Very common: ( and ) and ;
        if (ch === 40 || ch === 41 || ch === 58) {
            return this.scanPunctuator();
        }

        // String literal starts with single quote (#39) or double quote (#34).
        if (ch === 39 || ch === 34) {
            return this.scanStringLiteral();
        }

        if (this.isIdentifierStart(ch)) {
            return this.scanIdentifier();
        }

        // Dot (.) char #46 can also start a floating-point number, hence the need
        // to check the next character.
        if (ch === 46) {
            if (this.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                return this.scanNumericLiteral();
            }
            return this.scanPunctuator();
        }

        if (this.isDecimalDigit(ch)) {
            return this.scanNumericLiteral();
        }

        // Slash (/) char #47 can also start a regex.
        if (this.tokenize && ch === 47) {
            return this.advanceSlash();
        }

        return this.scanPunctuator();
    }

    lex():Token {
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
    }

    peek() {
        var pos, line, start;

        pos = this.index;
        line = this.lineNumber;
        start = this.lineStart;
        this.lookahead = this.advance();
        this.index = pos;
        this.lineNumber = line;
        this.lineStart = start;
    }

    // Return true if there is a line terminator before the next token.
    peekLineTerminator() {
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
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.
    expect(value) {
        var token = this.lex();
        if (token.type !== TokenType.Punctuator || token.value !== value) {
            this.throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.
    expectKeyword(keyword) {
        var token = this.lex();
        if (token.type !== TokenType.Keyword || token.value !== keyword) {
            this.throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.
    match(value) {
        return this.lookahead.type === TokenType.Punctuator && this.lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword
    matchKeyword(keyword) {
        return this.lookahead.type === TokenType.Keyword && this.lookahead.value === keyword;
    }

    // Return true if the next token is an assignment operator
    matchAssign() {
        var op;

        if (this.lookahead.type !== TokenType.Punctuator) {
            return false;
        }
        op = this.lookahead.value;
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }
}
