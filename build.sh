/usr/local/bin/node build/tsc.js @build.config --module amd --out tesprima.js src/tesprima.ts
cat src/fixture.js >> tesprima.js
