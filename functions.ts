import fs from "fs";

// constants

const threshold = 0;  // threshold for activation
const verbose = false;

// functions

const getFilePath = (type) => {
    const path = (() => {
        switch (type) {
            case "Network":
                return "./networks";
            case "Inputs":
                return "./inputs";
            case "Assertions":
                return "./assertions";
            default:
                console.error(`Type ${type} is not valid`);
                process.exit(1);
        }
    
    })();
    if (!fs.existsSync(path)) {
        console.error(`Path ${path} does not exist`);
        process.exit(1);
    }
    return path;
};

const loadFile = (fileName, type) => fs.readFileSync(getFilePath(type) + '/' + fileName, 'utf8') || (console.error(`${type} file is empty`) && process.exit(1));

const logOutput = verbose ? (input, layerIndex) => (acc, curr, i) => {
        console.log("\n\t--------------------------");
        console.log("\tlayer index: ", layerIndex);
        console.log("\tnode index: ", i);
        console.log("\tnode input: ", input[i]);
        console.log("\tnode weights: ", curr);
        console.log("\tacc following update: ", acc);
        console.log("\t--------------------------\n");
} : undefined;

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
};

export const computeNetworkOutput = (network, input) => network.reduce((input, layer, layerIndex) => computeLayerOutput(layer, input, layerIndex, logOutput), input).map(total => total > threshold ? 1 : 0);

export const computeLayerOutput = (layer, input, layerIndex, cb) => {
    if (layer.length !== input.length) throw new Error(`Layer ${layerIndex} has ${layer.length} nodes but input has ${input.length} values`);
    const logger = cb ? cb(input, layerIndex) : undefined;
    return Object.values(layer.reduce((acc, curr, i) => {
        curr.forEach((nw) => acc[nw[0]] = Math.max(-1, (Math.min(1, ((acc[nw[0]] ??  0) + (nw[1] * ((input[i])))) + (nw[2] ?? 0)))));
        if (logger) logger(acc, curr, i);
        return acc;
    }, {}))
};

export const fetchInputArrays = (fileNamesAndTypesArray) => fileNamesAndTypesArray.map(([fileName, type]) => JSON.parse(loadFile(fileName, type)));

export const printArray = (arr) => console.log(arr.map(x => x ? "✺" : " ").join(""));

export const runCa = (network, inputs, numberOfRepetitions) => {
    if (!network || !inputs || !numberOfRepetitions) {
        console.error("Error loading network, inputs or numberOfRepetitions");
        process.exit(1);
    }
    for (let i = 0; i < numberOfRepetitions; i++) {
        printArray(inputs);
        inputs = inputs.map((input, i, arr) => {
            const caInput = [arr[i - 1] ?? 0, input, arr[i + 1] ?? 0];
            const output = computeNetworkOutput(network, caInput)[0];
            return output;
        });
    }
};

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

export const useCommandLineArgs = () => process.argv.slice(2);