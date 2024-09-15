// File to store the details of the passenger w.r.t to the metro card

export default class Passenger {

  private static instance = new Passenger();
  private constructor() { }

  public static getInstance(metro_card: string): Passenger {
    return Passenger.instance;
  }

  // dummy function to collection amount from passenger
  /**
   * 
   * @param amount 
   */
  public collectAmount(amount: number) {


  }

}