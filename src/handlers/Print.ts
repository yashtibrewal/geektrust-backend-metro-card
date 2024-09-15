// File to handle buisness logic for creating print text

import { PASSENGER_TYPE, STATIONS } from "../constants";
import StationAnalytics, { AirportStationAnalytics, CentralStationAnalytics } from "../db/Station/StationAnalytics"



/**
 * Generates a summary of total collection and discounts for a given station.
 * @param instance An instance of `StationAnalytics` for the station.
 * @param station The station for which the statistics are being retrieved.
 * @returns A formatted string summarizing the total collection and discounts.
 */
function getStationCollectionStats(instance: StationAnalytics, station: STATIONS): string {
  const { amount, discount } = instance.getTotalCollection();
  return `TOTAL_COLLECTION ${station} ${amount} ${discount}`;
}

/**
 * Creates a formatted string entry for passenger type and count.
 * @param arr A tuple containing a passenger type and its count.
 * @returns A formatted string representing the passenger type and count.
 */
function createPassengetTypeEntry(arr: [PASSENGER_TYPE, number]): string {
  return `${arr[0]} ${arr[1]}`;
}

/**
 * Generates a summary of passenger types and their counts for a given station.
 * @param instance An instance of `StationAnalytics` for the station.
 * @param station The station for which the passenger statistics are being retrieved.
 * @returns A formatted string summarizing passenger types and counts.
 */
function generateStationPassengerStats(instance: StationAnalytics, station: STATIONS): string {
  const passenger_summary = instance.getPassengerSummary();
  const passenger_summary_array = Array.from(passenger_summary.entries());

  // Sort passenger types by count in descending order, then alphabetically if counts are equal.
  passenger_summary_array.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  // Filter out entries with a count of 0 and create formatted strings.
  const generatePatientPassengerStats = [
    ...passenger_summary_array.filter(item => item[1] > 0).slice(0, 3)
  ].map(createPassengetTypeEntry);

  return ['PASSENGER_TYPE_SUMMARY', ...generatePatientPassengerStats].join('\n');
}

/**
 * Handles the generation and printing of station statistics and passenger summaries.
 * Retrieves data for both the airport and central stations and outputs the results.
 */
export default function handlePrintSummary() {
  const airportCollectionStats = getStationCollectionStats(AirportStationAnalytics.getInstance(), STATIONS.AIRPORT);
  const airportPassengerSummary = generateStationPassengerStats(AirportStationAnalytics.getInstance(), STATIONS.AIRPORT);
  const centralCollectionStats = getStationCollectionStats(CentralStationAnalytics.getInstance(), STATIONS.CENTRAL);
  const centralPassengerSummary = generateStationPassengerStats(CentralStationAnalytics.getInstance(), STATIONS.CENTRAL);

  const result = [
    centralCollectionStats,
    centralPassengerSummary,
    airportCollectionStats,
    airportPassengerSummary
  ].join('\n');

  console.log(result);
}
