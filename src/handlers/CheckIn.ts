// File to handle business logic for check ins

import ServiceChargeCalculator from "../calculators/ServiceCharge";
import TripChargeCalculator, { JourneyCharge } from "../calculators/TripCharge";
import { PASSENGER_TYPE, STATIONS } from "../constants";
import CardTransactionHandler from "../db/CardTransactionHandler";
import JourneyHandler from "../db/Journey";
import Passenger from "../db/Passenger";
import StationAnalytics, { AirportStationAnalytics, CentralStationAnalytics } from "../db/Station/StationAnalytics";

function collectAmountAndRechargeCard(metro_card: string, trip_charges: JourneyCharge, from_station: string) {
  // collect money from passenger including service charge
  const balance = CardTransactionHandler.getInstance().getBalance(metro_card);
  const required_additional_amount = trip_charges.expected_amount - balance;

  const service_charge = ServiceChargeCalculator.calculateServiceCharge(required_additional_amount);
  Passenger.getInstance(metro_card).collectAmount(required_additional_amount + service_charge);
  CardTransactionHandler.getInstance().rechargeCard(metro_card, required_additional_amount);

  logAmount(required_additional_amount, service_charge, trip_charges, from_station)
}

/**
 * 
 * @param required_additional_amount 
 * @param service_charge 
 * @param trip_charges 
 * @param from_station 
 */
function logAmount(
  required_additional_amount: number, service_charge: number, trip_charges: JourneyCharge, from_station: string) {

  // Add records to analytics
  switch (from_station) {
    case STATIONS.AIRPORT:
      AirportStationAnalytics.getInstance().logCollectionAmount(required_additional_amount + service_charge);
      AirportStationAnalytics.getInstance().logDiscountAmount(trip_charges.discount_applied);
      break;
    case STATIONS.CENTRAL:
      CentralStationAnalytics.getInstance().logCollectionAmount(required_additional_amount + service_charge);
      CentralStationAnalytics.getInstance().logDiscountAmount(trip_charges.discount_applied);
      break;
  }

}

function logPassenger(from_station: string, passenger_type: string) {

  // Add records to analytics
  switch (from_station) {
    case STATIONS.AIRPORT:
      resolvePassengerTypeandLog(passenger_type, AirportStationAnalytics.getInstance());
      break;
    case STATIONS.CENTRAL:
      resolvePassengerTypeandLog(passenger_type, CentralStationAnalytics.getInstance());
      break;
  }

}

function resolvePassengerTypeandLog(passenger_type: string, instance: StationAnalytics) {
  switch (passenger_type) {
    case PASSENGER_TYPE.ADULT:
      instance.logPassengerType(PASSENGER_TYPE.ADULT);
      break;
    case PASSENGER_TYPE.KIDS:
      instance.logPassengerType(PASSENGER_TYPE.KIDS);
      break;
    case PASSENGER_TYPE.SENIOR_CITIZEN:
      instance.logPassengerType(PASSENGER_TYPE.SENIOR_CITIZEN);
      break;
    default:
      throw new Error('Invalid passenger type' + passenger_type);
  }
}

export default function handleCheckIn(arr: string[] | undefined) {


  const [metro_card, passenger_type, from_station] = arr || [];

  if (!metro_card || !passenger_type || !from_station) {
    throw new Error('Invalid Command');
  }

  // Calculating expected balance for the trip.

  const isReturnJourney = JourneyHandler.getInstance().isReturnJourney(metro_card, from_station);
  const trip_charges = TripChargeCalculator.getJourneyCharge(passenger_type, isReturnJourney);;
  const expected_trip_cost = trip_charges.expected_amount;


  // Checking sufficient balance
  const hasSufficientBalance = CardTransactionHandler.getInstance().hasSufficientBalance(metro_card, expected_trip_cost);


  // Handling amount collection from passenger
  if (!hasSufficientBalance) {
    collectAmountAndRechargeCard(metro_card, trip_charges, from_station);
    logPassenger(from_station, passenger_type);
  }

  CardTransactionHandler.getInstance().chargeCard(metro_card, expected_trip_cost);
  JourneyHandler.getInstance().checkInPassenger(metro_card, passenger_type, from_station);


}