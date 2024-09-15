// This fille will handle the journey data.


class CheckIn {

  private passenger_type: string | undefined;
  private from_station: string | undefined;
  private discounted: boolean | undefined;

  constructor(passenger_type: string, from_station: string) {
    this.passenger_type = passenger_type;
    this.from_station = from_station;
    // by default its not a discount
    this.discounted = false;
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
  checkInPassenger(metro_card: string, passenger_type: string, from_station: string): void {

    const checkIn = new CheckIn(passenger_type, from_station);

    let journies = this.passengerJournies.get(metro_card);

    if (journies === undefined) {
      journies = [];
    }

    journies!.push(checkIn);

  }

  /**
   * @param metro_card 
   * @param from_station 
   */
  isReturnJourney(metro_card: string, from_station: string): boolean {

    // TODO: Implement logic to check if its a return journey
    console.error('Unhandled!');

    return false;
  }

}
