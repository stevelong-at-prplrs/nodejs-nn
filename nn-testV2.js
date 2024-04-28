import { assert, computeNetworkOutput } from './functions.js';

export const runTests = (network, inputs, assertions) => {
    if (!network || !inputs || !assertions) {
        console.error("Error loading network, inputs or assertions");
        process.exit(1);
    }
    
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
};
