import { STATIONS } from "../../constants";
import { ERRORS } from "../../errors/errors";

/**
 * Returns the destination station based on the given from station.
 * @param from_station The starting station for which the destination is to be determined.
 * @returns The destination station corresponding to the given from station.
 * @throws Error if the provided from station is invalid.
 */
export default function getDestinationStation(from_station: string): string {

  switch (from_station) {

    case STATIONS.AIRPORT:
      return STATIONS.CENTRAL;

    case STATIONS.CENTRAL:
      return STATIONS.AIRPORT;

    default:
      throw new Error(ERRORS.INVALID_STATION(from_station));

  }

}
