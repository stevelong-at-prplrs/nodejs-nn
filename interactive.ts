import select, { Separator } from '@inquirer/select';
import { clearConsole, fetchFileManifest, fetchInputArrays, runCa, runTests, useClosureVar } from "./functions.js";
import { InputArrayType } from './types.js';

interface IProcessData {
    networkName: string;
    inputsName: string;
    assertionsName?: string;
    generationsStr?: string;
    processType: string;
}

const { networks, inputs, assertions } = fetchFileManifest("files-manifest.json"); // instead of a JSON file, we can use a database to store the file names and their contents. But in the interim, we can read directly from the folders or generate the JSON manifest file from the folders.

const mainMenu = async () => await select({ // move these functions to a separate file like menus.ts
        message: 'Select an option',
        choices: [
            new Separator(),
            {
                name: 'Test a network',
                value: 'test',
                description: 'Test a network with inputs and assertions.'
            },
            {
                name: 'Execute a cellular automata', // make this more general? -- iteratively execute a network?
                value: 'ca',
                description: 'Execute a cellular automata with inputs and generations.'
            },
            {
                name: 'Generate a network',
                value: 'generate',
                description: 'Generate a network with random weights and biases.',
                disabled: true
            },
            {
                name: 'Train a network',
                value: 'train',
                description: 'Train a network with inputs and assertions.',
                disabled: true
            },
            // another option: execute a network, either once or iteratively, with inputs and generations
            new Separator()
        ],
    });

const setSelectedOption = async (label: string, choices: string[], setOption: (option: string) => void) => {
    setOption(await select({
        message: `Select a ${label}`,
        choices: choices.map((choice: string) => (
        {
            name: choice,
            value: choice,
            description: label,
        }))
    }));
}

const runNetworkTest = async (): Promise<IProcessData> => {

    const [getNetworkName, setNeworkName] = useClosureVar("");
    const [getInputsName, setInputsName] = useClosureVar("");
    const [getAssertionsName, setAssertionsName] = useClosureVar("");

    return await setSelectedOption("network", networks.filter(networkFilename => !networkFilename.startsWith("rule")), setNeworkName)
        .then(async () => await setSelectedOption("input set", inputs.filter(inputSetName => !inputSetName.startsWith("ca-input")), setInputsName) // available inputs should be constrained by the network type
        .then(async () => await setSelectedOption("assertion set", assertions, setAssertionsName) // available assertions should be constrained by the network type also
        .then(() => {return {networkName: getNetworkName(), inputsName: getInputsName(), assertionsName: getAssertionsName(), processType: "test"}})));

};

const runCellularAutomata = async (): Promise<IProcessData> => {

    const [getNetworkName, setNeworkName] = useClosureVar("");
    const [getInputsName, setInputsName] = useClosureVar("");

    return await setSelectedOption("network", networks.filter(networkFilename => networkFilename.startsWith("rule")), setNeworkName)
        .then(async () => await setSelectedOption("input set", inputs.filter(inputSetName => inputSetName.startsWith("ca-input")), setInputsName)
        .then(() => {return {networkName: getNetworkName(), inputsName: getInputsName(), assertionsName: undefined, processType: "ca", generationsStr: "60"}}));

};

const menu = async (): Promise<IProcessData> => await mainMenu()
    .then((selectedMenuOption) => { // instead of a tupble, we can return an object with named properties
        switch (selectedMenuOption) {
            case "test": return runNetworkTest();
            case "ca": return runCellularAutomata();
            // case "train": return trainNetworkCb(); // should take in a network, inputs, and assertions
            // case "generate": return generateNetworkCb(); // should take in a number of layers and neurons per layer and a network name. note: we can store data as minimized JSON text files in a mongo or sql db, and sanitize them as such -- reject input if any characters other than alphanumberic, comma, and square bracket (because they are JSON arrays of numbers, we are using a subset of JSON here). We can even omit the outer brackets to save space, and possibly compress them even further.
            default:
                console.log("Selection not found. Exiting...");
                process.exit(1);
        }
});

// main
clearConsole();
const {processType, networkName, inputsName, assertionsName, generationsStr} = await menu();

const generations = generationsStr ? parseInt(generationsStr) : 0;
const fileTuples: [string, InputArrayType][] = [[networkName, "Network"], [inputsName, "Inputs"]];
if (assertionsName) fileTuples.push([assertionsName, "Assertions"]);
const [networkArr, inputsArr, assertionsArr] = fetchInputArrays(fileTuples);

switch (processType) {
    case "test": runTests(networkArr, inputsArr, assertionsArr); break;
    case "ca": runCa(networkArr, inputsArr, generations); break;
    default: process.exit(1);
}
