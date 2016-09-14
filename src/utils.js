var os = require('os');
var path = require('path');

module.exports.getRequireLoader = function(filePath, moduleName) {
  var result = [
    'loadChildren: () => new Promise(function (resolve) {\n',
    '  (require as any).ensure([], function (require) {\n',
    '    resolve(require(\'' + filePath + '\')[\'' + moduleName + '\']);\n',
    '  });\n',
    '})'
  ];

  return result.join('');
};

module.exports.getSystemLoader = function(filePath, moduleName) {
  var result = [
    'loadChildren: () => System.import(\'' + filePath + '\')\n',
    '  .then(function(module) {\n',
    '    return module[\'' + moduleName + '\'];\n',
    '  })'
  ];

  return result.join('');
};

module.exports.getFilename = function(resourcePath) {
  var filename = path.basename(resourcePath);

  return path.basename(resourcePath, path.extname(filename));
};

module.exports.normalizeFilePath = function(filePath) {
  if (os.platform() === 'win32') {
    return filePath.replace(/\//g, '\\');
  }

  return filePath;
}
