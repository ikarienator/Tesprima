var tesprima = require('./tesprima.js');
var esprima = require('./esprima.js');
function getSortFilter(filter) {
    "use strict"
    if (!filter) {
        filter = function (k, v) {
            return v;
        };
    }

    return function (key, value) {
        if (typeof value === 'object') {
            if (value instanceof Array || value instanceof RegExp || filter) {
                return filter(key, value);
            }
            var keys = Object.keys(value);
            keys.sort(function (a, b) {
                if (a < b) {
                    return -1;
                } else if (a === b) {
                    return 0;
                } else {
                    return 1;
                }
            });
            var obj = {};
            keys.forEach(function (key) {
                obj[key] = value[key];
            });
            return filter(key, obj);
        } else {
            return filter(key, value);
        }
    };
}

var text = "(1) + (2  ) + 3", t1, t2;
console.log(text);
console.log('01234567890123456789012345678901234567890123456789012345678901234567890123456789');
console.log(t1 = JSON.stringify(tesprima.parse(text, {range: true}), getSortFilter(), 4));
console.log('================================================================================');
console.log(t2 = JSON.stringify(esprima.parse(text, {range: true}), getSortFilter(), 4));
console.log(t1 === t2);