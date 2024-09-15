
import { INPUT_COMMANDS } from "../constants";
import { ERRORS } from "../errors/errors";
import handleBalance from "./Balance";
import handleCheckIn from "./checkin/CheckIn";
import handlePrintSummary from "./Print";


function handleInputCommand(inputLine: string): void {

  const inputWords: string[] = inputLine.split(" ");
  try {
    switch (inputWords[0]) {

      case INPUT_COMMANDS.BALANCE:
        inputWords.shift();
        handleBalance(inputWords);
        break;

      case INPUT_COMMANDS.CHECK_IN:
        inputWords.shift();
        handleCheckIn(inputWords);
        break;

      case INPUT_COMMANDS.PRINT_SUMMARY:
        inputWords.shift();
        handlePrintSummary();
        break;

      default:
        throw new Error(ERRORS.INVALID_COMMAND(inputWords[0]));

    }
  } catch (err: Error | unknown) {
    if (err instanceof Error)
      console.log(err.message);
    else
      console.log(err);
  }

}

export default handleInputCommand;