
import { INPUT_COMMANDS } from "../constants";
import handleBalance from "./Balance";
import handleCheckIn from "./CheckIn";
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
        handlePrintSummary(inputWords);
        break;

      default:
        throw new Error('INPUT COMMAND : ' + inputWords[0] + ' is not indenfined.');

    }
  } catch (err: Error | unknown) {
    if (err instanceof Error)
      console.log(err.message);
  }

}

export default handleInputCommand;