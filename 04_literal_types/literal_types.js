// ****** Literal Types ******
// A literal is a more concrete sub-type of a collective type. What
// this means is that "Hello World" is a string, but a string is not
// "Hello World" inside the type system.
// There are three sets of literal types available in TypeScript
// today: strings, numbers, and booleans; by using literal types you
// can allow an exact value which a string, number, or boolean must have.
// =====================
// Literal Narrowing
// =====================
// We're making a guarantee that this variable
// helloWorld will never change, by using const.
// So, TypeScript sets the type to be "Hello World" not string
const helloWorld = "Hello World";
// On the other hand, a let can change, and so the compiler declares it a string
let hiWorld = "Hi World";
class UIElement {
    animate(dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // It's possible that someone could reach this
            // by ignoring your types though.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
// ... more overloads ...
function createElement(tagName) {
    // code goes here
    return;
}
// =====================
// Numeric Literal Types
// =====================
// TypeScript also has numeric literal types, which act the same as the string literals above.
function rollDice() {
    return Math.floor(Math.random() * 6 + 1);
}
const result = rollDice();
