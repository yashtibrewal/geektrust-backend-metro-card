import { getCharges } from "./BaseCharges";

export type JourneyCharge = {
  expected_amount: number;
  discount_applied: number;
}

class TripChargeCalculator {

  private static RETURN_JOURNEY_DISCOUNT = 0.5;

  private constructor() {

  }

  /**
   * Takes the base amount and returns the service charge
   * @param base_amount 
   */
  static getReturnJourneyCharge(passenger_type: string): number {

    return getCharges(passenger_type) * TripChargeCalculator.RETURN_JOURNEY_DISCOUNT;

  }

  /**
   * 
   * @param passenger_type 
   * @param isReturnJourney 
   * @returns 
   */
  static getJourneyCharge(passenger_type: string, isReturnJourney: boolean): JourneyCharge {

    const result = { expected_amount: 0, discount_applied: 0 };
    result.expected_amount = getCharges(passenger_type);
    result.discount_applied = 0;

    if (isReturnJourney) {
      const old_expected_amount = result.expected_amount;
      result.expected_amount = this.getReturnJourneyCharge(passenger_type);
      result.discount_applied = old_expected_amount - result.expected_amount;
    }

    return result;
  }

}

export default TripChargeCalculator;