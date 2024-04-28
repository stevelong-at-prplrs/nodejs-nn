// Alternate entry point for using runTests function from functions.js

import { loadAssertions, loadInputs, loadNetwork, runTests, useCommandLineArgs } from './functions.js';

const [networkFilename, inputsFilename, assertionsFilename] = useCommandLineArgs();

if (!networkFilename || !inputsFilename || !assertionsFilename) {
    console.error("Usage: node nn-test.js <networkFilename> <inputsFilename> <assertionsFilename>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
const inputs = loadInputs(inputsFilename);
const assertions = loadAssertions(assertionsFilename);

runTests(network, inputs, assertions);
