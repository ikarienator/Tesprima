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
})(this, function (exports) {
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