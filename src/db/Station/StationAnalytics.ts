import { STATIONS, PASSENGER_TYPE } from "../../constants";

type CollectionAmountSummary = {
  amount: number, discount: number
}

/**
 * Base class for handling station analytics.
 * @param station The station type for which the analytics are being recorded.
 */
export default class StationAnalytics {

  protected station: STATIONS | undefined;
  protected total_collection: CollectionAmountSummary = { amount: 0, discount: 0 };
  protected passenger_summary: Map<PASSENGER_TYPE, number> = new Map();

  /**
   * Retrieves the total collection summary.
   * @returns The total amount collected and total discount given.
   */
  public getTotalCollection(): CollectionAmountSummary {
    return { ...this.total_collection };
  }

  /**
   * Retrieves the passenger summary.
   * @returns A map of passenger types to their counts.
   */
  public getPassengerSummary(): Map<PASSENGER_TYPE, number> {
    return new Map(this.passenger_summary);
  }

  /**
   * Logs the amount collected at this station.
   * @param amount The amount collected.
   */
  public logCollectionAmount(amount: number): void {
    this.total_collection.amount += amount;
  }

  /**
   * Logs the discount amount given at this station.
   * @param amount The discount amount.
   */
  public logDiscountAmount(amount: number): void {
    this.total_collection.discount += amount;
  }

  /**
   * Logs the type of passenger and increments their count.
   * @param passenger_type The type of passenger (e.g., ADULT, KIDS).
   */
  public logPassengerType(passenger_type: PASSENGER_TYPE): void {
    const updatedCount = (this.passenger_summary.get(passenger_type) || 0) + 1;
    this.passenger_summary.set(passenger_type, updatedCount);
  }

  protected constructor(station: STATIONS) {
    this.station = station;

    // Initializes the passenger summary
    for (const passenger_type of Object.values(PASSENGER_TYPE)) {
      this.passenger_summary.set(passenger_type, 0);
    }
  }
}

/**
 * Singleton class for handling analytics specific to the airport station.
 */
export class AirportStationAnalytics extends StationAnalytics {

  private static _instance = new AirportStationAnalytics();

  /**
   * NOTE: THIS FUNCTION IS PURELY FOR TESTING PURPOSE.
   */
  public static resetState() {
    AirportStationAnalytics._instance = new AirportStationAnalytics();
  }

  /**
   * Returns the singleton instance of AirportStationAnalytics.
   * @returns The singleton instance.
   */
  public static getInstance(): AirportStationAnalytics {
    return AirportStationAnalytics._instance;
  }

  private constructor() {
    super(STATIONS.AIRPORT);
  }
}

/**
 * Singleton class for handling analytics specific to the central station.
 */
export class CentralStationAnalytics extends StationAnalytics {

  private static _instance = new CentralStationAnalytics();


  /**
   * NOTE: THIS FUNCTION IS PURELY FOR TESTING PURPOSE.
   */
  public static resetState() {
    CentralStationAnalytics._instance = new CentralStationAnalytics();
  }

  /**
   * Returns the singleton instance of CentralStationAnalytics.
   * @returns The singleton instance.
   */
  public static getInstance(): CentralStationAnalytics {
    return CentralStationAnalytics._instance;
  }

  private constructor() {
    super(STATIONS.CENTRAL);
  }
}
