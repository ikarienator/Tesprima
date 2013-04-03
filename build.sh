echo 'module TypedEsprima {' > tesprima.ts
cat src/ast.ts src/ast_factory.ts src/error.ts src/error_reporter.ts src/lexer.ts src/parser.ts src/tesprima.ts | sed '/^\/\/\/.*$/ d' >> tesprima.ts
echo '}' >> tesprima.ts

/usr/local/bin/node build/tsc.js tesprima.ts @build.config --module amd --out tesprima.js

cat src/fixture-begin.js.txt tesprima.js src/fixture-end.js.txt > out.js

rm tesprima.js
mv out.js tesprima.js