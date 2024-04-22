import fs from "fs";
import { exit } from 'process';
import { computeNetworkOutput } from './functions.js';

const commandLineArgs = process.argv.slice(2);
const modelFileName = commandLineArgs[0];
const inputsFileName = commandLineArgs[1];
const numberOfRepetitions = commandLineArgs[2];

const printArray = (arr) => console.log(arr.map(x => x ? "✺" : " ").join(""));

if (modelFileName && inputsFileName) {
    console.log();
    try {
        const modelStr = fs.readFileSync("./models/" + modelFileName, 'utf8');
        if (!modelStr) {
            console.error("Model file is empty");
            exit(1);
        }
        const inputsStr = fs.readFileSync("./inputs/" + inputsFileName, 'utf8');
        if (!inputsStr) {
            console.error("Inputs file is empty");
            exit(1);
        }

        const model = JSON.parse(modelStr);
        console.log("Model loaded successfully");
        
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
                const output = computeNetworkOutput(model, caInput)[0];
                return output;
            });
        }
    } catch (e) {
        console.error("Error reading model file: ", e);
        exit(1);
    }
}
