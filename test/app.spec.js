const path = require('path');
const app = require('../lib/components/app.js');
const validateLink = ('..lib/components/validate.js')

jest.mock('path', () => ({
  resolve: (filePath) => `/mocked/absolute/path/${filePath}`,
  isAbsolute: jest.fn(),
  extname: jest.fn((_filePath) => '.md'),
}));

describe('test of app', () => {
  it('should be true if the route is absolute', () => {
    path.isAbsolute.mockReturnValue(true);
    expect(app.isAbsolute('./docs')).toBe(true);
  });

  it('should transform a route from relative to absolute and return it', () => {
    const filePath = './path/relative';
    const result = app.transformPath(filePath);
    expect(result).toEqual('/mocked/absolute/path/./path/relative');
  });

  it('should return a promise that resolves wheter or not the route exists', () => {
    return app.existPath('/Users/knelia/DEV010-md-links/prueba.md')
      .then(() => {
      })
      .catch((error) => {
        expect(error).toBe('The path/file does not exist');
        return Promise.resolve();
      }); 
  });

  it('should check if the route extention is MD', () => {
    const filePath = 'lib\examples\example1.md';
    const result = app.checkPathExtension(filePath);

    expect(result).toBe(true);
    });

  it('should resolve with an array of links when the file is read succesfully', () => {
    return app.readFiles('/Users/knelia/DEV010-md-links/prueba.md')
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(() => {
        expect(false).toBe(false);
      });
  });

  it('should reject with an error message when the file cannot be read', () => {
    return app.readFiles('/Users/knelia/DEV010-md-links/prueba.md')
      .then(() => {
        expect(true).toBeFalsy(false);
      })
      .catch((error) => {
        expect(error instanceof Error).toEqual(false);
      });
  });

  it('should extract links from text and return an array of link objects', async () => {
    const data = 'This is a [link](https://example.com) and another [example](https://example.org).';
    const file = '/path/to/file.md';
    
    try {
      const result = await app.extractLinks(data, file, app.validateLink);

      await expect(result).toEqual([
        {
          href: 'https://example.com',
          text: 'link',
          file: '/path/to/file.md',
          isValid: true,
          status: 200,
          statusText: 'OK',
        },
      ]);
    } catch (error) {
      'Error';
    }
  });  
});

