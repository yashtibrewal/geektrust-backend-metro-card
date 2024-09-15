import ServiceChargeCalculator from "../calculators/ServiceCharge";

// This file is to keep the metro cards and thier balances
export default class CardTransactionHandler {

  private balanceMap = new Map<string, number>();
  private static instance = new CardTransactionHandler();

  private constructor() { }

  public static getInstance(): CardTransactionHandler {
    return CardTransactionHandler.instance;
  }

  rechargeCard(metro_card: string, amount: number): void {

    const balance = this.balanceMap.get(metro_card);
    if (balance == undefined) {
      throw new Error('Invalid Metro Card ' + metro_card);
    }
    this.balanceMap.set(metro_card, balance + amount);


  }

  setBalance(metro_card: string, balance: number): void {
    this.balanceMap.set(metro_card, balance);
  }

  getBalance(metro_card: string): number {

    const balance = this.balanceMap.get(metro_card);
    if (balance == undefined) {
      throw new Error('Invalid Metro Card ' + metro_card);
    }
    return balance;
  }

  hasSufficientBalance(metro_card: string, expectedBalance: number): boolean {
    const balance = this.balanceMap.get(metro_card);
    if (balance === undefined) {
      throw new Error('Invalid Card ID: ' + metro_card);
    }
    return balance >= expectedBalance;
  }

  chargeCard(metro_card: string, amountToBeCharged: number): boolean {
    const balance = this.balanceMap.get(metro_card);
    if (balance === undefined) {
      throw new Error('Invalid Card ID: ' + metro_card);
    }

    if (balance >= amountToBeCharged) {
      this.balanceMap.set(metro_card, balance - amountToBeCharged);
      return true;
    }

    return false; // Optionally throw an error here for insufficient balance.
  }
}
