// test/index.spec.ts

import { describe, it } from 'mocha';
import { expect } from 'chai';


describe('To check if mocha is configured right', () => {
  it('should pass this simple test', () => {
    const result = true;
    expect(result).to.be.true;
  });
});
