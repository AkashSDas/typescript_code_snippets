// ****** Interfaces ******
// ====================
// Introduction
// ====================
// The easiest way to see how interfaces work is to start with a simple example:
function printLabel(labeledObj) {
    console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function printAnotherLabel(labeledObj) {
    console.log(labeledObj.label);
}
let myAnotherObj = { size: 10, label: "Size 10 Object" };
printLabel(myAnotherObj);
function createSquare(config) {
    let newSquare = { color: "black", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({ color: "orange" });
