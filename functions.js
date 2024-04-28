import fs from "fs";

// functions

const threshold = 0;  // threshold for activation
const verbose = false;

const logOutput = verbose ? (input, layerIndex) => (acc, curr, i) => {
        console.log("\n\t--------------------------");
        console.log("\tlayer index: ", layerIndex);
        console.log("\tnode index: ", i);
        console.log("\tnode input: ", input[i]);
        console.log("\tnode weights: ", curr);
        console.log("\tacc following update: ", acc);
        console.log("\t--------------------------\n");
} : undefined;

const loadFile = (fileName, type) => fs.readFileSync(fileName, 'utf8') || (console.error(`${type} file is empty`) && process.exit(1));

export const loadNetwork = (fileName) => JSON.parse(loadFile("./networks/" + fileName, "Network"));
export const loadInputs = (fileName) => JSON.parse(loadFile("./inputs/" + fileName, "Inputs"));
export const loadAssertions = (fileName) => JSON.parse(loadFile("./assertions/" + fileName, "Assertions"));

export const printArray = (arr) => console.log(arr.map(x => x ? "✺" : " ").join(""));

export const computeNetworkOutput = (network, input) => network.reduce((input, layer, layerIndex) => calculateLayerOutput(layer, input, layerIndex, logOutput), input).map(total => total > threshold ? 1 : 0);

export const calculateLayerOutput = (layer, input, layerIndex, cb) => {
    if (layer.length !== input.length) throw new Error(`Layer ${layerIndex} has ${layer.length} nodes but input has ${input.length} values`);
    const logger = cb ? cb(input, layerIndex) : undefined;
    return Object.values(layer.reduce((acc, curr, i) => {
        curr.forEach((nw) => acc[nw[0]] = Math.max(-1, (Math.min(1, ((acc[nw[0]] ??  0) + (nw[1] * ((input[i])))) + (nw[2] ?? 0)))));
        if (logger) logger(acc, curr, i);
        return acc;
    }, {}))
};

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
