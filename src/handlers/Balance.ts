import CardTransactionHandler from "../db/CardTransactionHandler";
import { ERRORS } from "../errors/errors";

/**
 * Adds the metro card number and the balance to the memory.
 * This function handles adding a balance for a specified metro card and throws an error for invalid input.
 * 
 * @param arr An array where the first element is the metro card number and the second element is the balance to be added.
 *            Example: ['card_12345', '500']
 * 
 * @throws {Error} Throws an error in the following cases:
 * - If the array or its elements are undefined (INVALID_COMMAND).
 * - If the balance cannot be parsed to a number.
 */
export default function handleBalance(arr: string[] | undefined) {

  const transactionHandler = CardTransactionHandler.getInstance();

  if (arr == undefined || arr[0] == undefined || arr[1] == undefined) {
    throw new Error(ERRORS.INVALID_COMMAND(arr ? arr.join(' ') : ''));
  }

  const card: string = arr[0];
  const balance: number = Number.parseInt(arr[1]);

  if (isNaN(balance)) {
    throw new Error(ERRORS.INVALID_BALANCE);
  }

  transactionHandler.setBalance(card, balance);
}
