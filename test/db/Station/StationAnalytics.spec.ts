import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { PASSENGER_TYPE } from '../../../src/constants';
import { AirportStationAnalytics, CentralStationAnalytics } from '../../../src/db/Station/StationAnalytics';

describe('StationAnalytics', () => {

  let airportAnalytics: AirportStationAnalytics;
  let centralAnalytics: CentralStationAnalytics;

  beforeEach(() => {

    AirportStationAnalytics.resetState();
    CentralStationAnalytics.resetState();

    airportAnalytics = AirportStationAnalytics.getInstance();
    centralAnalytics = CentralStationAnalytics.getInstance();

  });

  it('should start with zero collections and discounts for Airport station', () => {
    const totalCollection = airportAnalytics.getTotalCollection();
    expect(totalCollection.amount).to.equal(0);
    expect(totalCollection.discount).to.equal(0);
  });

  it('should log collection amount at Airport station', () => {
    airportAnalytics.logCollectionAmount(100);
    const totalCollection = airportAnalytics.getTotalCollection();
    expect(totalCollection.amount).to.equal(100);
  });

  it('should log discount amount at Airport station', () => {
    airportAnalytics.logDiscountAmount(20);
    const totalCollection = airportAnalytics.getTotalCollection();
    expect(totalCollection.discount).to.equal(20);
  });

  it('should log passenger type correctly at Central station', () => {
    centralAnalytics.logPassengerType(PASSENGER_TYPE.ADULT);
    const passengerSummary = centralAnalytics.getPassengerSummary();
    expect(passengerSummary.get(PASSENGER_TYPE.ADULT)).to.equal(1);
  });

  it('should correctly count multiple passengers of the same type', () => {
    airportAnalytics.logPassengerType(PASSENGER_TYPE.ADULT);
    airportAnalytics.logPassengerType(PASSENGER_TYPE.ADULT);
    const passengerSummary = airportAnalytics.getPassengerSummary();
    expect(passengerSummary.get(PASSENGER_TYPE.ADULT)).to.equal(2);
  });

  it('should correctly differentiate between passenger types', () => {
    centralAnalytics.logPassengerType(PASSENGER_TYPE.ADULT);
    centralAnalytics.logPassengerType(PASSENGER_TYPE.KID);
    const passengerSummary = centralAnalytics.getPassengerSummary();
    expect(passengerSummary.get(PASSENGER_TYPE.ADULT)).to.equal(1);
    expect(passengerSummary.get(PASSENGER_TYPE.KID)).to.equal(1);
  });

  it('should maintain separate records for Airport and Central stations', () => {
    airportAnalytics.logCollectionAmount(50);
    centralAnalytics.logCollectionAmount(30);
    expect(airportAnalytics.getTotalCollection().amount).to.equal(50);
    expect(centralAnalytics.getTotalCollection().amount).to.equal(30);
  });

});
