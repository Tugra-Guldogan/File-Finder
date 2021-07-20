const moquire = require('moquire');
const assert = require('assert');

describe('# find which you defined', () => {
  const where = '/foo/bar/qux';
  const which = '.gitignore';

  it('recursively looks for the file', () => {
    let checked = [];

    const expected = {
      dir: `/foo`,
      checked: [`/foo/bar/qux/${which}`, `/foo/bar/${which}`, `/foo/${which}`]
    };

    const fs = {
      statSync: path => {
        checked.push(path);
        if (path === `${expected.dir}/${which}`) {
          return {};
        } else {
          throw new Error();
        }
      }
    };

    const find = moquire('./', { fs });

    const dir = find(where, which);

    assert.deepEqual(dir, expected.dir);
    assert.deepEqual(checked, expected.checked);
  });

  it("throw error when not found", () => {
    const fs = {
      statSync: path => {
        throw new Error();
      }
    };

    const find = moquire('./', { fs });

    assert.throws(() => {
        find(where, which);
    });
  });
});
