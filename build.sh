/usr/local/bin/node build/tsc.js src/tesprima.ts @build.config --module amd --out tesprima.js
cat src/fixture-begin.js.txt tesprima.js src/fixture-end.js.txt > out.js
rm tesprima.js
mv out.js tesprima.js
# /usr/local/bin/node test/generate.js > test/test.spec.js
# cp tesprima.js ~/esprima/esprima.js