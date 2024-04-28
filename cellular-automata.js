// Description: This script runs a cellular automata simulation using a network and inputs provided by the user. This file is an alternate entry point for using the runCa function from functions.js.

import { loadInputs, loadNetwork, runCa, useCommandLineArgs } from './functions.js';

const [networkFilename, inputsFilename, numberOfRepetitions] = useCommandLineArgs();

if (!networkFilename || !inputsFilename || !numberOfRepetitions) {
    console.error("Usage: node cellular-automata.js <networkFilename> <inputsFilename> <numberOfRepetitions>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
let inputs = loadInputs(inputsFilename);

runCa(network, inputs, numberOfRepetitions);
