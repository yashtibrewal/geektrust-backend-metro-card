import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import JourneyHandler from '../../src/db/Journey';
import getDestinationStation from '../../src/db/Station/Stations';

describe('JourneyHandler', () => {
  let journeyHandler: JourneyHandler;
  const metroCardId = 'test_card';
  const passengerType = 'Adult';
  const fromStation = 'AIRPORT';
  const toStation = getDestinationStation(fromStation);

  beforeEach(() => {
    // Get the singleton instance before each test
    journeyHandler = JourneyHandler.getInstance();
  });

  it('should register a check-in for a passenger', () => {
    journeyHandler.checkInPassenger(metroCardId, passengerType, fromStation, false);

    // Verify if the passenger's journey is stored in the handler
    const isReturn = journeyHandler.isReturnJourney(metroCardId, fromStation);
    expect(isReturn).to.be.false;
  });

  it('should correctly identify its not a return journey', () => {
    // First journey
    journeyHandler.checkInPassenger(metroCardId, passengerType, fromStation, false);
    
    // Second journey (return)
    journeyHandler.checkInPassenger(metroCardId, passengerType, toStation, true);

    const isReturn = journeyHandler.isReturnJourney(metroCardId, toStation);
    expect(isReturn).to.be.false;
  });

  it('should not mark a return journey if the previous journey was already discounted', () => {
    journeyHandler.checkInPassenger(metroCardId, passengerType, fromStation, false);
    
    // Simulate a discounted (return) journey
    journeyHandler.checkInPassenger(metroCardId, passengerType, toStation, true);
    
    // Try another journey from the same station, but the last one was already discounted
    const isReturn = journeyHandler.isReturnJourney(metroCardId, toStation);
    expect(isReturn).to.be.false;
  });
});
