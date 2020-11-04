// ****** Basic types ******
// ===================
// Boolean
// ===================
let isDone = true;
let isAlive = false;
// ===================
// Number
// ===================
// As in JavaScript, all numbers in TypeScript are either floating point values or BigIntegers.
// These floating point numbers get the type number, while BigIntegers get the type bigint.
let decimal = 6;
let hex = 0xffffff;
let binary = 0b01010;
let octal = 0o744;
let big = 100n;
// ===================
// String
// ===================
let color = "black";
let firstName = "james";
// ===================
// Array
// ===================
let friends = ["james", "bond", "ethan", "hunt"];
let nums = [1, 2, 3, 4];
// ===================
// Tuple
// ===================
// Tuple types allow you to express an array with a fixed number of elements
// whose types are known, but need not be the same.
// For example, you may want to represent a value as a pair of a string and a number
let tuple;
tuple = ["james", 7]; // OK
// tuple = [7, 'james'] // Error
// ===================
// Enum
// ===================
// An enum is a way of giving more friendly names to sets of numeric values.
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
let c1 = Color1.Green;
// By default, enums begin numbering their members starting at 0.
// You can change this by manually setting the value of one of its members.
// For example, we can start the previous example at 1 instead of 0:
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
let c2 = Color2.Green;
// Or, even manually set all the values in the enum:
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
let c3 = Color3.Green;
// A handy feature of enums is that you can also go from a numeric value to the name
// of that value in the enum. For example, if we had the value 2 but weren’t sure what
// that mapped to in the Color enum above, we could look up the corresponding name:
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 3] = "Blue";
})(Color4 || (Color4 = {}));
let colorName = Color4[2];
// Displays 'Green'
console.log(colorName);
// ===================
// Unknown
// ===================
// We may need to describe the type of variables that we do not know when we are writing an application.
// These values may come from dynamic content – e.g. from the user – or we may want to intentionally
// accept all values in our API. In these cases, we want to provide a type that tells the compiler and
// future readers that this variable could be anything, so we give it the unknown type.
let notSure = 4;
notSure = "maybe a string instead";
notSure = false;
// 'maybe' could be a string, object, boolean, undefined, or other types
// const aNumber: number = maybe;
// Type 'unknown' is not assignable to type 'number'
if (maybe === true) {
    // TypeScript knows that maybe is a boolean now
    const aBoolean = maybe;
    // So, it cannot be a string
    // const aString: string = maybe;
    // Type 'boolean' is not assignable to type 'string'.
}
if (typeof maybe === "string") {
    // TypeScript knows that maybe is a string
    const aString = maybe;
    // So, it cannot be a boolean
    // const aBoolean: boolean = maybe;
    // Type 'string' is not assignable to type 'boolean'.
}
// OK, return value of 'getValue' is not checked
const str = getValue("myString");
// The any type is a powerful way to work with existing JavaScript,
// allowing you to gradually opt-in and opt-out of type checking during compilation.
// Unlike unknown, variables of type any allow you to access arbitrary properties,
// even ones that don’t exist. These properties include functions and TypeScript will not check
// their existence or type:
let looselyTyped = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();
let strictlyTyped = 4;
// strictlyTyped.toFixed();
// Object is of type 'unknown'.
// The any will continue to propagate through your objects:
let looselyTyped$ = {};
let d = looselyTyped$.a.b.c.d;
//  ^ = let d: any
// After all, remember that all the convenience of any comes at the cost of losing type safety.
// Type safety is one of the main motivations for using TypeScript and you should try to avoid
// using any when not necessary.
// ===================
// Void
// ===================
// void is a little like the opposite of any: the absence of having any type at all. You may
// commonly see this as the return type of functions that do not return a value:
function greeting() {
    console.log("Hello");
}
// Declaring variables of type void is not useful because you can only assign null
// (only if --strictNullChecks is not specified, see next section) or undefined to them:
let unusable = undefined;
// OK if `--strictNullChecks` is not given
unusable = null;
// ===================
// Null and Undefined
// ===================
// Much like void, they’re not extremely useful on their own:
let u = undefined;
let n = null;
// ===================
// Never
// ===================
// The never type represents the type of values that never occur.
// For instance, never is the return type for a function expression or an arrow function
// expression that always throws an exception or one that never returns.
// Variables also acquire the type never when narrowed by any type guards that can never be true.
// The never type is a subtype of, and assignable to, every type; however, no type is a subtype of,
// or assignable to, never (except never itself). Even any isn’t assignable to never.
// Function returning never must not have a reachable end point
function error(message) {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("Something failed");
}
// Function returning never must not have a reachable end point
function infiniteLoop() {
    while (true) { }
}
create({ props: 0 });
create(null);
// assigning any other data type will give error
// ===================
// Type assertions
// ===================
// A type assertion is like a type cast in other languages, but it performs no special checking
// or restructuring of data. It has no runtime impact and is used purely by the compiler.
// TypeScript assumes that you, the programmer, have performed any special checks that you need.
// Type assertions have two forms.
let someValue = "this is a string";
// 1. as-syntax
let strLength = someValue.length;
// 2. angle-bracket syntax
let strAnotherLength = someValue.length;
// ===================
// About Number, String, Boolean, Symbol and Object
// ===================
// It can be tempting to think that the types Number, String, Boolean, Symbol, or Object
// are the same as the lowercase versions recommended above. These types do not refer to
// the language primitives however, and almost never should be used as a type.
// function reverse(s: String): String {
//   return s.split("").reverse().join("");
// }
// reverse("hello world");
// Instead, use the types number, string, boolean, object and symbol.
function reverse(s) {
    return s.split("").reverse().join("");
}
reverse("hello world");
