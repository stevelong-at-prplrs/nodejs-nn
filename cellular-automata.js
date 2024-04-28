import { computeNetworkOutput, loadInputs, loadNetwork, printArray } from './functions.js';

const commandLineArgs = process.argv.slice(2);

const network = loadNetwork(commandLineArgs[0]);
let inputs = loadInputs(commandLineArgs[1]);
const numberOfRepetitions = commandLineArgs[2];

for (let i = 0; i < numberOfRepetitions; i++) {
    printArray(inputs);
    inputs = inputs.map((input, i, arr) => {
        const caInput = [arr[i - 1] ?? 0, input, arr[i + 1] ?? 0];
        const output = computeNetworkOutput(network, caInput)[0];
        return output;
    });
}
