import fs from "fs";
import { exit } from 'process';
import { assert, computeNetworkOutput } from './functions.js';

const commandLineArgs = process.argv.slice(2);
const networkFileName = commandLineArgs[0];
const inputsFileName = commandLineArgs[1];
const assertionsFileName = commandLineArgs[2];

if (networkFileName && inputsFileName && assertionsFileName) {
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
        const assertionsStr = fs.readFileSync("./assertions/" + assertionsFileName, 'utf8');
        if (!assertionsStr) {
            console.error("Assertions file is empty");
            exit(1);
        }

        const network = JSON.parse(networkStr);
        console.log("Network loaded successfully");
        
        const inputs = JSON.parse(inputsStr);
        if (inputs.length === 0) {
            console.error("No inputs found");
            exit(1);
        }
        console.log("Inputs loaded successfully");

        const assertions = JSON.parse(assertionsStr);
        if (assertions.length === 0) {
            console.error("No assertions found");
        } else {
            console.log("Assertions loaded successfully");
        }

        inputs.forEach((input, i) => {
            console.log(`\n\tTest ${i}\n`);
            console.log(`\tInput:\t\t`, input);
            const output = computeNetworkOutput(network, input);
            const assertionResult = assert(assertions[i], output);
            if (assertionResult === 0) {
                console.log("\n\t********* Test passed *********\n");
            } else {
                console.log("\n\t********* Test failed *********\n");
            }
            
        });
    } catch (e) {
        console.error("Error reading network file: ", e);
        exit(1);
    }
}
