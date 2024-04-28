import fs from "fs";
import { exit } from 'process';
import { computeNetworkOutput, printArray } from './functions.js';

const commandLineArgs = process.argv.slice(2);
const networkFileName = commandLineArgs[0];
const inputsFileName = commandLineArgs[1];
const numberOfRepetitions = commandLineArgs[2];

if (networkFileName && inputsFileName) {
    console.log();
    try {
        const networkStr = fs.readFileSync("./networks/" + networkFileName, 'utf8');
        if (!networkStr) {
            console.error("Network file is empty");
            exit(1);
        }
        const inputsStr = fs.readFileSync("./inputs/" + inputsFileName, 'utf8');
        if (!inputsStr) {
            console.error("Inputs file is empty");
            exit(1);
        }

        const network = JSON.parse(networkStr);
        console.log("Network loaded successfully");
        
        let inputs = JSON.parse(inputsStr).map(x => x[0] ? 1 : 0);
        if (inputs.length === 0) {
            console.error("No inputs found");
            exit(1);
        }
        console.log("Inputs loaded successfully");

        if (!numberOfRepetitions) {
            console.error("Number of generations must be greater than 0");
            exit(1);
        }

        console.log(`Computing cellular automata for ${numberOfRepetitions} generations.\n`);

        for (let i = 0; i < numberOfRepetitions; i++) {
            printArray(inputs);
            inputs = inputs.map((input, i, arr) => {
                const caInput = [arr[i - 1] ?? 0, input, arr[i + 1] ?? 0];
                const output = computeNetworkOutput(network, caInput)[0];
                return output;
            });
        }
    } catch (e) {
        console.error("Error reading network file: ", e);
        exit(1);
    }
}
