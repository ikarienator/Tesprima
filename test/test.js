if (!global.describe) {
    global.describe = function (name, fn) {
        fn();
    };
    global.it = function (name, fn) {
        fn();
    };
}
global.expect = require('expect.js');
global.esprima = require('./third_party/esprima.js');
global.TypedEsprima = require('../tesprima.js');
require('./test.spec.js');
