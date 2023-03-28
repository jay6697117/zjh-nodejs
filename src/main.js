/*
// Buffer（数据块）
let bin = Buffer.from("hello", "utf-8");
let dup = Buffer.alloc(bin.length);
console.log("bin 1", bin); // <Buffer 68 65 6c 6c 6f>
console.log("dup 1", dup); // <Buffer 00 00 00 00 00>
bin.copy(dup); // <Buffer 68 65 6c 6c 6f>
console.log("dup 2", dup);
dup[0] = 0x66;
console.log("bin 2", bin);
console.log("dup 3", dup);
 */

/*
// Stream（数据流）
// const path = require("path");
// const fs = require("fs");

// let rs = fs.createReadStream(path.join(__dirname, "./example.zip"));
// let ws = fs.createWriteStream(path.join(__dirname, "./dst/example1.zip"));

// let count = 0;
// rs.on("data", function (chunk) {
//   console.log("data run");
//   count += 1;
//   console.log(`chunk - ${count}\n:`, chunk);
//   if (ws.write(chunk) === false) {
//     rs.pause();
//   }
// });

// ws.on("drain", function () {
//   console.log("drain run");
//   rs.resume();
// });

// rs.on("end", function () {
//   console.log("end run");
//   count = 0;
//   ws.end();
// });
*/
/*
// File System（文件系统）
//异步 fs.readFile
// const path = require("path");
// const fs = require("fs");
// fs.readFile(path.join(__dirname,'./example.zip'), (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//同步 fs.readFileSync
// try {
//   const data = fs.readFileSync(path.join(__dirname, "./example.zip"));
//   console.log("data", data);
// } catch (error) {
//   throw error;
// }
 */
/*
// Path（路径）
const path = require("path");
const fs = require("fs");
console.log(path.join("foo/", "/baz", "../bar"));
console.log(path.extname('./example.zip'));
 */
/*
// 遍历目录
// 同步遍历
const path = require('path');
const fs = require('fs');
function travel1(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel1(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}
travel1(path.join(__dirname, './test'), (pathname) => {
  console.log('pathname 1: ', pathname);
});
// console.log('-----------------------------------');
// 异步遍历
function travel2(dir, callback, finish) {
  try {
    fs.readdir(dir, function (err, files) {
      if (err) throw err;
      (function next(i) {
        if (i < files.length) {
          const pathname = path.join(dir, files[i]);
          fs.stat(pathname, (err, stats) => {
            if (err) throw err;
            if (stats.isDirectory()) {
              travel2(pathname, callback, () => {
                next(i + 1);
              });
            } else {
              callback(pathname, () => {
                next(i + 1);
              });
            }
          });
        } else {
          finish && finish();
        }
      })(0);
    });
  } catch (error) {
    console.log(error);
  }
}
travel2(
  path.join(__dirname, './test'),
  (pathname, callback) => {
    console.log('pathname 2:', pathname);
    callback();
  },
  () => {
    console.log('travel finished！');
  }
);
 */
