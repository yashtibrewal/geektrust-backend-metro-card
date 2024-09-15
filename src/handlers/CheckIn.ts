// File to handle business logic for check ins

import ServiceChargeCalculator from "../calculators/ServiceCharge";
import TripChargeCalculator from "../calculators/TripCharge";
import CardTransactionHandler from "../db/CardTransactionHandler";
import JourneyHandler from "../db/Journey";
import Passenger from "../db/Passenger";

function collectAmountAndRechargeCard(metro_card: string, expected_trip_cost: number) {
  // collect money from passenger including service charge
  const balance = CardTransactionHandler.getInstance().getBalance(metro_card);
  const required_additional_amount = expected_trip_cost - balance;

  const service_charge = ServiceChargeCalculator.calculateServiceCharge(required_additional_amount);
  Passenger.getInstance(metro_card).collectAmount(required_additional_amount + service_charge);
  CardTransactionHandler.getInstance().rechargeCard(metro_card, required_additional_amount);
}

export default function handleCheckIn(arr: string[] | undefined) {


  const [metro_card, passenger_type, from_station] = arr || [];

  if (!metro_card || !passenger_type || !from_station) {
    throw new Error('Invalid Command');
  }

  // Calculating expected balance for the trip.

  const isReturnJourney = JourneyHandler.getInstance().isReturnJourney(metro_card, from_station);
  const expected_trip_cost = TripChargeCalculator.getJourneyCharge(passenger_type, isReturnJourney);;

  // Checking sufficient balance
  const hasSufficientBalance = CardTransactionHandler.getInstance().hasSufficientBalance(metro_card, expected_trip_cost);


  // Handling amount collection from passenger
  if (!hasSufficientBalance) {
    collectAmountAndRechargeCard(metro_card, expected_trip_cost);
  }

  CardTransactionHandler.getInstance().chargeCard(metro_card, expected_trip_cost);
  JourneyHandler.getInstance().checkInPassenger(metro_card, passenger_type, from_station);

}