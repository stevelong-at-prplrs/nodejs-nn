import { fetchInputArrays, runCa, runTests, useCommandLineArgs } from './functions.js';
import { InputArrayType } from './types.js';

const [runType, networkFilename, inputsFilename, thirdCommandLineParam] = useCommandLineArgs();

if (!runType || !networkFilename || !inputsFilename || !thirdCommandLineParam) {
    console.error("Usage: node main.js <test|ca> <networkFilename> <inputsFilename> <assertionsFilename|numberOfRepetitions>");
    process.exit(1);
}

const generations = parseInt(thirdCommandLineParam);
const fileTuples = [[networkFilename, "Network"], [inputsFilename, "Inputs"], isNaN(generations) ? [thirdCommandLineParam, "Assertions"] : undefined].filter((tuple) => tuple !== undefined) as [string, InputArrayType][];
const [network, inputs, assertions] = fetchInputArrays(fileTuples);

if (runType === "test") {
    runTests(network, inputs, assertions);
} else if (runType === "ca") {
    runCa(network, inputs, generations);
} else process.exit(1);
