/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');

const { validateSession } = require('../../dist/controllers/session');

describe('the validateSession function', () => {
  it('should return status 401 for unauthorized requests', () => {
    const unauthorizedRequest = {
      session: {
        authorized: false,
      },
    };
    const mockResponse = {
      status: (status) => {
        expect(status).to.equal(401);
        return {
          send: () => { },
        };
      },
    };
    validateSession(unauthorizedRequest, mockResponse);
  });
  it('should return status 200 for authorized requests', () => {
    const unauthorizedRequest = {
      session: {
        authorized: true,
      },
    };
    const mockResponse = {
      status: (status) => {
        expect(status).to.equal(200);
        return {
          send: () => { },
        };
      },
    };
    validateSession(unauthorizedRequest, mockResponse);
  });
});
