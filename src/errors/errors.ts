// errors.ts

// You can also categorize errors based on modules or features if needed.
export const ERRORS = {
  INVALID_PASSENGER_TYPE: (type: string) => `Invalid Passenger Type ${type}`,
  INVALID_CARD_ID: (cardId: string) => `Invalid Card ID: ${cardId}`,
  INVALID_COMMAND: (command: string) => `Invalid Input Command: ${command}`,
  NEGATIVE_AMOUNT: 'Amount cannot be negative',
  INSUFFICIENT_BALANCE: 'Insufficient balance on the card',
  INVALID_INPUT: 'Invalid Input',
  INVALID_BALANCE: 'Invalid Balance',
  INVALID_STATION: (from_station: string) => `Invalid Card ID: ${from_station}`
};
