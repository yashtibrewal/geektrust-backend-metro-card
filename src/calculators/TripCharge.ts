import { getCharges } from "./BaseCharges";

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
  static getJourneyCharge(passenger_type: string, isReturnJourney: boolean): number {

    if (isReturnJourney) {
      return this.getReturnJourneyCharge(passenger_type);
    } else {
      return getCharges(passenger_type);
    }

  }

}

export default TripChargeCalculator;