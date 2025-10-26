const _ = require('underscore');

let stack = [];

exports.push = function (x) {
  stack.push(x);
};

exports.pop = function () {
  return stack.pop();
};

exports.peek = function () {
    return _.last(stack);
};
