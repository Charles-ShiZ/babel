const t = require('babel-types');
const visitor = {
  BinaryExpression: {
    exit (path) {
      const node = path.node;
      let result = eval(`${node.left.value}${node.operator}${node.right.value}`)
      path.replaceWith(t.numericLiteral(result));
    }
  }
};


module.exports = function (babel) {
  return {
    visitor
  };
}