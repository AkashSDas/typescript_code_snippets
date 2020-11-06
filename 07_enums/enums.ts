// ****** Enums ******

// Enums allow a developer to define a set of named constants.
// TypeScript provides both numeric and string-based enums.

// ==========================
// Numeric enums
// ==========================
enum Direction1 {
  UP = 1,
  DOWN,
  RIGHT,
  LEFT,
}

// Above, we have a numeric enum where Up is initialized with 1.
// All of the following members are auto-incremented from that point on.

// Another way to get same thing (leaving the initializer off)
enum Direction2 {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

//  This auto-incrementing behavior is useful for cases where we might not
// care about the member values themselves, but do care that each value is
// distinct from other values in the same enum.

enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
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

enum Direction3 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// While string enums don’t have auto-incrementing behavior, string enums have the
//  benefit that they “serialize” well i.e. while debugging string values give you the
// some meaning whereas the numeric values don't convey anything

// ==========================
// Hetergenous enum
// ==========================

// Technically enums can be mixed with string and numeric members, but it’s not
// clear why you would ever want to do so:

enum BooleanLikeHeterogenousEnum {
  No = 0,
  Yes = "YES",
}

// Unless you’re really trying to take advantage of JavaScript’s runtime behavior in a
// clever way, it’s advised that you don’t do this.

// ==========================
// Computed and constant members
// ==========================

// Each enum member has a value associated with it which can be either constant or computed.

// An enum member is considered constant if:

//  - It is the first member in the enum and it has no initializer, in which case it’s
// assigned the value 0:
enum E1 {
  X,
}
// E.X is constant:

// It does not have an initializer and the preceding enum member was a numeric constant.
// In this case the value of the current enum member will be the value of the preceding
// enum member plus one.
// All enum members in 'E1' and 'E2' are constant.

enum E2 {
  X,
  Y,
  Z,
}

enum E3 {
  A = 1,
  B,
  C,
}

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
enum FileAccess {
  // constant member
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,

  // computed member
  G = "123".length,
}

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
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

// let c: Circle = {
//   kind: ShapeKind.Square,
//   // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
//   radius: 100,
// };

// The other change is that enum types themselves effectively become a union of each enum
//  member. With union enums, the type system is able to leverage the fact that it knows
// the exact set of values that exist in the enum itself. Because of that, TypeScript can
// catch bugs where we might be comparing values incorrectly.
enum E {
  Foo,
  Bar,
}

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
enum E4 {
  X,
  Y,
  Z,
}
// can actually be passed around to functions
enum E5 {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
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

enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
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
enum Enum6 {
  A,
}

let a = Enum6.A;
let nameOfA = Enum6[a]; // "A"

// TypeScript compiles this down to the following JavaScript:
// ("use strict");
// var Enum7;
// (function (Enum7) {
//   Enum7[(Enum7["A"] = 0)] = "A";
// })(Enum7 || (Enum7 = {}));
// let a2 = Enum7.A;
// let nameOfA2 = Enum7[a]; // "A"

// In this generated code, an enum is compiled into an object that stores both forward
// (name -> value) and reverse (value -> name) mappings. References to other enum members
// are always emitted as property accesses and never inlined.

// Keep in mind that string enum members do not get a reverse mapping generated at all.

// ==========================
// const enums
// ==========================

// In most cases, enums are a perfectly valid solution. However sometimes requirements
// are tighter. To avoid paying the cost of extra generated code and additional
// indirection when accessing enum values, it’s possible to use const enums

const enum Enum8 {
  A = 1,
  B = A * 2,
}

// Const enums can only use constant enum expressions and unlike regular enums they are
// completely removed during compilation.

// Const enum members are inlined at use sites. This is possible since const enums
// cannot have computed members.
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

// in generated code will become
// "use strict";
// let directions = [
//     0 /* Up */,
//     1 /* Down */,
//     2 /* Left */,
//     3 /* Right */
// ];

// ==========================
// Ambient enums
// ==========================

// Ambient enums are used to describe the shape of already existing enum types.

declare enum Enum {
  A = 1,
  B,
  C = 2,
}

// One important difference between ambient and non-ambient enums is that, in regular enums,
//  members that don’t have an initializer will be considered constant if its preceding
// enum member is considered constant. In contrast, an ambient (and non-const) enum member
// that does not have initializer is always considered computed.
