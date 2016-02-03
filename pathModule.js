var path = require("path");

// Normalizing Paths
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));

// Joining Paths
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));

// Resolving Paths
console.log(path.resolve('/foo/bar', './baz'));
console.log(path.resolve('/foo/bar', '/tmp/file/'));
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));

// Relative Paths
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));

// Extracting Directory from Path
console.log(path.dirname('/foo/bar/baz/asdf/quux.txt'));

// Extracting FileName from Path
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));

// Extracting FileName without the file extension
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));

// To get the extn name from Path
console.log(path.extname('/a/b/index.html'));
console.log(path.extname('/a/b.c/index'));
console.log(path.extname('/a/b.c/.'));
console.log(path.extname('/a/b.c/d.'));