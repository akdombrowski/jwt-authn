#!/usr/bin/env node

import { jwtDecode } from "../lib";
import clipboardy from "clipboardy";

const clipboard = clipboardy.readSync();
const arg1 = process.argv[1];
const arg2 = process.argv[2];

if (arg2 === "-c" || arg2 === "--clipboard" || !arg2) {
  if (clipboard) {
    try {
      const decoded = jwtDecode(clipboard);
      console.log("Decoding: \n" + clipboard);
      console.log(decoded);
    } catch (e) {
      console.err(
        "Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to clipboard"
      );
    }
  } else {
    console.err(
      "Nothing in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard"
    );
  }
} else if (arg2) {
  console.log("arg1");
  console.log(arg1);
  console.log("arg1");
  console.log("arg2");
  console.log(arg2);
  console.log("arg2");
  try {
    console.log("Decoding: \n" + arg2);
    console.log(jwtDecode(arg2));
  } catch (e) {
    console.err(e, e.message);
  }
} else {
  console.err(
    "Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard"
  );
}
