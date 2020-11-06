// ****** Unions and Intersection Types ******

// Intersection and Union types are one of the ways in which you can combine types.

// =============================
// Union Types
// =============================
function padLeft1(value: string, padding: any) {
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
function padLeft2(value: string, padding: string | number) {
  //
}

// let indentedString2 = padLeft2("Hello world", true); // error
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

// A union type describes a value that can be one of several types. We use the vertical bar
// (|) to separate each type, so number | string | boolean is the type of a value that can
// be a number, a string, or a boolean.

// =============================
// Unions with Common Fields
// =============================

// If we have a value that is a union type, we can only access members that are common to
// all types in the union.

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Only available in one of the two possible types
// pet.swim();
// Property 'swim' does not exist on type 'Bird | Fish'.
//   Property 'swim' does not exist on type 'Bird'.

// =============================
// Discriminating Unions
// =============================
// A common technique for working with unions is to have a single field which uses literal
// types which you can use to let TypeScript narrow down the possible current type.

// For example, we’re going to create a union of three types which have a single shared field.

type NetworkLoadingState = {
  state: "loading";
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkSuccessState
  | NetworkFailedState
  | NetworkLoadingState;

// All of the above types have a field named state, and then they also have their own fields

// Given the state field is common in every type inside NetworkState - it is safe for your
// code to access without an existence check.

// With state as a literal type, you can compare the value of state to the equivalent string
// and TypeScript will know which type is currently being used.

// In this case, you can use a switch statement to narrow down which type is represented at runtime
function logger(state: NetworkState): string {
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

// =============================
// Union Exhaustiveness checking
// =============================

// We would like the compiler to tell us when we don’t cover all variants of the
// discriminated union.

// For example, if we add NetworkFromCachedState to NetworkState, we need to update
// logger as well:
type NetworkFromCachedState = {
  state: "from_cache";
  id: string;
  response: NetworkSuccessState["response"];
};

type NetworkState2 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;

function logger2(s: NetworkState2) {
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

function logger3(s: NetworkState2): string {
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
function assertNever(x: never): never {
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

function logger4(s: NetworkState2): string {
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

// Here, assertNever checks that s is of type never — the type that’s left after all other
// cases have been removed. If you forget a case, then s will have a real type and you will
// get a type error. This method requires you to define an extra function, but it’s much more
// obvious when you forget it because the error message includes the missing type name.

// =============================
// Intersection Types
// =============================

// Intersection types are closely related to union types, but they are used very differently.
// An intersection type combines multiple types into one.
// This allows you to add together existing types to get a single type that has all the features
// you need
// For example, Person & Serializable & Loggable is a type which is all of Person and Serializable
// and Loggable. That means an object of this type will have all members of all three types.

// For example, if you had networking requests with consistent error handling then you could
// separate out the error handling into its own type which is merged with types which
// correspond to a single response type.

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
