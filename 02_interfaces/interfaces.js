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
let point = { x: 0, y: 0 };
// point.x = 10; // error
// TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T>
// with all mutating methods removed, so you can make sure you don’t change your
// arrays after creation:
let nums$ = [1, 2, 3, 4];
let readOnlyNums = nums$;
// now nums$ arrays cannot be mutate
// Even assigning the entire ReadonlyArray back to a normal array is illegal
// nums$ = readOnlyNums
// let ro: ReadonlyArray<number>; // error
// ro = readOnlyNums; // ok
// Another way of assigning that array back to normal array is type assertion
nums$ = readOnlyNums;
let mySearch;
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1; // boolean value
};
let stringArray = ["james", "ethan"];
console.log(stringArray[0]);
let myArray = ["Alice", "Bob"];
class Clock1 {
    constructor(h, m) {
        this.currentTime = new Date();
    }
}
class Clock2 {
    constructor(h, m) {
        this.currentTime = new Date();
    }
    setTime(d) {
        this.currentTime = d;
    }
}
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
const Clock = class Clock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
};
let square1 = {};
square1.color = "blue";
square1.sideLength = 10;
let square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
function getCounter() {
    let counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
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
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
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
