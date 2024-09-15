import { ERRORS } from "../errors/errors";

// This class manages the metro cards and their balances.
export default class CardTransactionHandler {

  // Stores the balance for each metro card, mapped by card ID.
  private balanceMap = new Map<string, number>();

  // Singleton instance of the class.
  private static instance = new CardTransactionHandler();

  // Private constructor to enforce singleton pattern.
  private constructor() { }

  /**
   * Returns the singleton instance of CardTransactionHandler.
   * @returns The singleton instance.
   */
  public static getInstance(): CardTransactionHandler {
    return CardTransactionHandler.instance;
  }

  /**
   * Adds the specified amount to the metro card's balance.
   * @param metro_card The ID of the metro card.
   * @param amount The amount to recharge.
   * @throws Error if the metro card ID is invalid.
   */
  rechargeCard(metro_card: string, amount: number): void {
    const balance = this.balanceMap.get(metro_card);
    if (balance == undefined) {
      throw new Error(ERRORS.INVALID_CARD_ID(metro_card));
    }
    this.balanceMap.set(metro_card, balance + amount);
  }

  /**
   * Sets the initial balance for a metro card.
   * @param metro_card The ID of the metro card.
   * @param balance The balance to set for the card.
   */
  setBalance(metro_card: string, balance: number): void {
    this.balanceMap.set(metro_card, balance);
  }

  /**
   * Retrieves the balance for a specific metro card.
   * @param metro_card The ID of the metro card.
   * @returns The balance of the card.
   * @throws Error if the metro card ID is invalid.
   */
  getBalance(metro_card: string): number {
    const balance = this.balanceMap.get(metro_card);
    if (balance == undefined) {
      throw new Error(ERRORS.INVALID_CARD_ID(metro_card));
    }
    return balance;
  }

  /**
   * Checks if the card has a sufficient balance for a transaction.
   * @param metro_card The ID of the metro card.
   * @param expectedBalance The balance required for the transaction.
   * @returns True if the card has enough balance, otherwise false.
   * @throws Error if the metro card ID is invalid.
   */
  hasSufficientBalance(metro_card: string, expectedBalance: number): boolean {
    const balance = this.balanceMap.get(metro_card);
    if (balance === undefined) {
      throw new Error(ERRORS.INVALID_CARD_ID(metro_card));
    }
    return balance >= expectedBalance;
  }

  /**
   * Deducts the specified amount from the metro card's balance.
   * @param metro_card The ID of the metro card.
   * @param amountToBeCharged The amount to be charged from the card.
   * @returns True if the charge was successful, otherwise false (e.g., insufficient balance).
   * @throws Error if the metro card ID is invalid.
   */
  chargeCard(metro_card: string, amountToBeCharged: number): boolean {
    const balance = this.balanceMap.get(metro_card);
    if (balance === undefined) {
      throw new Error(ERRORS.INVALID_CARD_ID(metro_card));
    }

    if (balance >= amountToBeCharged) {
      this.balanceMap.set(metro_card, balance - amountToBeCharged);
      return true;
    }

    return false; // Optionally, throw an error for insufficient balance.
  }
}
