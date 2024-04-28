import { assert, computeNetworkOutput, loadAssertions, loadInputs, loadNetwork } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const [networkFilename, inputsFilename, assertionsFilename] = commandLineArgs;

if (!networkFilename || !inputsFilename || !assertionsFilename) {
    console.error("Usage: node nn-test.js <networkFilename> <inputsFilename> <assertionsFilename>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
const inputs = loadInputs(inputsFilename);
const assertions = loadAssertions(assertionsFilename);

inputs.forEach((input, i) => {
    console.log(`\n\tTest ${i}\n`);
    console.log(`\tInput:\t\t`, input);
    const output = computeNetworkOutput(network, input);
    const assertionResult = assert(assertions[i], output);
    if (assertionResult === 0) {
        console.log("\n\t********* Test passed *********\n");
    } else {
        console.log("\n\t********* Test failed *********\n");
    }
    
});
