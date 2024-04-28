import { loadAssertions, loadInputs, loadNetwork, runCa, runTests } from './functions.js';

const commandLineArgs = process.argv.slice(2);
const runType = commandLineArgs.shift();

if (!runType) {
    console.error("Usage: node main.js <test|ca> <networkFilename> <inputsFilename> <assertionsFilename|numberOfRepetitions>");
    process.exit(1);
}

const [networkFilename, inputsFilename, thirdCommandLineParam] = commandLineArgs;

const network = loadNetwork(networkFilename);
const inputs = loadInputs(inputsFilename);

if (runType === "test") {
    const assertions = loadAssertions(thirdCommandLineParam);
    runTests(network, inputs, assertions);
} else if (runType === "ca") {
    const numberOfRepetitions = thirdCommandLineParam;
    runCa(network, inputs, numberOfRepetitions);
} else process.exit(1);

// main process:
// 1. load the network, inputs and assertions or cellular automata inputs according to the command line arguments
// 2. run the cellular automata or neural network tests
// 3. print the results
// 4. exit the process
//