// functions

const threshold = 0;  // threshold for activation
const verbose = false;

// TODO: ensure that the the length of the input matches the number of input nodes in each layer (model validity check)

export const computeNetworkOutput = (model, input) => model.reduce((input, layer, layerIndex) => calculateLayerOutput(layer, input, layerIndex), input).map(total => total > threshold ? 1 : 0);

export const calculateLayerOutput = (layer, input, layerIndex) => Object.values(layer.reduce((acc, curr, i) => {
        curr.forEach((nw) => acc[nw[0]] = Math.max(-1, (Math.min(1, ((acc[nw[0]] ??  0) + (nw[1] * ((input[i])))) + (nw[2] ?? 0)))));
        if (verbose) {
            console.log("\n\t_____________");
            console.log("\tLayer: ", layerIndex);
            console.log("\tLayer Input (not transformed): ", input);
            console.log("\tNode Index: ", i);
            console.log("\tCurrent Node value: ", curr);
            console.log("\tAcc: ", acc);
            console.log("\t_____________\n");
        }
        return acc;
    }, {}));

export const areArraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

export const assert = (expected, actual) => {
        console.log("\tExpected:\t", expected);
        console.log("\tActual:\t\t", actual);
        if (!Array.isArray(expected) || !Array.isArray(actual) || !areArraysEqual(expected, actual)) {
            const error = new Error(`Test failed: Expected ${expected} but got ${actual}`);
            console.error(error);
            return 1;
        } else {
            return 0;
        }
    }
