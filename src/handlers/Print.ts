// File to handle buisness logic for creating print text

import { PASSENGER_TYPE, STATIONS } from "../constants";
import StationAnalytics, { AirportStationAnalytics, CentralStationAnalytics } from "../db/Station/StationAnalytics"


/**
 * 
 *  Returns calculated travel charges collected, and passenger summary per station in the following format:
 
 TOTAL_COLLECTION AIRPORT <amount of travel charges collected> <total discount given> 
 <PASSENGER_TYPE with highest count from AIRPORT> <passenger type count> 
 <PASSENGER_TYPE with second highest count from AIRPORT> <passenger type count> 
 <PASSENGER_TYPE with least count from AIRPORT> <passenger type count> 
 TOTAL_COLLECTION CENTRAL <amount of travel charges collected> <total discount given> 
 <PASSENGER_TYPE with highest count from CENTRAL> <passenger type count> 
 <PASSENGER_TYPE with second highest count from CENTRAL> <passenger type count> 
 <PASSENGER_TYPE with least count from CENTRAL> <passenger type count> 
 */


function getStationCollectionStats(instance: StationAnalytics, station: STATIONS): string {

  const airportAmount = instance.getTotalCollection().amount;
  const airportDiscount = instance.getTotalCollection().discount;

  return `TOTAL_COLLECTION ${station} ${airportAmount} ${airportDiscount}`

}

/**
 * 
 * @param arr 
 * @returns 
 */
function createPassengetTypeEntry(arr: [PASSENGER_TYPE, number]) {

  return `${arr[0]} ${arr[1]}`;

}

/**
 * 
 * @param instance 
 * @param station 
 * @returns 
 */
function generateStationPassengerStats(instance: StationAnalytics, station: STATIONS): string {


  const passenger_summary = instance.getPasengerSummary();
  const passenger_summary_array = Array.from(passenger_summary.entries());

  passenger_summary_array.sort((a, b) => {
    const [passengerTypeA, countA] = a;
    const [passengerTypeB, countB] = b;

    // First sort by the number value (ascending)
    if (countA !== countB) {
      return countB - countA;
    }

    // If numbers are the same, sort alphabetically by passenger type
    return passengerTypeA.localeCompare(passengerTypeB);
  });


  const top = passenger_summary_array[0];
  const second = passenger_summary_array[1];
  const last = passenger_summary_array[passenger_summary_array.length - 1];

  const generatePatientPassengerStats = [
    top, second, last]
    .filter(item => item[1] > 0)
    .map(item => createPassengetTypeEntry(item));

  const stats = [
    'PASSENGER_TYPE_SUMMARY',
    ...generatePatientPassengerStats
  ].join('\n');


  return stats;
}

/**
 * 
 * @param arr 
 */
export default function handlePrintSummary() {


  const airportCollectionStats = getStationCollectionStats(AirportStationAnalytics.getInstance(), STATIONS.AIRPORT);
  const airportPassengerSummary = generateStationPassengerStats(AirportStationAnalytics.getInstance(), STATIONS.AIRPORT);
  const centralCollectionStats = getStationCollectionStats(CentralStationAnalytics.getInstance(), STATIONS.CENTRAL);
  const centralPassengerSummary = generateStationPassengerStats(CentralStationAnalytics.getInstance(), STATIONS.CENTRAL);

  const result = [centralCollectionStats, centralPassengerSummary, airportCollectionStats, airportPassengerSummary].join('\n');

  console.log(result)

}