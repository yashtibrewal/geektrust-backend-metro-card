// There are only two types of station since the code only handles 2 stations.

import { STATIONS } from "../constants";



/**
 * Returns the destination station based on from station.
 * @param from_station 
 * @returns 
 */

function getDestinationStation(from_station: string) {

  switch (from_station) {

    case STATIONS.AIRPORT: return STATIONS.CENTRAL;

    case STATIONS.CENTRAL: return STATIONS.AIRPORT;

    default:
      throw new Error('Invalid Station :' + from_station);

  }

}

export {
  getDestinationStation
}