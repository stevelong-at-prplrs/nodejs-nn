import { fetchInputArrays, runCa, runTests, useCommandLineArgs } from './functions.js';

const [runType, networkFilename, inputsFilename, thirdCommandLineParam] = useCommandLineArgs();

if (!runType || !networkFilename || !inputsFilename || !thirdCommandLineParam) {
    console.error("Usage: node main.js <test|ca> <networkFilename> <inputsFilename> <assertionsFilename|numberOfRepetitions>");
    process.exit(1);
}

const generations = parseInt(thirdCommandLineParam);
const fileTuples = [[networkFilename, "Network"], [inputsFilename, "Inputs"], isNaN(generations) ? [thirdCommandLineParam, "Assertions"] : undefined];
const [network, inputs, assertions] = fetchInputArrays(fileTuples.filter((file) => file));

if (runType === "test") {
    runTests(network, inputs, assertions);
} else if (runType === "ca") {
    runCa(network, inputs, generations);
} else process.exit(1);
