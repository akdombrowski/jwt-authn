"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printMsg = printMsg;
exports.default = jwtDecode;
function printMsg() {
  console.log("This is a message from the demo package");
  console.log(jwtDecode());
}

function jwtDecode() {
  console.log("jwtDecode");
}