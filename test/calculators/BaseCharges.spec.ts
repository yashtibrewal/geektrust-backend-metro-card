import { expect } from 'chai';
import { getCharges } from '../../src/calculators/BaseCharges';
import { PASSENGER_TYPE } from '../../src/constants';
import { ERRORS } from '../../src/errors/errors';

describe('getCharges', () => {
  it('should return 200 for ADULT passenger type', () => {
    const result = getCharges(PASSENGER_TYPE.ADULT);
    expect(result).to.equal(200);
  });

  it('should return 100 for SENIOR_CITIZEN passenger type', () => {
    const result = getCharges(PASSENGER_TYPE.SENIOR_CITIZEN);
    expect(result).to.equal(100);
  });

  it('should return 50 for KID passenger type', () => {
    const result = getCharges(PASSENGER_TYPE.KID);
    expect(result).to.equal(50);
  });

  it('should throw an error for an invalid passenger type', () => {
    const invalidType = 'INVALID_TYPE';
    expect(() => getCharges(invalidType)).to.throw(Error, ERRORS.INVALID_PASSENGER_TYPE(invalidType));
  });
});
