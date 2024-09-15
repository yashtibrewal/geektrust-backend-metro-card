import { expect } from 'chai';
import { describe, it } from 'mocha';
import { ERRORS } from '../../src/errors/errors';
import ServiceChargeCalculator from '../../src/calculators/ServiceCharge';

describe('ServiceChargeCalculator', () => {
  
  it('should return 20 when base amount is 1000', () => {
    const baseAmount = 1000;
    const result = ServiceChargeCalculator.calculateServiceCharge(baseAmount);
    expect(result).to.equal(20); // 2% of 1000 is 20
  });

  it('should return 0 when base amount is 0', () => {
    const baseAmount = 0;
    const result = ServiceChargeCalculator.calculateServiceCharge(baseAmount);
    expect(result).to.equal(0); // 2% of 0 is 0
  });

  it('should throw an error when base amount is negative', () => {
    const baseAmount = -100;
    expect(() => ServiceChargeCalculator.calculateServiceCharge(baseAmount))
      .to.throw(Error, ERRORS.NEGATIVE_AMOUNT);
  });

  it('should return 1 when base amount is 50', () => {
    const baseAmount = 50;
    const result = ServiceChargeCalculator.calculateServiceCharge(baseAmount);
    expect(result).to.equal(1); // 2% of 50 is 1
  });

  it('should return 50 when base amount is 2500', () => {
    const baseAmount = 2500;
    const result = ServiceChargeCalculator.calculateServiceCharge(baseAmount);
    expect(result).to.equal(50); // 2% of 2500 is 50
  });

});
