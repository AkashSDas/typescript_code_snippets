// ****** Generics ******
// ===========================
// Hello World of Generics
// ===========================
// The identity function is a function that will return back whatever is passed in.
// Without generics, we would either have to give the identity function a specific type
function identity1(arg) {
    return arg;
}
// Or, we could describe the identity function using the any type
function identity2(arg) {
    return arg;
}
// While using any is certainly generic in that it will cause the function to accept
// any and all types for the type of arg, we actually are losing the information about
//  what that type was when the function returns. If we passed in a number, the only
// information we have is that any type could be returned.
// Instead, we need a way of capturing the type of the argument in such a way that
// we can also use it to denote what is being returned.
// Here, we will use a type variable, a special kind of variable that works on types
// rather than values.
function identity3(arg) {
    return arg;
}
// This T allows us to capture the type the user provides (e.g. number), so that we
// can use that information later.
// We say that this version of the identity function is generic, as it works over a
// range of types. Unlike using any, it’s also just as precise (ie, it doesn’t lose
// any information) as the first identity function that used numbers for the argument
// and return type.
let output1 = identity3("mystring");
// Here we explicitly set T to be string as one of the arguments to the function
// call, denoted using the <> around the arguments rather than ().
// The second way is also perhaps the most common. Here we use type argument inference —
// that is, we want the compiler to set the value of T for us automatically based on
// the type of the argument we pass in
let output2 = identity3("mystring");
// While type argument inference can be a helpful tool to keep code shorter and more
// readable, you may need to explicitly pass in the type arguments as we did in the
// previous example when the compiler fails to infer the type, as may happen in more
// complex examples.
// ===========================
// Working with Generic Type Variables
// ===========================
// When you begin to use generics, you’ll notice that when you create generic functions
// like identity, the compiler will enforce that you use any generically typed parameters
// in the body of the function correctly. That is, that you actually treat these parameters
// as if they could be any and all types.
function loggedIdentity1(arg) {
    // console.log(arg.length)  // error
    // instead use this
    console.log(arg.toString().length); // this is generic
    return arg;
}
function loggedIdentity2(args) {
    console.log(args.length);
    return args;
}
// we could also have done
function loggedIdentity3(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
// ===========================
// Generic Types
// ===========================
// The type of generic functions is just like those of non-generic
// functions, with the type parameters listed first, similarly to
// function declarations:
function identity4(arg) {
    return arg;
}
let myIdentity1 = identity4;
// We could also have used a different name for the generic type
// parameter in the type, so long as the number of type variables and
// how the type variables are used line up.
let myIdentity2 = identity4;
// We can also write the generic type as a call signature of an object literal type
let myIdentity3 = identity4;
function identity5(arg) {
    return arg;
}
let myIdentity4 = identity5;
function identity6(arg) {
    return arg;
}
let myIdentity5 = identity6;
// Notice that our example has changed to be something slightly different. Instead
// of describing a generic function, we now have a non-generic function signature
// that is a part of a generic type. When we use GenericIdentityFn, we now will
// also need to specify the corresponding type argument (here: number), effectively
// locking in what the underlying call signature will use. Understanding when to
// put the type parameter directly on the call signature and when to put it on the
// interface itself will be helpful in describing what aspects of a type are generic.
// In addition to generic interfaces, we can also create generic classes. Note
// that it is not possible to create generic enums and namespaces.
// ===========================
// Generic Classes
// ===========================
// A generic class has a similar shape to a generic interface.
//  Generic classes have a generic type parameter list in angle
// brackets (<>) following the name of the class.
class GenericNumber1 {
}
let myGenericNumber1 = new GenericNumber1();
myGenericNumber1.zeroValue = 0;
myGenericNumber1.add = function (x, y) {
    return x + y;
};
// This is a pretty literal use of the GenericNumber class, but you may have noticed
//  that nothing is restricting it to only use the number type. We could have instead
// used string or even more complex objects.
// @strict: false
class GenericNumber2 {
}
// ---cut---
let stringNumeric2 = new GenericNumber2();
stringNumeric2.zeroValue = "";
stringNumeric2.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric2.add(stringNumeric2.zeroValue, "test"));
function loggingIdentity2(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
// Because the generic function is now constrained
// it will no longer work over any and all types
// loggingIdentity(3); // error
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
// Instead, we need to pass in values whose type has all the required properties
loggingIdentity2({ length: 10, value: 3 });
// ===========================
// Using Type Parameters in Generic Constraints
// ===========================
// You can declare a type parameter that is constrained by another type parameter.
// For example, here we’d like to get a property from an object given its name.
// We’d like to ensure that we’re not accidentally grabbing a property that does
// not exist on the obj, so we’ll place a constraint between the two types
function getProperty(obj, key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
// getProperty(x, "m"); // error
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
// ===========================
// Using Class Types in Generics
// ===========================
// When creating factories in TypeScript using generics, it is necessary to refer
// to class types by their constructor functions
// For example
function create(c) {
    return new c();
}
// A more advanced example uses the prototype property to infer and constrain
// relationships between the constructor function and the instance side of class types.
class BeeKeeper {
}
class ZooKeeper {
}
class Animal {
}
class Bee extends Animal {
}
class Lion extends Animal {
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
