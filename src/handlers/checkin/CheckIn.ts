import TripChargeCalculator from "../../calculators/TripCharge";
import CardTransactionHandler from "../../db/CardTransactionHandler";
import JourneyHandler from "../../db/Journey";
import { ERRORS } from "../../errors/errors";
import { logAmount, logPassenger } from "./LogStationAnalytics";
import rechargeCard from "./RechargeCard";

/**
 * Handles the check-in process for a metro card, including charging, recharging, and logging.
 * 
 * @param arr An array containing the metro card ID, passenger type, and from station.
 * @throws Error if any of the required parameters are missing or invalid.
 */
export default function handleCheckIn(arr: string[] | undefined): void {
  if (!arr || arr.length < 3) {
    throw new Error(ERRORS.INVALID_COMMAND(arr ? arr.join(' ') : ''));
  }

  const [metro_card, passenger_type, from_station] = arr;
  const is_return_journey = JourneyHandler.getInstance().isReturnJourney(metro_card, from_station);
  const trip_charges = TripChargeCalculator.getJourneyCharge(passenger_type, is_return_journey);
  const expected_trip_cost = trip_charges.expected_amount;

  if (!CardTransactionHandler.getInstance().hasSufficientBalance(metro_card, expected_trip_cost)) {
    rechargeCard(metro_card, trip_charges, from_station);
  }

  CardTransactionHandler.getInstance().chargeCard(metro_card, expected_trip_cost);
  logAmount(expected_trip_cost, trip_charges.discount_applied, from_station);
  JourneyHandler.getInstance().checkInPassenger(metro_card, passenger_type, from_station, is_return_journey);
  logPassenger(from_station, passenger_type);
}
