var exec = require('cordova/exec');
var AlipayPlugin = {};
AlipayPlugin.call = function (callName, params, success, error) {
    exec(success, error, 'AlipayPlugin', callName, params);
};
module.exports = AlipayPlugin;