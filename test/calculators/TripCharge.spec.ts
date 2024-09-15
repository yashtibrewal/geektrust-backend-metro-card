import { expect } from 'chai';
import { describe, it } from 'mocha';
import { PASSENGER_TYPE } from '../../src/constants';
import { ERRORS } from '../../src/errors/errors';
import TripChargeCalculator from '../../src/calculators/TripCharge';

describe('TripChargeCalculator', () => {

  describe('getReturnJourneyCharge', () => {
    it('should return 100 for ADULT passenger type', () => {
      const result = TripChargeCalculator.getReturnJourneyCharge(PASSENGER_TYPE.ADULT);
      expect(result).to.equal(100); // 50% discount on 200
    });

    it('should return 50 for SENIOR_CITIZEN passenger type', () => {
      const result = TripChargeCalculator.getReturnJourneyCharge(PASSENGER_TYPE.SENIOR_CITIZEN);
      expect(result).to.equal(50); // 50% discount on 100
    });

    it('should return 25 for KID passenger type', () => {
      const result = TripChargeCalculator.getReturnJourneyCharge(PASSENGER_TYPE.KID);
      expect(result).to.equal(25); // 50% discount on 50
    });

    it('should throw an error for an invalid passenger type', () => {
      const invalidType = 'INVALID_TYPE';
      expect(() => TripChargeCalculator.getReturnJourneyCharge(invalidType))
        .to.throw(Error, ERRORS.INVALID_PASSENGER_TYPE(invalidType));
    });
  });

  describe('getJourneyCharge', () => {
    it('should return expected amount of 200 and no discount for a non-return journey (ADULT)', () => {
      const result = TripChargeCalculator.getJourneyCharge(PASSENGER_TYPE.ADULT, false);
      expect(result.expected_amount).to.equal(200);
      expect(result.discount_applied).to.equal(0);
    });

    it('should return expected amount of 100 and discount of 100 for a return journey (ADULT)', () => {
      const result = TripChargeCalculator.getJourneyCharge(PASSENGER_TYPE.ADULT, true);
      expect(result.expected_amount).to.equal(100); // 50% discount applied
      expect(result.discount_applied).to.equal(100); // 200 - 100 = 100
    });

    it('should return expected amount of 50 and no discount for a non-return journey (SENIOR_CITIZEN)', () => {
      const result = TripChargeCalculator.getJourneyCharge(PASSENGER_TYPE.SENIOR_CITIZEN, false);
      expect(result.expected_amount).to.equal(100);
      expect(result.discount_applied).to.equal(0);
    });

    it('should return expected amount of 50 and discount of 50 for a return journey (SENIOR_CITIZEN)', () => {
      const result = TripChargeCalculator.getJourneyCharge(PASSENGER_TYPE.SENIOR_CITIZEN, true);
      expect(result.expected_amount).to.equal(50); // 50% discount applied
      expect(result.discount_applied).to.equal(50); // 100 - 50 = 50
    });

    it('should throw an error for an invalid passenger type', () => {
      const invalidType = 'INVALID_TYPE';
      expect(() => TripChargeCalculator.getJourneyCharge(invalidType, true))
        .to.throw(Error, ERRORS.INVALID_PASSENGER_TYPE(invalidType));
    });
  });
});
