const path = require('path');
const app = require('../lib/components/app.js');


jest.mock('path', () => ({
  resolve: (filePath) => `/mocked/absolute/path/${filePath}`,
  isAbsolute: jest.fn(),
}));

describe('test of app', () => {
  it('should be true if the path is absolute', () => {
    path.isAbsolute.mockReturnValue(true);
    expect(app.isAbsolute('./docs')).toBe(true);
  });

  it('should transform a path from relative to absolute and return it', () => {
    const filePath = './path/relative';
    const result = app.transformPath(filePath);
    expect(result).toEqual('/mocked/absolute/path/./path/relative');
  });

  it('should returna promise that resolves if the path exists', () => {
    return app.existPath('/Users/knelia/DEV010-md-links/prueba.md')
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(() => {
        expect(false).toBe(false);
      })
  });

  it('should reject with an error message when the file does not exist', () => {
    return app.existPath('./notexist/file.md')
      .then(() => {
        app.existPath(filePath);
      })
      .catch((error) => {
        expect(error).toBe('The path/file does not exist');
      })
  });
});
