import { PASSENGER_TYPE } from "../constants";
import { ERRORS } from "../errors/errors";

/**
 * This function returns the charge based on the type of passenger.
 * 
 * @param passenger_type - A string representing the type of passenger. 
 * It should be one of the values from the `PASSENGER_TYPE` enum.
 * 
 * @returns {number} The corresponding charge for the given passenger type:
 *  - 200 for ADULT
 *  - 100 for SENIOR_CITIZEN
 *  - 50 for KIDS
 * 
 * @throws {Error} If an invalid `passenger_type` is provided, it throws an error 
 * with the message `Invalid Passenger Type: <invalid_type>`.
 */
function getCharges(passenger_type: string): number {
  switch (passenger_type) {
    case PASSENGER_TYPE.ADULT:
      return 200;

    case PASSENGER_TYPE.SENIOR_CITIZEN:
      return 100;

    case PASSENGER_TYPE.KID:
      return 50;

    default:
      throw new Error(ERRORS.INVALID_PASSENGER_TYPE(passenger_type));
  }
}

export {
  getCharges
}
