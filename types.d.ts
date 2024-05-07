type NodeId = number;
type Weight = number;
type Bias = number;

export type NodeWeight = [NodeId, Weight, Bias?];

export type NNNode = NodeWeight[];

export type Layer = NNNode[];

export type LayerInputArray = number[];

export type NeuralNetwork = Layer[];

export type InputArrayType = "Manifest" | "Network" | "Inputs" | "Assertions";

// type ActivationFunction = (x: number) => number;

// type ActivationFunctions = {
//   [key: string]: ActivationFunction;
// };

// type ActivationFunctionName = keyof ActivationFunctions;

// type ActivationFunctionOptions = {
//   [key: string]: number;
// };

// type ActivationFunctionMap = {
//   [key: string]: ActivationFunctionOptions;
// };

// type ActivationFunctionMapName = keyof ActivationFunctionMap;

// type ActivationFunctionMapOptions = {
//   [key: string]: ActivationFunctionOptions;
// };

// type ActivationFunctionMapOptionsName = keyof ActivationFunctionMapOptions;