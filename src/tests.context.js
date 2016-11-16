var isNode = typeof module !== "undefined" && module.exports && typeof require == "function";
var isAMD = typeof define === 'function' && typeof define.amd === 'object' && define.amd;

console.log('is node' + isNode, ' type of amd: ' + isAMD);

const context = require.context('.', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;