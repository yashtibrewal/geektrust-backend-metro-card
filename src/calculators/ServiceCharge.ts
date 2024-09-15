import { ERRORS } from "../errors/errors";

class ServiceChargeCalculator {

  private static SERVICE_CHARGE = 0.02; // Service charge as a percentage (2%)

  private constructor() {
    // Private constructor to prevent instantiation
  }

  /**
   * Calculates the service charge based on the given base amount.
   * 
   * @param base_amount The base amount to calculate the service charge from.
   * @returns The calculated service charge, which is 2% of the base amount.
   * 
   * @example
   * const charge = ServiceChargeCalculator.calculateServiceCharge(1000); 
   * // charge will be 20 (2% of 1000)
   */
  static calculateServiceCharge(base_amount: number): number {
    if (base_amount < 0) {
      throw new Error(ERRORS.NEGATIVE_AMOUNT);
    }
    return ServiceChargeCalculator.SERVICE_CHARGE * base_amount;
  }
}

export default ServiceChargeCalculator;
