import fs from 'fs';
import handleInputCommand from './handlers';

const filename = process.argv[2]

fs.readFile(filename, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) throw err
    const inputLines = data.toString().split("\n")
    // Add your code here to process input commands

    for (const line of inputLines) {
        handleInputCommand(line)
    }

});
