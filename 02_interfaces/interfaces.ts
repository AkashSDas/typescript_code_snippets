// ****** Interfaces ******

// ====================
// Introduction
// ====================
// The easiest way to see how interfaces work is to start with a simple example:
function printLabel(labeledObj: { label: string }): void {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// let myObj = { size: 10 };
// printLabel(myObj);

// The type checker checks the call to printLabel. The printLabel function has a
// single parameter that requires that the object passed in has a property called
// label of type string. Notice that our object actually has more properties than
// this, but the compiler only checks that at least the ones required are present
// and match the types required. There are some cases where TypeScript isn’t as lenient,

// We can write the same example again, this time using an interface to describe the
// requirement of having the label property that is a string:

interface LabeledValue {
  label: string;
}

function printAnotherLabel(labeledObj: LabeledValue): void {
  console.log(labeledObj.label);
}

let myAnotherObj = { size: 10, label: "Size 10 Object" };
printLabel(myAnotherObj);

// let myAnotherObj = { size: 10 };
// printLabel(myAnotherObj);

// The interface LabeledValue is a name we can now use to describe the requirement in the
// previous example. It still represents having a single property called label that is of
// type string. Notice we didn’t have to explicitly say that the object we pass to printLabel
// implements this interface like we might have to in other languages. Here, it’s only the
// shape that matters. If the object we pass to the function meets the requirements listed,
// then it’s allowed.

// It’s worth pointing out that the type checker does not require that these properties come
// in any sort of order, only that the properties the interface requires are present and have
// the required type.

// ====================
// Optional Parameters
// ====================
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
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
