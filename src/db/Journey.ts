// This fille will handle the journey data.

import getDestinationStation from "./Station/Stations";


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

  constructor(passenger_type: string, from_station: string, isDiscounted: boolean) {
    this.passenger_type = passenger_type;
    this.from_station = from_station;
    // by default its not a discount
    this.discounted = isDiscounted;
  }

}


export default class JourneyHandler {

  private passengerJournies = new Map<string, CheckIn[]>();
  private static instance = new JourneyHandler();

  private constructor() { }

  public static getInstance(): JourneyHandler {
    return JourneyHandler.instance;
  }

  /**
   * 
   * @param metro_card 
   * @param passenger_type 
   * @param from_station 
   */
  checkInPassenger(metro_card: string, passenger_type: string, from_station: string, isDiscounted: boolean): void {

    const checkIn = new CheckIn(passenger_type, from_station, isDiscounted);

    let journies = this.passengerJournies.get(metro_card);

    if (journies === undefined) {
      journies = [];
    }

    journies!.push(checkIn);

    this.passengerJournies.set(metro_card, journies!);

  }

  /**
   * @param metro_card 
   * @param from_station 
   */
  isReturnJourney(metro_card: string, from_station: string): boolean {

    // Logic for return station
    // Check if the previous journey is not discounted and the destination station is the from station

    const journies = this.passengerJournies.get(metro_card);
    // console.info(journies);
    let isDiscountedJourney = false;

    if (journies && journies.length > 0) {
      const journey = journies[journies.length - 1]; // getting the previous journey
      if (!journey.discounted && getDestinationStation(from_station) == journey.from_station) {
        isDiscountedJourney = true;
      }
    }

    return isDiscountedJourney;
  }

}
