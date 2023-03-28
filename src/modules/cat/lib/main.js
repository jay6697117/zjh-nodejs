let head = require('./head');
let body = require('./body');

exports.create = function (name) {
  return {
    name: name,
    head: head.create(),
    body: body.create()
  };
};
