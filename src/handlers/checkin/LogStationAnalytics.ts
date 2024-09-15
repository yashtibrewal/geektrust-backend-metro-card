import { PASSENGER_TYPE, STATIONS } from "../../constants";
import StationAnalytics, { AirportStationAnalytics, CentralStationAnalytics } from "../../db/Station/StationAnalytics";
import { ERRORS } from "../../errors/errors";

/**
 * Returns the instance of the station used for Station Analytics w.r.t to the station in considertion.
 * 
 * @param station value to the STATIONS enum
 * @returns instance reference to the station analytics
 * @throws error if the station is not present in the enum
 */
function getStationAnalytics(station: string) {
  switch (station) {
    case STATIONS.AIRPORT:
      return AirportStationAnalytics.getInstance();
    case STATIONS.CENTRAL:
      return CentralStationAnalytics.getInstance();
    default:
      throw new Error(ERRORS.INVALID_STATION(station));
  }
}

/**
 * Logs the passenger type to station-specific analytics.
 * 
 * @param from_station The station from which the journey starts.
 * @param passenger_type The type of passenger (e.g., Adult, Senior Citizen, Kids).
 */
export function logPassenger(from_station: string, passenger_type: string): void {
  const analytics = getStationAnalytics(from_station);
  if (analytics) {
    resolvePassengerTypeandLog(passenger_type, analytics);
  }
}

/**
 * Logs the collected and discounted amounts to station-specific analytics.
 * 
 * @param collection_amount The total amount collected including service charge.
 * @param discount The amount discounted from the original charge.
 * @param from_station The station from which the journey starts.
 */
export function logAmount(collection_amount: number, discount: number, from_station: string): void {
  const analytics = getStationAnalytics(from_station);
  analytics.logCollectionAmount(collection_amount);
  analytics.logDiscountAmount(discount);
}


/**
 * Resolves the passenger type and logs it to the given station analytics instance.
 * 
 * @param passenger_type The type of passenger.
 * @param instance The station analytics instance to log data.
 */
export function resolvePassengerTypeandLog(passenger_type: string, instance: StationAnalytics): void {
  if (Object.values(PASSENGER_TYPE).includes(passenger_type as PASSENGER_TYPE)) {
    instance.logPassengerType(passenger_type as PASSENGER_TYPE);
  } else {
    throw new Error(ERRORS.INVALID_PASSENGER_TYPE(passenger_type));
  }
}
