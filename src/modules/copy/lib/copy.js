const fs = require("fs");
const readline = require("readline");
const { v4: uuid } = require("uuid");
const src = process.cwd() + "/src";

const source = `${src}/copy/TypeScript开发实战.zip`;
const target = `${src}/dst/${uuid()}.zip`;
const readStream = fs.createReadStream(source);
const writeStream = fs.createWriteStream(target);
const stat = fs.statSync(source);

const totalSize = stat.size;
let passedLength = 0;
let lastSize = 0;
const startTime = Date.now();

readStream.on("data", function (chunk) {
  passedLength += chunk.length;

  if (writeStream.write(chunk) === false) {
    readStream.pause();
  }
});

readStream.on("end", function () {
  writeStream.end();
});

writeStream.on("drain", function () {
  readStream.resume();
});

let timer = null;
timer = setTimeout(function show() {
  let percent = Math.ceil((passedLength / totalSize) * 100);
  let size = Math.ceil(passedLength / 1000000);
  let diff = size - lastSize;
  lastSize = size;
  readline.clearLine();
  readline.cursorTo(0);
  console.log(
    "已完成" + size + "MB, " + percent + "%, 速度：" + diff * 2 + "MB/s"
  );
  if (passedLength < totalSize) {
    setTimeout(show, 500);
  } else {
    let endTime = Date.now();
    console.log();
    console.log("共用时：" + (endTime - startTime) / 1000 + "秒。");
    //清除定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}, 500);
