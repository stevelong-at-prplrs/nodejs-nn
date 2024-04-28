"use strict";
// Alternate entry point for using runTests function from functions.js
Object.defineProperty(exports, "__esModule", { value: true });
var functions_js_1 = require("./functions.js");
var _a = (0, functions_js_1.useCommandLineArgs)(), networkFilename = _a[0], inputsFilename = _a[1], assertionsFilename = _a[2];
if (!networkFilename || !inputsFilename || !assertionsFilename) {
    console.error("Usage: node nn-test.js <networkFilename> <inputsFilename> <assertionsFilename>");
    process.exit(1);
}
var _b = (0, functions_js_1.fetchInputArrays)([[networkFilename, "Network"], [inputsFilename, "Inputs"], [assertionsFilename, "Assertions"]]), network = _b[0], inputs = _b[1], assertions = _b[2];
(0, functions_js_1.runTests)(network, inputs, assertions);
