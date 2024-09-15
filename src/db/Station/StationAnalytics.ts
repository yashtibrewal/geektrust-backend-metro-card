// There are only two types of station since the code only handles 2 stations.

import { PASSENGER_TYPE, STATIONS } from "../../constants";

type CollectionAmountSummary = {
  amount: number;
  discount: number;
}


export default class StationAnalytics {

  protected station: STATIONS | undefined;

  protected total_collection: CollectionAmountSummary = {
    amount: 0,
    discount: 0
  };

  public getTotalCollection(): CollectionAmountSummary {
    return {
      ...this.total_collection
    }
  }

  protected passenger_summary: Map<PASSENGER_TYPE, number> = new Map();;

  public getPasengerSummary() {
    return new Map(this.passenger_summary);
  }

  protected constructor(station: STATIONS) {

    this.station = station;

    this.total_collection = {
      amount: 0,
      discount: 0
    }

    // Initializes the passenger summary

    for (const passenger_type of Object.values(PASSENGER_TYPE)) {
      this.passenger_summary.set(passenger_type, 0);
    }

  }


  /**
   * 
   * @param station 
   * @param amount 
   */
  public logCollectionAmount(amount: number) {

    this.total_collection.amount += amount;

  }

  /**
   * 
   * @param station 
   * @param amount 
   */
  public logDiscountAmount(amount: number) {
    this.total_collection.discount += amount;
  }

  /**
   * 
   * @param passenger_type 
   */
  public logPassengerType(passenger_type: PASSENGER_TYPE) {

    const updatedCount = this.passenger_summary.get(passenger_type)! + 1;

    this.passenger_summary.set(passenger_type, updatedCount);
  }

}

export class AirportStationAnalytics extends StationAnalytics {

  private static _instance = new AirportStationAnalytics();

  public static getInstance() {
    return AirportStationAnalytics._instance;
  }

  private constructor() {
    super(STATIONS.AIRPORT);
  }

}


export class CentralStationAnalytics extends StationAnalytics {

  private static _instance = new CentralStationAnalytics();

  public static getInstance() {
    return CentralStationAnalytics._instance;
  }
  constructor() {
    super(STATIONS.CENTRAL);
  }

}