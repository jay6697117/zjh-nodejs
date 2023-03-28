let fs = require('fs');
const root = process.cwd();
console.log('process.argv', process.argv);

const source = `${root}/src/cat/lib/main.js`;
const target = `${root}/src/dst/main.js`;
function copy(target, source) {
  fs.writeFileSync(target, fs.readFileSync(source));
}
