import { getCharges } from "./BaseCharges";

export type JourneyCharge = {
  expected_amount: number;
  discount_applied: number;
};

class TripChargeCalculator {

  // Defines the discount percentage for return journeys.
  private static RETURN_JOURNEY_DISCOUNT = 0.5;

  // Private constructor to prevent instantiation, as the class provides static methods.
  private constructor() {}

  /**
   * Calculates the charge for a return journey by applying a predefined discount.
   * @param passenger_type A string representing the type of passenger (e.g., Adult, Senior Citizen, Kids).
   * @returns The discounted charge for a return journey based on the passenger type.
   */
  static getReturnJourneyCharge(passenger_type: string): number {
    return getCharges(passenger_type) * TripChargeCalculator.RETURN_JOURNEY_DISCOUNT;
  }

  /**
   * Calculates the total journey charge and applies a discount if it is a return journey.
   * @param passenger_type A string representing the type of passenger.
   * @param isReturnJourney A boolean flag indicating whether this is a return journey.
   * @returns An object containing the expected amount and the discount applied (if any).
   */
  static getJourneyCharge(passenger_type: string, isReturnJourney: boolean): JourneyCharge {
    const result = { expected_amount: 0, discount_applied: 0 };

    // Base charge for the journey based on the passenger type
    result.expected_amount = getCharges(passenger_type);
    result.discount_applied = 0;

    // If this is a return journey, apply the discount
    if (isReturnJourney) {
      const original_amount = result.expected_amount;
      result.expected_amount = this.getReturnJourneyCharge(passenger_type);
      result.discount_applied = original_amount - result.expected_amount;
    }

    return result;
  }
}

export default TripChargeCalculator;
