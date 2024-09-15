


/**
 * Returns the destination station based on from station.
 * @param from_station 
 * @returns 
 */

import { STATIONS } from "../../constants";

export default function getDestinationStation(from_station: string) {

  switch (from_station) {

    case STATIONS.AIRPORT: return STATIONS.CENTRAL;

    case STATIONS.CENTRAL: return STATIONS.AIRPORT;

    default:
      throw new Error('Invalid Station :' + from_station);

  }

}