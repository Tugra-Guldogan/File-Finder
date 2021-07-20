const path = require('path');
const fs = require('fs');

/**
 * '/foo/bar/qux'.split('/') ==> ['', 'foo', 'bar', 'qux']
 */
function find(where, which) {
  if (where.length === 0) {
    throw new Error(`${which} not found in path`);
  }

  try {
    fs.statSync(path.join(where, which));
    return where;
  } catch (e) {}

  where = where.split(path.sep);
  where.pop();
  const dir = where.join(path.sep);

  return find(dir, which);
}

module.exports = find;
