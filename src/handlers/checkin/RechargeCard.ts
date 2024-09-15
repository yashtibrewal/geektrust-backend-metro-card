import ServiceChargeCalculator from "../../calculators/ServiceCharge";
import { JourneyCharge } from "../../calculators/TripCharge";
import CardTransactionHandler from "../../db/CardTransactionHandler";
import { logAmount } from "./LogStationAnalytics";

/**
 * Recharges the metro card with the required additional amount and service charge.
 * 
 * @param metro_card The ID of the metro card to be recharged.
 * @param trip_charges The calculated trip charges including potential discounts.
 * @param from_station The station from which the journey starts.
 */
export default function rechargeCard(metro_card: string, trip_charges: JourneyCharge, from_station: string): void {
  const balance = CardTransactionHandler.getInstance().getBalance(metro_card);
  const required_additional_amount = trip_charges.expected_amount - balance;
  const service_charge = ServiceChargeCalculator.calculateServiceCharge(required_additional_amount);

  logAmount(service_charge, 0, from_station);

  CardTransactionHandler.getInstance().rechargeCard(metro_card, required_additional_amount);
}
