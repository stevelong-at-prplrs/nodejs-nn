import { assert, computeNetworkOutput, loadAssertions, loadInputs, loadNetwork } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const network = loadNetwork(commandLineArgs[0]);
const inputs = loadInputs(commandLineArgs[1]);
const assertions = loadAssertions(commandLineArgs[2]);

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
