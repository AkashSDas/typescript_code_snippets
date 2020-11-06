// ****** Unions and Intersection Types ******
// Intersection and Union types are one of the ways in which you can combine types.
// =============================
// Union Types
// =============================
function padLeft1(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft1("Hello World", 4); // returns "    Hello world"
// Problem is that you can pass any value to the padding argument
// passes at compile time, fails at runtime.
let indentedString1 = padLeft1("Hello world", true);
// In traditional object-oriented code, we might abstract over the two types by creating a
// hierarchy of types. While this is much more explicit, it’s also a little bit overkill.
// One of the nice things about the original version of padLeft was that we were able to
// just pass in primitives. That meant that usage was simple and concise.
// This new approach also wouldn’t help if we were just trying to use a function that
// already exists elsewhere.
// Instead of any, we can use a union type for the padding parameter:
function padLeft2(value, padding) {
    //
}
let pet = getSmallPet();
pet.layEggs();
// All of the above types have a field named state, and then they also have their own fields
// Given the state field is common in every type inside NetworkState - it is safe for your
// code to access without an existence check.
// With state as a literal type, you can compare the value of state to the equivalent string
// and TypeScript will know which type is currently being used.
// In this case, you can use a switch statement to narrow down which type is represented at runtime
function logger(state) {
    // Right now TypeScript does not know which of the three
    // potential types state could be.
    // Trying to access a property which isn't shared
    // across all types will raise an error
    // state.code; // error
    // Property 'code' does not exist on type 'NetworkState'.
    //   Property 'code' does not exist on type 'NetworkLoadingState'.
    // By switching on state, TypeScript can narrow the union
    // down in code flow analysis
    switch (state.state) {
        case "loading":
            return "Downloading...";
        case "failed":
            // The type must be NetworkFailedState here,
            // so accessing the `code` field is safe
            return `Error ${state.code} downloading`;
        case "success":
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}
function logger2(s) {
    switch (s.state) {
        case "loading":
            return "loading request";
        case "failed":
            return `failed with code ${s.code}`;
        case "success":
            return "got response";
    }
}
// There are two ways to do this. The first is to turn on --strictNullChecks and
// specify a return type:
function logger3(s) {
    // Function lacks ending return statement and return type does not include 'undefined'.
    switch (s.state) {
        case "loading":
            return "loading request";
        case "failed":
            return `failed with code ${s.code}`;
        case "success":
            return "got response";
    }
}
// Because the switch is no longer exhaustive, TypeScript is aware that the function could
// sometimes return undefined. If you have an explicit return type string, then you will
// get an error that the return type is actually string | undefined. However, this method
// is quite subtle and, besides, --strictNullChecks does not always work with old code.
// The second method uses the never type that the compiler uses to check for exhaustiveness
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
// function logger4(s: NetworkState2): string {
//   switch (s.state) {
//     case "loading":
//       return "loading request";
//     case "failed":
//       return `failed with code ${s.code}`;
//     case "success":
//       return "got response";
//     default:
//       return assertNever(s);
//     // Argument of type 'NetworkFromCachedState' is not assignable to parameter of type 'never'.
//   }
// }
// The error above will remind us to add new cases when we add new types to
// existing ones. Note here case has to be 'from_cache' otherwise it will give
// an error
function logger4(s) {
    switch (s.state) {
        case "loading":
            return "loading request";
        case "failed":
            return `failed with code ${s.code}`;
        case "success":
            return "got response";
        case "from_cache":
            return "cashed";
        default:
            return assertNever(s);
        // Argument of type 'NetworkFromCachedState' is not assignable to parameter of type 'never'.
    }
}
const handleArtistsResponse = (response) => {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
