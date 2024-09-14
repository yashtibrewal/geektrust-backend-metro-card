import { PASSENGER_TYPE } from "../constants";

/**
 * This function returns the charges mentioned as per the cost section of the charges chart.
 * @param passenger_type Accepts a string that resolves to a type of passenger
 * @returns 
 */
function getCharges(passenger_type: string): number {

  switch (passenger_type) {

    case PASSENGER_TYPE.ADULT:
      return 200;

    case PASSENGER_TYPE.SENIOR_CITIZEN:
      return 100;

    case PASSENGER_TYPE.KIDS:
      return 50;

    default:
      throw new Error('Invalid Passenger Type:' + passenger_type);
  }

}

export {
  getCharges
}