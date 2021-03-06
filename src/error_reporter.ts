/// <reference path="tesprima.ts"/>
module TypedEsprima {
    export interface IErrorReporter {
        throwError(token:Token, messageFormat:string, arg0?:string, arg1?:string, arg2?:string);
        throwErrorTolerant(token:Token, messageFormat:string);
        throwUnexpected(token:Token);
    }
} // module TypedEsprima

