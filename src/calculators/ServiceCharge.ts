
class ServiceChargeCalculator {

  private static SERVICE_CHARGE = 0.02; // in percentage

  private constructor() {

  }

  /**
   * Takes the base amount and returns the service charge
   * @param base_amount 
   */
  static calculateServiceCharge(base_amount: number): number {

    return ServiceChargeCalculator.SERVICE_CHARGE * base_amount;

  }

}

export default ServiceChargeCalculator;