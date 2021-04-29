#!/usr/bin/env node

import { jwtDecode } from "../lib";
import clipboardy from "clipboardy";

// read from clipboard
const clipboard = clipboardy.readSync();
// read passed in argument
const arg2 = process.argv[2];

const decode = async (jwt) => {
  const decoded = await jwtDecode(jwt);

  console.log("Decoding: \n" + clipboard + "\n" + decoded);

  return decoded;
};

const cli = async (clipboard, arg2) => {
  if (arg2 == "-h" || arg2 === "--help") {
    console.log(
      "use -c or --clipboard or call command with no arguments to decode the JWT in you clipboard"
    );
    console.log("or call command with JWT as first argument");
  } else if (arg2 === "-c" || arg2 === "--clipboard" || !arg2) {
    if (clipboard) {
      try {
        await decode(clipboard);
      } catch (e) {
        console.error("I found an error :(.");
        console.error(
          "Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to clipboard"
        );
        console.error("what's on your clipboard? ");
        console.error(clipboard);
      }
    } else {
      console.error("I found an error :(.");
      console.error(
        "Nothing in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard"
      );
    }
  } else if (arg2) {
    try {
      console.log("Decoding: \n" + arg2);
      console.log(jwtDecode(arg2));
    } catch (e) {
      console.error("I found an error :(.");
      console.error(e, e.message);
    }
  } else {
    console.error("I found an error :(.");
    console.error(
      "Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard"
    );
  }
};

cli(clipboard, arg2);
