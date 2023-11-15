const validateLink = require('../lib/components/validate');
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('test of validate links', () => {
  it('should handle no URL', async () => {
    const link = { href: '' };
    const result = await validateLink(link);

    expect(result.isValid).toBe(false);
    expect(result.isBroken).toBe(true);
    expect(result.status).toBe('No URL');
  })
    
  it('should validate the links object for a successful request', async () => {
    const mockResponse = { ok: true, status: 200, statusText: 'OK'};
    fetch.mockResolvedValue(mockResponse);

    const link = { href: 'https://example.com'};
    const result = await validateLink(link);

    expect(result.isValid).toBe(true);
    expect(result.isBroken).toBe(false);
    expect(result.status).toBe(200);
  });

  it('should handle a 404 response properly', async () => {
    const mockResponse = { ok: false, status: 404, statusText: 'Not found'};
    fetch.mockResolvedValue(mockResponse);

    const link = { href: 'https://example.com/not-found' };
    const result = await validateLink(link);

    expect(result.isValid).toBe(false);
    expect(result.isBroken).toBe(true);
    expect(result.status).toBe(404);
  });

  it('should handle other errors', async () => {
    const errorMessage = 'Some error message';
    fetch.mockRejectedValue(new Error(errorMessage));

    const link = { href: 'https://example.com' };
    const result = await validateLink(link);

    expect(result.isValid).toBe(false);
    expect(result.isBroken).toBe(true);
    expect(result.error).toBe(errorMessage);
  });
});