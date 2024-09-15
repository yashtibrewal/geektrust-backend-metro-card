import getDestinationStation from "./Station/Stations";

/**
 * Class representing a passenger's check-in information.
 */
class CheckIn {

  private _passenger_type: string | undefined;

  public get passenger_type(): string | undefined {
    return this._passenger_type;
  }
  private set passenger_type(value: string | undefined) {
    this._passenger_type = value;
  }

  private _from_station: string | undefined;

  public get from_station(): string | undefined {
    return this._from_station;
  }
  private set from_station(value: string | undefined) {
    this._from_station = value;
  }

  private _discounted: boolean | undefined;

  public get discounted(): boolean | undefined {
    return this._discounted;
  }
  private set discounted(value: boolean | undefined) {
    this._discounted = value;
  }

  /**
   * Constructs a new check-in instance with passenger type, origin station, and discount status.
   * @param passenger_type The type of passenger.
   * @param from_station The station from which the passenger starts the journey.
   * @param isDiscounted Whether the journey is discounted (return journey).
   */
  constructor(passenger_type: string, from_station: string, isDiscounted: boolean) {
    this.passenger_type = passenger_type;
    this.from_station = from_station;
    this.discounted = isDiscounted; // By default, the journey is not discounted
  }
}

/**
 * Class responsible for handling the journey operations for passengers.
 */
export default class JourneyHandler {

  private passengerJournies = new Map<string, CheckIn[]>();
  private static instance = new JourneyHandler();

  private constructor() { }

  /**
   * Returns the singleton instance of JourneyHandler.
   * @returns The singleton instance.
   */
  public static getInstance(): JourneyHandler {
    return JourneyHandler.instance;
  }

  /**
   * Registers a check-in for a passenger.
   * @param metro_card The ID of the metro card.
   * @param passenger_type The type of passenger.
   * @param from_station The station the passenger is traveling from.
   * @param isDiscounted Whether the journey is discounted.
   */
  checkInPassenger(metro_card: string, passenger_type: string, from_station: string, isDiscounted: boolean): void {
    const checkIn = new CheckIn(passenger_type, from_station, isDiscounted);
    let journies = this.passengerJournies.get(metro_card);

    if (journies === undefined) {
      journies = [];
    }

    journies.push(checkIn);
    this.passengerJournies.set(metro_card, journies);
  }

  /**
   * Checks if the current journey is a return journey based on previous journey data.
   * @param metro_card The ID of the metro card.
   * @param from_station The station from which the passenger is starting the new journey.
   * @returns True if the current journey is a return journey, otherwise false.
   */
  isReturnJourney(metro_card: string, from_station: string): boolean {
    const journies = this.passengerJournies.get(metro_card);
    let isDiscountedJourney = false;

    if (journies && journies.length > 0) {
      const lastJourney = journies[journies.length - 1]; // Get the last journey (previous journey)
      
      // If the previous journey was not discounted and the destination station is the current station
      if (!lastJourney.discounted && getDestinationStation(from_station) === lastJourney.from_station) {
        isDiscountedJourney = true;
      }
    }

    return isDiscountedJourney;
  }
}
