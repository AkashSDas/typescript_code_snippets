// ****** Functions ******
// ==============================
// Functions in JavaScript
// ==============================
// Named function
function add(num1, num2) {
    return num1 + num2;
}
// Anonymous function
let myAdd = function (num1, num2) {
    return num1 + num2;
};
// Capturing outside variables
let num3 = 10;
function addToZ(num1, num2) {
    return num1 + num2 + num3;
}
// ==============================
// Typing the functions
// ==============================
function addTyped(num1, num2) {
    return num1 + num2;
}
let myAddTyped = function (num1, num2) {
    return num1 + num2;
};
// Writing the function type (full type of the function)
let myFullType = function (num1, num2) {
    return num1 + num2;
};
// A function’s type has the same two parts: the type of the arguments and the return type.
// When writing out the whole function type, both parts are required.
//  We write out the parameter types just like a parameter list, giving each parameter
// a name and a type.
// This name is just to help with readability. We could have instead written:
let incrementFunc = function (x, y) {
    return x + y;
};
// As long as the parameter types line up, it’s considered a valid type for the function,
// regardless of the names you give the parameters in the function type.
// Of note, only the parameters and the return type make up the function type. Captured
// variables are not reflected in the type. In effect, captured variables are part of the
// “hidden state” of any function and do not make up its API.
// ==============================
// Inferring the types
// ==============================
// you may notice that the TypeScript compiler can figure out the type even if you only
// have types on one side of the equation
// The parameters 'x' and 'y' have the type number
let myLessTypedAdd = function (x, y) {
    return x + y;
};
// myAdd has the full function type
let myMoreTypedAdd = function (x, y) {
    return x + y;
};
// This is called “contextual typing”, a form of type inference. This helps cut down on the
// amount of effort to keep your program typed.
// ==============================
// Optional and Default parameter
// ==============================
// By default in TypeScript the number of arguments given to a function has to match the number of
// parameters the function expects.
// In JavaScript, every parameter is optional, and users may leave them off as they see fit.
// When they do, their value is undefined. We can get this functionality in TypeScript by
// adding a ? to the end of parameters we want to be optional
function buildName1(firstName, lastName) {
    if (lastName)
        return `${firstName} ${lastName}`;
    else
        return `${firstName}`;
}
let resultName1 = buildName1("James");
// Any optional parameters must follow required parameters. Had we wanted to make the first
// name optional, rather than the last name, we would need to change the order of parameters
// in the function, putting the first name last in the list.
// Default values
function buildName2(firstName, lastName = "Bond") {
    return `${firstName} ${lastName}`;
}
let resultName2 = buildName2("James"); // works correctly now, returns "James Bond"
let resultName3 = buildName2("James", undefined); // still works, also returns "James Bond"
let resultName4 = buildName2("James", "Hunt");
// Default-initialized parameters that come after all required parameters are treated as
// optional, and just like optional parameters, can be omitted when calling their respective function.
// ==============================
// Rest Parameters
// ==============================
// Required, optional, and default parameters all have one thing in common: they talk about
// one parameter at a time. Sometimes, you want to work with multiple parameters as a group,
// or you may not know how many parameters a function will ultimately take. In JavaScript,
// you can work with the arguments directly using the arguments variable that is visible inside
// every function body.
// In TypeScript, you can gather these arguments together into a variable:
function buildName3(firstName, ...restOfName) {
    return firstName + " " + restOfName.join(" ");
}
// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
// The ellipsis is also used in the type of the function with rest parameters:
let buildNameFun = buildName3;
// ==============================
// this keyword
// ==============================
// *** this and arrow function ***
// In JavaScript, this is a variable that’s set when a function is called. This makes
// it a very powerful and flexible feature, but it comes at the cost of always having to
// know about the context that a function is executing in. This is notoriously confusing,
// especially when returning a function or passing a function as an argument.
let deck1 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return function () {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    },
};
let cardPicker1 = deck1.createCardPicker();
let pickedCard1 = cardPicker1();
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
// Notice that createCardPicker is a function that itself returns a function.
// If we tried to run the example, we would get an error instead of the expected alert box.
// This is because the this being used in the function created by createCardPicker will be set
// to window instead of our deck object. That’s because we call cardPicker() on its own.
// A top-level non-method syntax call like this will use window for this. (Note: under strict mode,
// this will be undefined rather than window).
// We can fix this by making sure the function is bound to the correct this before we return
// the function to be used later. This way, regardless of how it’s later used, it will still be
// able to see the original deck object. To do this, we change the function expression to use the
// ECMAScript 6 arrow syntax.
// ! Arrow functions capture the this where the function is created rather than where it is invoked
let deck2 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    },
};
let cardPicker2 = deck2.createCardPicker();
let pickedCard2 = cardPicker2();
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// ! Even better, TypeScript will warn you when you make this mistake if you pass
// ! the --noImplicitThis flag to the compiler. It will point out that this in
// ! this.suits[pickedSuit] is of type any.
// *** this parameter ***
// Unfortunately, the type of this.suits[pickedSuit] is still any.
// That’s because this comes from the function expression inside the object literal.
// To fix this, you can provide an explicit this parameter. this parameters are
// fake parameters that come first in the parameter list of a function
function f() {
    // make sure `this` is unusable in this standalone function
}
let deck3 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function () {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
    },
};
let cardPicker3 = deck3.createCardPicker();
let pickedCard3 = cardPicker3();
alert("card: " + pickedCard3.card + " of " + pickedCard3.suit);
// this: void means that addClickListener expects onclick to be a function
// that does not require a this type.
// Second, annotate your calling code with this:
// let uiElement: UIElement;
// class Handler1 {
//   info: string;
//   onClickBad(this: Handler, e: Event) {
//     // oops, used `this` here. using this callback would crash at runtime
//     this.info = e.message;
//   }
// }
// let h = new Handler1();
// uiElement.addClickListener(h.onClickBad); // error!
// Argument of type '(this: Handler, e: Event) => void' is not assignable to
// parameter of type '(this: void, e: Event) => void'.
//   The 'this' types of each signature are incompatible.
//     Type 'void' is not assignable to type 'Handler'.
// With this annotated, you make it explicit that onClickBad must be called on an
// instance of Handler. Then TypeScript will detect that addClickListener requires
// a function that has this: void. To fix the error, change the type of this:
let uiElement;
class Handler2 {
    onClickGood(e) {
        // can't use `this` here because it's of type void!
        console.log("clicked!");
    }
}
let h = new Handler2();
uiElement.addClickListener(h.onClickGood);
// Because onClickGood specifies its this type as void, it is legal to pass to
// addClickListener. Of course, this also means that it can’t use this.info.
// If you want both then you’ll have to use an arrow function:
// class Handler3 {
//   info: string;
//   onClickGood = (e: Event) => {
//     this.info = e.message;
//   };
// }
// This works because arrow functions use the outer this, so you can always pass
// them to something that expects this: void. The downside is that one arrow function
// is created per object of type Handler. Methods, on the other hand, are only
// created once and attached to Handler’s prototype. They are shared between
// all objects of type Handler.
// ==============================
// Overloads
// ==============================
// JavaScript is inherently a very dynamic language. It’s not uncommon for a single
// JavaScript function to return different types of objects based on the shape of
// the arguments passed in.
let suits1 = ["hearts", "spades", "clubs", "diamonds"];
function pickCard1(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits1[pickedSuit], card: x % 13 };
    }
}
let myDeck1 = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
];
let pickedCard11 = myDeck1[pickCard1(myDeck1)];
alert("card: " + pickedCard11.card + " of " + pickedCard11.suit);
let pickedCard12 = pickCard1(15);
alert("card: " + pickedCard12.card + " of " + pickedCard12.suit);
// Here, the pickCard function will return two different things based on what the user
// has passed in. If the users passes in an object that represents the deck,
// the function will pick the card. If the user picks the card, we tell them which
// card they’ve picked. But how do we describe this to the type system?
// The answer is to supply multiple function types for the same function as a list of
// overloads. This list is what the compiler will use to resolve function calls. Let’s create
// a list of overloads that describe what our pickCard accepts and what it returns.
let suits2 = ["hearts", "spades", "clubs", "diamonds"];
function pickCard2(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits2[pickedSuit], card: x % 13 };
    }
}
let myDeck2 = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
];
let pickedCard21 = myDeck2[pickCard2(myDeck2)];
alert("card: " + pickedCard21.card + " of " + pickedCard21.suit);
let pickedCard22 = pickCard2(15);
alert("card: " + pickedCard22.card + " of " + pickedCard22.suit);
// With this change, the overloads now give us type checked calls to the pickCard2 function.
// In order for the compiler to pick the correct type check, it follows a similar process to
// the underlying JavaScript. It looks at the overload list and, proceeding with the first
// overload, attempts to call the function with the provided parameters. If it finds a match,
// it picks this overload as the correct overload. For this reason, it’s customary to order
// overloads from most specific to least specific.
// Note that the function pickCard2(x): any piece is not part of the overload list, so it only
// has two overloads: one that takes an object and one that takes a number. Calling pickCard2
// with any other parameter types would cause an error.
