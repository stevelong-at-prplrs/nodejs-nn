// Alternate entry point for using runTests function

import { fetchInputArrays, runTests, useCommandLineArgs } from './functions';

const [networkFilename, inputsFilename, assertionsFilename] = useCommandLineArgs();

if (!networkFilename || !inputsFilename || !assertionsFilename) {
    console.error("Usage: node nn-test.js <networkFilename> <inputsFilename> <assertionsFilename>");
    process.exit(1);
}

const [network, inputs, assertions] = fetchInputArrays([[networkFilename, "Network"], [inputsFilename, "Inputs"], [assertionsFilename, "Assertions"]]);

runTests(network, inputs, assertions);
