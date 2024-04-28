import { loadAssertions, loadInputs, loadNetwork, runTests } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const [networkFilename, inputsFilename, assertionsFilename] = commandLineArgs;

if (!networkFilename || !inputsFilename || !assertionsFilename) {
    console.error("Usage: node nn-test.js <networkFilename> <inputsFilename> <assertionsFilename>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
const inputs = loadInputs(inputsFilename);
const assertions = loadAssertions(assertionsFilename);

runTests(network, inputs, assertions);
