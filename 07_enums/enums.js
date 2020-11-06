// ****** Enums ******
// Enums allow a developer to define a set of named constants.
// TypeScript provides both numeric and string-based enums.
// ==========================
// Numeric enums
// ==========================
var Direction1;
(function (Direction1) {
    Direction1[Direction1["UP"] = 1] = "UP";
    Direction1[Direction1["DOWN"] = 2] = "DOWN";
    Direction1[Direction1["RIGHT"] = 3] = "RIGHT";
    Direction1[Direction1["LEFT"] = 4] = "LEFT";
})(Direction1 || (Direction1 = {}));
// Above, we have a numeric enum where Up is initialized with 1.
// All of the following members are auto-incremented from that point on.
// Another way to get same thing (leaving the initializer off)
var Direction2;
(function (Direction2) {
    Direction2[Direction2["UP"] = 0] = "UP";
    Direction2[Direction2["DOWN"] = 1] = "DOWN";
    Direction2[Direction2["RIGHT"] = 2] = "RIGHT";
    Direction2[Direction2["LEFT"] = 3] = "LEFT";
})(Direction2 || (Direction2 = {}));
//  This auto-incrementing behavior is useful for cases where we might not
// care about the member values themselves, but do care that each value is
// distinct from other values in the same enum.
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
function respond(recipient, message) {
    // ...
}
respond("Princess Caroline", UserResponse.Yes);
// enums without initializers either need to be first, or have to come after
// numeric enums initialized with numeric constants or other constant enum members.
// enum E {
//   A = getSomeValue(),
//   B
//   // Enum member must have initializer.
// }
// ==========================
// String enums
// ==========================
// In a string enum, each member has to be constant-initialized with a string
// literal, or with another string enum member.
var Direction3;
(function (Direction3) {
    Direction3["Up"] = "UP";
    Direction3["Down"] = "DOWN";
    Direction3["Left"] = "LEFT";
    Direction3["Right"] = "RIGHT";
})(Direction3 || (Direction3 = {}));
// While string enums don’t have auto-incrementing behavior, string enums have the
//  benefit that they “serialize” well i.e. while debugging string values give you the
// some meaning whereas the numeric values don't convey anything
// ==========================
// Hetergenous enum
// ==========================
// Technically enums can be mixed with string and numeric members, but it’s not
// clear why you would ever want to do so:
var BooleanLikeHeterogenousEnum;
(function (BooleanLikeHeterogenousEnum) {
    BooleanLikeHeterogenousEnum[BooleanLikeHeterogenousEnum["No"] = 0] = "No";
    BooleanLikeHeterogenousEnum["Yes"] = "YES";
})(BooleanLikeHeterogenousEnum || (BooleanLikeHeterogenousEnum = {}));
// Unless you’re really trying to take advantage of JavaScript’s runtime behavior in a
// clever way, it’s advised that you don’t do this.
// ==========================
// Computed and constant members
// ==========================
// Each enum member has a value associated with it which can be either constant or computed.
// An enum member is considered constant if:
//  - It is the first member in the enum and it has no initializer, in which case it’s
// assigned the value 0:
var E1;
(function (E1) {
    E1[E1["X"] = 0] = "X";
})(E1 || (E1 = {}));
// E.X is constant:
// It does not have an initializer and the preceding enum member was a numeric constant.
// In this case the value of the current enum member will be the value of the preceding
// enum member plus one.
// All enum members in 'E1' and 'E2' are constant.
var E2;
(function (E2) {
    E2[E2["X"] = 0] = "X";
    E2[E2["Y"] = 1] = "Y";
    E2[E2["Z"] = 2] = "Z";
})(E2 || (E2 = {}));
var E3;
(function (E3) {
    E3[E3["A"] = 1] = "A";
    E3[E3["B"] = 2] = "B";
    E3[E3["C"] = 3] = "C";
})(E3 || (E3 = {}));
// The enum member is initialized with a constant enum expression.
// A constant enum expression is a subset of TypeScript expressions that can be fully
// evaluated at compile time.
// An expression is a constant enum expression if it is:
// - a literal enum expression (basically a string literal or a numeric literal)
// - a reference to previously defined constant enum member (which can originate from a different enum)
// - a parenthesized constant enum expression
// - one of the +, -, ~ unary operators applied to constant enum expression
// - +, -, *, /, %, <<, >>, >>>, &, |, ^ binary operators with constant enum expressions as operands
// It is a compile time error for constant enum expressions to be evaluated to NaN or Infinity.
// In all other cases enum member is considered computed.
var FileAccess;
(function (FileAccess) {
    // constant member
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
// ==========================
// Union enums and enum member types
// ==========================
// There is a special subset of constant enum members that aren’t calculated:
// literal enum members.
// A literal enum member is a constant enum member with no initialized
// value, or with values that are initialized to
// - any string literal (e.g. "foo", "bar, "baz")
// - any numeric literal (e.g. 1, 100)
// - a unary minus applied to any numeric literal (e.g. -1, -100)
// When all members in an enum have literal enum values, some special semantics come to play.
// The first is that enum members also become types as well!
// For example, we can say that certain members can only have the value of an enum member:
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
// let c: Circle = {
//   kind: ShapeKind.Square,
//   // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
//   radius: 100,
// };
// The other change is that enum types themselves effectively become a union of each enum
//  member. With union enums, the type system is able to leverage the fact that it knows
// the exact set of values that exist in the enum itself. Because of that, TypeScript can
// catch bugs where we might be comparing values incorrectly.
var E;
(function (E) {
    E[E["Foo"] = 0] = "Foo";
    E[E["Bar"] = 1] = "Bar";
})(E || (E = {}));
// function f(x: E) {
//   if (x !== E.Foo || x !== E.Bar) {
//     // This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
//     //
//   }
// }
// In that example, we first checked whether x was not E.Foo. If that check succeeds,
// then our || will short-circuit, and the body of the ‘if’ will run. However, if the
// check didn’t succeed, then x can only be E.Foo, so it doesn’t make sense to see whether
//  it’s equal to E.Bar.
// ==========================
// Enums at runtime
// ==========================
// Enums are real objects that exist at runtime. For example, the following enum
var E4;
(function (E4) {
    E4[E4["X"] = 0] = "X";
    E4[E4["Y"] = 1] = "Y";
    E4[E4["Z"] = 2] = "Z";
})(E4 || (E4 = {}));
// can actually be passed around to functions
var E5;
(function (E5) {
    E5[E5["X"] = 0] = "X";
    E5[E5["Y"] = 1] = "Y";
    E5[E5["Z"] = 2] = "Z";
})(E5 || (E5 = {}));
function f(obj) {
    return obj.X;
}
// Works, since 'E5' has a property named 'X' which is a number.
f(E5);
// ==========================
// Enums at compile time
// ==========================
// Even though Enums are real objects that exist at runtime, the keyof keyword
// works differently than you might expect for typical objects. Instead, use
// keyof typeof to get a Type that represents all Enum keys as strings.
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is:", key);
        console.log("Log level value is:", num);
        console.log("Log level message is:", message);
    }
}
printImportant("ERROR", "This is a message");
// ==========================
// Reverse mappings
// ==========================
// In addition to creating an object with property names for members, numeric
// enums members also get a reverse mapping from enum values to enum names.
// For example, in this example:
var Enum6;
(function (Enum6) {
    Enum6[Enum6["A"] = 0] = "A";
})(Enum6 || (Enum6 = {}));
let a = Enum6.A;
let nameOfA = Enum6[a]; // "A"
let directions = [
    0 /* Up */,
    1 /* Down */,
    2 /* Left */,
    3 /* Right */,
];
// One important difference between ambient and non-ambient enums is that, in regular enums,
//  members that don’t have an initializer will be considered constant if its preceding
// enum member is considered constant. In contrast, an ambient (and non-const) enum member
// that does not have initializer is always considered computed.
