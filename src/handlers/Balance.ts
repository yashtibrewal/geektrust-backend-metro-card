// File to handle buisness logic for balance


import CardTransactionHandler from "../db/CardTransactionHandler";


/**
 * Adds the metro card number and the balance to the memory
 * @param arr 
 */
export default function handleBalance(arr: string[] | undefined) {

  // console.info('handleBalance');

  const transactionHandler = CardTransactionHandler.getInstance();

  if (arr == undefined || arr[0] == undefined || arr[1] == undefined) {
    throw new Error('Invalid Command');
  }

  const card: string = arr[0];
  const balance: number = Number.parseInt(arr[1]);

  transactionHandler.setBalance(card, balance);

}