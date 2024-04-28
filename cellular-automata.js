import { computeNetworkOutput, loadInputs, loadNetwork, printArray } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const [networkFilename, inputsFilename, numberOfRepetitions] = commandLineArgs;

if (!networkFilename || !inputsFilename || !numberOfRepetitions) {
    console.error("Usage: node cellular-automata.js <networkFilename> <inputsFilename> <numberOfRepetitions>");
    process.exit(1);
}

const network = loadNetwork(networkFilename);
let inputs = loadInputs(inputsFilename);

if (network && inputs) {
    for (let i = 0; i < numberOfRepetitions; i++) {
        printArray(inputs);
        inputs = inputs.map((input, i, arr) => {
            const caInput = [arr[i - 1] ?? 0, input, arr[i + 1] ?? 0];
            const output = computeNetworkOutput(network, caInput)[0];
            return output;
        });
    }
}
