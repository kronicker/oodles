var merge = require('package-merge');
var src = fs.readFileSync('workspace/oodles/package.json');
var dst = fs.readFileSync('workspace/oodles2/package.json');

console.log(merge(dst, src));
