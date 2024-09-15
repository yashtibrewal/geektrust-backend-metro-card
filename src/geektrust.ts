import fs from 'fs';
import path from 'path';
import handleInputCommand from './handlers';

/**
 * Reads the input file specified by the command line argument and processes each line
 * using the `handleInputCommand` function.
 * 
 * @remarks
 * The file path is provided as the second command line argument.
 * Each line of the file is processed separately.
 * 
 * @example
 * If the command line argument is `sample_input/input1.txt`, this script reads 
 * the file and processes each line with `handleInputCommand`.
 * 
 * @throws {Error} Throws an error if the file cannot be read.
 * 
 * @param {string} process.argv[2] - The path to the input file.
 */
const filename = process.argv[2];

// Check if the filename is provided
if (!filename) {
    console.error('No file path provided. Please specify the path to the input file.');
    process.exit(1);
}

// Resolve the absolute path of the file
const absolutePath = path.resolve(filename);

// Check if the file exists
if (!fs.existsSync(absolutePath)) {
    console.error(`The file at ${absolutePath} does not exist.`);
    process.exit(1);
}

/**
 * Reads the content of the specified file and processes it.
 * 
 * @param filename - The path to the file to be read.
 */
fs.readFile(absolutePath, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) throw err;
    
    const inputLines = data.toString().split("\n");
    
    // Process each line in the file
    for (const line of inputLines) {
        // Process the input line using the handler function
        handleInputCommand(line);
    }
});
