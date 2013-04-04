var esprima = require('./third_party/esprima.js'),
    vm = require('vm'),
    fs = require('fs');

vm.runInThisContext(fs.readFileSync(__dirname + '/third_party/esprima_test.js', 'utf-8'));
var result = 'var TP = TypedEsprima.parse, EP = esprima.parse;\ndescribe("Regression Test", function() {\n';
var types = [
    {},
    {range: true},
    {loc: true},
    {range: true, loc: true},
    {range: true, loc: true, tolerant: true},
    {comment: true, range: true},
    {comment: true, loc: true},
    {tokens: true, range: true, loc: true},
    {comment: true, tokens: true, range: true, loc: true}
];

function testError(code) {
    var result = '        it(';
    result += JSON.stringify(code);
    result += ', function () {\n';
    result += '            var test_case = ';
    result += JSON.stringify(code);
    result += ', config;\n';
    types.forEach(function (config) {
        result += "            config = " + JSON.stringify(config) + ";\n";
        result += "            try { TP(test_case, config); } catch (e) { try { EP(test_case, config); } catch (e2) { expect(e).to.eql(e2); } }\n";
    });
    result += '        });\n\n';
    return result;
}

function testAPI(code) {
    var result = '        it(';
    result += JSON.stringify(code);
    result += ', function () {\n';
    result += "            expect(TypedEsprima." + code + ").to.eql(esprima." + code + ");\n";
    result += '        });\n\n';
    return result;
}

function testTokenize(code, fixture) {

    var result = '        it(';
    result += JSON.stringify(code);
    result += ', function () {\n';
    result += '            var test_case = ';
    result += JSON.stringify(code);
    result += ', config;\n';
    var config = {
        comment: true,
        tolerant: true,
        loc: true,
        range: true
    };

    result += "            config = " + JSON.stringify(config) + ";\n";
    if (fixture.errors) {
        result += "            try { TypedEsprima.tokenize(test_case, config); } catch (e) { try { esprima.tokenize(test_case, config); } catch (e2) { expect(e).to.eql(e2); } }\n";
    } else {
        result += "            expect(TypedEsprima.tokenize(test_case, config)).to.eql(esprima.tokenize(test_case, config));\n";
    }
    result += '        });\n\n';
    return result;
}

function testParse(code, syntax) {
    var result = '        it(';
    result += JSON.stringify(code);
    result += ', function () {\n';
    result += '            var test_case = ';
    result += JSON.stringify(code);
    result += ', config;\n';
    var config = {
        comment: (typeof syntax.comments !== 'undefined'),
        range: true,
        loc: true,
        tokens: (typeof syntax.tokens !== 'undefined'),
        raw: true,
        tolerant: (typeof syntax.errors !== 'undefined'),
        source: null
    };

    if (syntax.loc && syntax.loc.source) {
        config.source = syntax.loc.source;
    }

    result += "            config = " + JSON.stringify(config) + ";\n";
    result += "            expect(TP(test_case, config)).to.eql(EP(test_case, config));\n";

    result += '        });\n\n';
    return result;
}
Object.keys(testFixture).forEach(function (category) {
    result += '    describe(' + JSON.stringify(category) + ', function () {\n';
    for (var code in testFixture[category]) {
        var fixture = testFixture[category][code];
        if (fixture.hasOwnProperty('lineNumber')) {
            result += testError(code, fixture);
        } else if (fixture.hasOwnProperty('result')) {
            result += testAPI(code, fixture);
        } else if (fixture instanceof Array) {
            result += testTokenize(code, fixture);
        } else {
            result += testParse(code, fixture);
        }
    }
    result += '    });\n\n';
});
result += '});\n';
console.log(result);