import { expect } from 'chai';
import { describe, it } from 'mocha';
import { STATIONS } from '../../../src/constants';
import getDestinationStation from '../../../src/db/Station/Stations';
import { ERRORS } from '../../../src/errors/errors';

describe('getDestinationStation', () => {

  it('should return CENTRAL when the from station is AIRPORT', () => {
    const destination = getDestinationStation(STATIONS.AIRPORT);
    expect(destination).to.equal(STATIONS.CENTRAL);
  });

  it('should return AIRPORT when the from station is CENTRAL', () => {
    const destination = getDestinationStation(STATIONS.CENTRAL);
    expect(destination).to.equal(STATIONS.AIRPORT);
  });

  it('should throw an error for an invalid from station', () => {
    const invalidStation = 'INVALID_STATION';
    expect(() => getDestinationStation(invalidStation))
      .to.throw(Error, ERRORS.INVALID_STATION(invalidStation));
  });

});
