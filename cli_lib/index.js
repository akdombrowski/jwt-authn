#!/usr/bin/env node
"use strict";

var _lib = require("../lib");

var _clipboardy = _interopRequireDefault(require("clipboardy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clipboard = _clipboardy["default"].readSync();

var arg1 = process.argv[1];
var arg2 = process.argv[2];

if (arg2 === "-c" || arg2 === "--clipboard" || !arg2) {
  if (clipboard) {
    try {
      var decoded = (0, _lib.jwtDecode)(clipboard);
      console.log("Decoding: \n" + clipboard);
      console.log(decoded);
    } catch (e) {
      console.err("Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to clipboard");
    }
  } else {
    console.err("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
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
    console.log((0, _lib.jwtDecode)(arg2));
  } catch (e) {
    console.err(e, e.message);
  }
} else {
  console.err("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
}