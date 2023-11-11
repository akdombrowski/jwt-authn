#!/usr/bin/env node

import { jwtDecode, base64URLEncode } from "../lib";
import clipboardy from "clipboardy";

const GENERIC_ERROR_CODE = 1;

const decode = async (jwt) => {
  try {
    const decoded = await jwtDecode(jwt);
    return decoded;
  } catch (e) {
    throw e;
  }
};

export const HELP_TEXT =
  "******HELP*****\n\
use -c or --clipboard or call command with no arguments to decode the JWT in your clipboard\n\
or call command with JWT as first argument\n\
****************";

export const cli = async (clipboard, argv) => {
  // read passed in argument
  let arg2;
  let arg3;
  if (argv) {
    arg2 = argv[2];
    arg3 = argv[3];
  }

  if (arg2 == "-h" || arg2 === "--help") {
    // Help display
    console.log(HELP_TEXT);
    return HELP_TEXT;
  } else if (arg2 === "-c" || arg2 === "--clipboard" || !arg2) {
    // Check for something in the clipboard.
    if (clipboard) {
      // Great, there's something in the clipboard. Let's try to decode it as a
      // JWT.
      try {
        const decoded = await decode(clipboard);
        // Show what we found in the clipboard
        console.log("Decoding: ");
        console.log(clipboard);
        // Show the decoded jwt.
        console.log(decoded);
        return decoded;
      } catch (e) {
        console.error("I found an error :(");
        console.error(
          "Couldn't decode what was in your clipboard. Try copying the JWT again."
        );
        console.error("What's the problem? ");
        console.error(" ", e.message);
        console.error("What's on your clipboard? ");
        console.error(" ", clipboard);
        return GENERIC_ERROR_CODE;
      }
    } else {
      console.error("I found an error :(");
      console.error(
        "Nothing in your clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard"
      );
      return GENERIC_ERROR_CODE;
    }
  } else if (arg2 === "-b" || arg2 === "--base64url") {
    if (!arg3) {
      console.error("I found an error :(");
      console.error("No argument passed in to encode.");
      return GENERIC_ERROR_CODE;
    }

    try {
      const bases64urlified = base64URLEncode(arg3);

      console.log(bases64urlified);

      return bases64urlified;
    } catch (e) {
      console.error("I found an error :(");
      console.error("base64url encoding failed:", e.message);
      throw new Error("Failed to base64url encode", { cause: e });
    }
  } else if (arg2) {
    try {
      const decoded = jwtDecode(arg2);
      console.log("Decoding: \n" + arg2);
      console.log(decoded);
      // return decoded;
    } catch (e) {
      console.error("I found an error :(.");
      // console.error(e, e.message);
      console.error(e.message);
      // throw new Error("JWT decoding error", { cause: e });
    }
  } else {
    console.error("I found an error :(.");
    console.error(
      "Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard"
    );
    throw new Error(
      "Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard"
    );
  }
};

// read from clipboard
let clipboard;
try {
  clipboard = clipboardy.readSync();
} catch (e) {
  clipboard = null;
}

// read passed in argument
const argv = process.argv;

cli(clipboard, argv);

export default cli;
