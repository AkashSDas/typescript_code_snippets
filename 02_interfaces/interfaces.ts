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

// ====================
// Read-only properties
// ====================
// Some properties should only be modifiable when an object is first created
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 0, y: 0 };
// point.x = 10; // error

// TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T>
// with all mutating methods removed, so you can make sure you don’t change your
// arrays after creation:
let nums$: number[] = [1, 2, 3, 4];
let readOnlyNums: ReadonlyArray<number> = nums$;
// now nums$ arrays cannot be mutate

// Even assigning the entire ReadonlyArray back to a normal array is illegal
// nums$ = readOnlyNums
// let ro: ReadonlyArray<number>; // error
// ro = readOnlyNums; // ok
// Another way of assigning that array back to normal array is type assertion
nums$ = readOnlyNums as number[];

// ====================
// Function Type
// ====================
// Interfaces are also capable of describing function types.

// To describe a function type with an interface, we give the interface a call signature.
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1; // boolean value
};

// ====================
// Indexable Types
// ====================
// Indexable types have an index signature that describes the types we can use to index
// into the object, along with the corresponding return types when indexing.

interface StringArray {
  [index: number]: string;
}

let stringArray: StringArray = ["james", "ethan"];
console.log(stringArray[0]);

// There are two types of supported index signatures: string and number. It is possible to support
// both types of indexers, but the type returned from a numeric indexer must be a subtype of the
// type returned from the string indexer.
// This is because when indexing with a number, JavaScript will actually convert that to a string
// before indexing into an object. That means that indexing with 100 (a number) is the same thing as
// indexing with "100" (a string), so the two need to be consistent.

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// interface NotOk {
//   [x: number]: Animal; // Numeric index type 'Animal' is not assignable to string index type 'Dog'.
//   [y: string]: Dog;
// }

// While string index signatures are a powerful way to describe the “dictionary” pattern, they also
// enforce that all properties match their return type. This is because a string index declares that
// obj.property is also available as obj["property"]. In the following example, name’s type does not
// match the string index’s type, and the type checker gives an error:

// interface NumberDictionary {
//   [index: string]: number;
//   length: number; // ok, length is a number
//   name: string; // error, the type of 'name' is not a subtype of the indexer
//   // Property 'name' of type 'string' is not assignable to string index type 'number'.
// }

// However, properties of different types are acceptable if the index signature is a union of
// the property types:
interface NumberDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // error!
// Index signature in type 'ReadonlyStringArray' only permits reading.

// ====================
// Class Types
// ====================
// Implementing an interface

interface ClockInterface1 {
  currentTime: Date;
}

class Clock1 implements ClockInterface1 {
  currentTime: Date = new Date();
  constructor(h: number, m: number) {}
}

// You can also describe methods in an interface that are implemented in the class,
interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock2 implements ClockInterface2 {
  currentTime: Date = new Date();
  setTime(d: Date): void {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// Interfaces describe the public side of the class, rather than both the public and
// private side. This prohibits you from using them to check that a class also has
// particular types for the private side of the class instance.

// Difference between the static and instance sides of classes

// When working with classes and interfaces, it helps to keep in mind that a class has
// two types: the type of the static side and the type of the instance side. You may
// notice that if you create an interface with a construct signature and try to create
// a class that implements this interface you get an error:

interface ClockConstructor1 {
  new (hour: number, minute: number);
}

// class Clock3 implements ClockConstructor1 {
//   currentTime: Date;
//   constructor(h: number, m: number) {}

//   // Error
//   // Class 'Clock' incorrectly implements interface 'ClockConstructor'.
//   // Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
// }

// This is because when a class implements an interface, only the instance side of
// the class is checked. Since the constructor sits in the static side, it is not
// included in this check.

// Instead, you would need to work with the static side of the class directly. In this
// example, we define two interfaces, ClockConstructor for the constructor and ClockInterface
// for the instance methods. Then, for convenience, we define a constructor function createClock
// that creates instances of the type that is passed to it:

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// Because createClock’s first parameter is of type ClockConstructor, in
// createClock(AnalogClock, 7, 32), it checks that AnalogClock has the correct constructor signature.

// Another simple way is to use class expressions:
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};

// ====================
// Extending Interfaces
// ====================
// Like classes, interfaces can extend each other. This allows you to copy the members of one interface
// into another, which gives you more flexibility in how you separate your interfaces into reusable
// components.

interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square1 = {} as Square;
square1.color = "blue";
square1.sideLength = 10;

// An interface can extend multiple interfaces, creating a combination of all of the interfaces.
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square2 = {} as Square;
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

// ====================
// Hybrid Types
// ====================
// As we mentioned earlier, interfaces can describe the rich types present in real world JavaScript.
// Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object that
//  works as a combination of some of the types described above.

// One such example is an object that acts as both a function and an object, with additional properties:

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// When interacting with 3rd-party JavaScript, you may need to use patterns
// like the above to fully describe the shape of the type.

// ====================
// Interfaces Extending Classes
// ====================
// When an interface type extends a class type it inherits the members of the class
// but not their implementations. t is as if the interface had declared all of the members
// of the class without providing an implementation. Interfaces inherit even the private and
// protected members of a base class. This means that when you create an interface that extends
// a class with private or protected members, that interface type can only be implemented by
// that class or a subclass of it.

// This is useful when you have a large inheritance hierarchy, but want to specify that your
// code works with only subclasses that have certain properties. The subclasses don’t have to be
// related besides inheriting from the base class. For example:

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// class ImageControl implements SelectableControl {
//   // Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
//   // Types have separate declarations of a private property 'state'.
//   private state: any;
//   select() {}
// }

// In the above example, SelectableControl contains all of the members of Control,
// including the private state property. Since state is a private member it is only
// possible for descendants of Control to implement SelectableControl. This is because
// only descendants of Control will have a state private member that originates in the
// same declaration, which is a requirement for private members to be compatible.

// Within the Control class it is possible to access the state private member through an instance
// of SelectableControl. Effectively, a SelectableControl acts like a Control that is known to
// have a select method. The Button and TextBox classes are subtypes of SelectableControl (because
//   they both inherit from Control and have a select method). The ImageControl class has it’s own
//   state private member rather than extending Control, so it cannot implement SelectableControl.
