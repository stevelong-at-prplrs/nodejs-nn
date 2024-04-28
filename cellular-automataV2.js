import { computeNetworkOutput, printArray } from './functions.js';

export const runCa = (network, inputs, numberOfRepetitions) => {
    for (let i = 0; i < numberOfRepetitions; i++) {
        printArray(inputs);
        inputs = inputs.map((input, i, arr) => {
            const caInput = [arr[i - 1] ?? 0, input, arr[i + 1] ?? 0];
            const output = computeNetworkOutput(network, caInput)[0];
            return output;
        });
    }
};
