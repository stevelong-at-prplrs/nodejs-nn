import { loadAssertions, loadInputs, loadNetwork, runCa, runTests } from './functions.js';

const commandLineArgs = process.argv.slice(2);
const [runType, networkFilename, inputsFilename, thirdCommandLineParam] = commandLineArgs;

if (!runType || !networkFilename || !inputsFilename || !thirdCommandLineParam) {
    console.error("Usage: node main.js <test|ca> <networkFilename> <inputsFilename> <assertionsFilename|numberOfRepetitions>");
    process.exit(1);
}


const network = loadNetwork(networkFilename);
const inputs = loadInputs(inputsFilename);

if (runType === "test") {
    const assertions = loadAssertions(thirdCommandLineParam);
    runTests(network, inputs, assertions);
} else if (runType === "ca") {
    const numberOfRepetitions = thirdCommandLineParam;
    runCa(network, inputs, numberOfRepetitions);
} else process.exit(1);
