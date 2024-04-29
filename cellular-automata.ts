// Description: This script runs a cellular automata simulation using a network and inputs provided by the user. This file is an alternate entry point for using the runCa function from functions.js.

import { fetchInputArrays, runCa, useCommandLineArgs } from './functions.js';

const [networkFilename, inputsFilename, numberOfRepetitions] = useCommandLineArgs();

const generations = parseInt(numberOfRepetitions);
if (!networkFilename || !inputsFilename || !generations) {
    console.error("Usage: node cellular-automata.js <networkFilename> <inputsFilename> <numberOfRepetitions>");
    process.exit(1);
}

const [network, inputs] = fetchInputArrays([[networkFilename, "Network"], [inputsFilename, "Inputs"]]);

runCa(network, inputs, generations);
