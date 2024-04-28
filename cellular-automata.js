import { loadInputs, loadNetwork, runCa } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const [networkFilename, inputsFilename, numberOfRepetitions] = commandLineArgs;

if (!networkFilename || !inputsFilename || !numberOfRepetitions) {
    console.error("Usage: node cellular-automata.js <networkFilename> <inputsFilename> <numberOfRepetitions>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
let inputs = loadInputs(inputsFilename);

runCa(network, inputs, numberOfRepetitions);
