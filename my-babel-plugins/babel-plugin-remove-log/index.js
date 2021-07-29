var visitor = {
  ExpressionStatement: {
    enter (path, state) {
      var opts = state.opts
      var node = path.node;
      var expression = node.expression
      var object = expression.object || expression.callee.object
      var property = expression.property || expression.callee.property
      if (
        object && object.name === 'console' &&
        property && ( 
          property.name === 'log' || 
          (opts.warn && (property.name === 'warn')) ||
          (opts.error && (property.name === 'error'))
        ) 
      ) {
        path.remove()
      }
    },
    // exit (path) {
    // }
  }
};


module.exports = function (babel) {
  return {
    visitor
  };
}