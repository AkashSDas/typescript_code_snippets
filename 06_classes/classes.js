// ****** Classes ******
// Traditional JavaScript uses functions and prototype-based inheritance to build up reusable components
// ==========================
// Classes
// ==========================
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return `Hello ${this.greeting}`;
    }
}
let greeter = new Greeter("world");
let greeter2 = new Greeter("universe");
// 'this' keyword here referes to the member access
// ==========================
// Inheritance
// ==========================
class Animal {
    constructor(name) {
        this.name = name;
    }
    move(distanceInMeters = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log("Woof! Woof!");
    }
}
class Snake extends Animal {
    constructor(name) {
        super(name);
    }
    // overriding the base class move method
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal {
    constructor(name) {
        super(name);
    }
    // overriding the base class move method
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let dog = new Dog("Jammy the Doggo");
dog.bark();
dog.move(10);
dog.bark();
let sam = new Snake("Sammy the Python");
let tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
// ==========================
// Public, private, and protected modifiers
// ==========================
// *** Public by default ***
// In TypeScript, each member is public by default.
// You may still mark a member public explicitly.
class Animal2 {
    constructor(name) {
        this.name = name;
    }
    move(distanceInMeters) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
// *** ECMAScript Private Fields ***
class Animal3 {
    constructor(name) {
        this.#name = name;
    }
    #name; // private variable
}
// new Animal3("Cat").#name;
// Property '#name' is not accessible outside class 'Animal3' because it has a private identifier.
// *** Understanding TypeScript’s private ***
// TypeScript also has its own way to declare a member as being marked private, it cannot
// be accessed from outside of its containing class.
class Animal4 {
    constructor(name) {
        this.name = name;
    }
}
// new Animal4("james").name;
// Property 'name' is private and only accessible within class 'Animal4'.
// TypeScript is a structural type system. When we compare two different types, regardless of where
// they came from, if the types of all members are compatible, then we say the types themselves
// are compatible.
// However, when comparing types that have private and protected members, we treat these
// types differently. For two types to be considered compatible, if one of them has a
// private member, then the other must have a private member that originated in the same
// declaration. The same applies to protected members.
class Animal5 {
    constructor(name) {
        this.name = name;
    }
}
class Rhino extends Animal5 {
    constructor() {
        super("Rhino");
    }
}
class Employee1 {
    constructor(theName) {
        this.name = theName;
    }
}
let animal = new Animal5("GOAT");
let rhino = new Rhino();
let employee1 = new Employee1("Bob");
animal = rhino;
// animal = employee1; // error
// Type 'Employee1' is not assignable to type 'Animal'.
//    Types have separate declarations of a private property 'name'.
// In this example, we have an Animal and a Rhino, with Rhino being a subclass of
// Animal. We also have a new class Employee that looks identical to Animal in
// terms of shape. We create some instances of these classes and then try to assign
// them to each other to see what will happen. Because Animal and Rhino share the
// private side of their shape from the same declaration of private name: string
// in Animal, they are compatible. However, this is not the case for Employee.
// When we try to assign from an Employee to Animal we get an error that these
// types are not compatible. Even though Employee also has a private member called
// name, it’s not the one we declared in Animal.
// *** Understanding protected ***
// The protected modifier acts much like the private modifier with the exception that
//  members declared protected can also be accessed within deriving classes.
class Person {
    constructor(name) {
        this.name = name;
    }
}
class Employee2 extends Person {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // error
// Property 'name' is protected and only accessible within class 'Person' and its subclasses.
// Notice that while we can’t use name from outside of Person, we can still use it from
// within an instance method of Employee because Employee derives from Person.
// A constructor may also be marked protected. This means that the class cannot be instantiated
// outside of its containing class, but can be extended.
class Person2 {
    constructor(theName) {
        this.name = theName;
    }
}
// Employee3 can extend Person2
class Employee3 extends Person2 {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard2 = new Employee3("Howard", "Sales");
// let john = new Person2("John");
// Constructor of class 'Person2' is protected and only accessible within the class declaration.
// *** Readonly modifier ***
// You can make properties readonly by using the readonly keyword.
// Readonly properties must be initialized at their declaration or in the constructor.
class Octopus1 {
    constructor(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
}
let dad = new Octopus1("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error
// Cannot assign to 'name' because it is a read-only property.
// *** Parameter properties ***
// In our last example, we had to declare a readonly member name and a
// constructor parameter theName in the Octopus1 class.
// This is needed in order to have the value of theName accessible after
// the Octopus1 constructor is executed.
// Parameter properties let you create and initialize a member in one place.
class Octopus2 {
    constructor(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
}
let dad2 = new Octopus2("Man with the 8 strong legs");
dad2.name;
// Notice how we dropped theName altogether and just use the shortened readonly
// name: string parameter on the constructor to create and initialize the name member.
//  We’ve consolidated the declarations and assignment into one location.
// Parameter properties are declared by prefixing a constructor parameter with an
// accessibility modifier or readonly, or both. Using private for a parameter property
// declares and initializes a private member; likewise, the same is done for public,
// protected, and readonly.
// *** Accessors ***
// TypeScript supports getters/setters as a way of intercepting accesses to a member
// of an object.
class Employee4 {
}
let employee = new Employee4();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
// we add a setter that checks the length of the newName to make sure it’s compatible
// with the max-length of our backing database field. If it isn’t we throw an error
// notifying client code that something went wrong.
const fullNameMaxLength = 10;
class Employee5 {
    constructor() {
        this._fullName = "";
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(newName) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }
        this._fullName = newName;
    }
}
let employee2 = new Employee5();
employee2.fullName = "Bob Smith";
if (employee2.fullName) {
    console.log(employee2.fullName);
}
// A couple of things to note about accessors:
// First, accessors require you to set the compiler to output ECMAScript 5 or higher.
// Downleveling to ECMAScript 3 is not supported. Second, accessors with a get and no
// set are automatically inferred to be readonly. This is helpful when generating a .d.ts
// file from your code, because users of your property can see that they can’t change it.
// *** Static Properties ***
class Grid {
    constructor(scale) {
        this.scale = scale;
    }
    calculateDistanceFromOrigin(point) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
}
Grid.origin = { x: 0, y: 0 };
let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// *** Abstract Classes ***
// Abstract classes are base classes from which other classes may be derived.
// They may not be instantiated directly.
// Unlike an interface, an abstract class may contain implementation details for its members.
class Animal6 {
    move() {
        console.log("roaming the earth...");
    }
}
// Methods within an abstract class that are marked as abstract do not contain an
// implementation and must be implemented in derived classes.
// Both define the signature of a method without including a method body.
// However, abstract methods must include the abstract keyword and may optionally
// include access modifiers.
class Department {
    constructor(name) {
        this.name = name;
    }
    printName() {
        console.log("Department name: " + this.name);
    }
}
class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }
    printMeeting() {
        console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports() {
        console.log("Generating accounting reports...");
    }
}
let department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error
// Property 'generateReports' does not exist on type 'Department'.
// ==========================
// Using a class as an interface
// ==========================
class Point {
}
let point3d = { x: 1, y: 2, z: 3 };
