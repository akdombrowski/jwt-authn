#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cli = exports.HELP_TEXT = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lib = require("../lib");
var _clipboardy = _interopRequireDefault(require("clipboardy"));
var GENERIC_ERROR_CODE = 1;
var decode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(jwt) {
    var decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _lib.jwtDecode)(jwt);
        case 3:
          decoded = _context.sent;
          return _context.abrupt("return", decoded);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function decode(_x) {
    return _ref.apply(this, arguments);
  };
}();
var HELP_TEXT = "******HELP*****\n\
use -c or --clipboard or call command with no arguments to decode the JWT in your clipboard\n\
or call command with JWT as first argument\n\
****************";
exports.HELP_TEXT = HELP_TEXT;
var cli = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(clipboard, argv) {
    var arg2, arg3, decoded, bases64urlified, _decoded;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // read passed in argument

          if (argv) {
            arg2 = argv[2];
            arg3 = argv[3];
          }
          if (!(arg2 == "-h" || arg2 === "--help")) {
            _context2.next = 6;
            break;
          }
          // Help display
          console.log(HELP_TEXT);
          return _context2.abrupt("return", HELP_TEXT);
        case 6:
          if (!(arg2 === "-c" || arg2 === "--clipboard" || !arg2)) {
            _context2.next = 32;
            break;
          }
          if (!clipboard) {
            _context2.next = 27;
            break;
          }
          _context2.prev = 8;
          _context2.next = 11;
          return decode(clipboard);
        case 11:
          decoded = _context2.sent;
          // Show what we found in the clipboard
          console.log("Decoding: ");
          console.log(clipboard);
          // Show the decoded jwt.
          console.log(decoded);
          return _context2.abrupt("return", decoded);
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](8);
          console.error("I found an error :(");
          console.error("Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard");
          console.error("what's on your clipboard? ");
          console.error(clipboard);
          throw _context2.t0;
        case 25:
          _context2.next = 30;
          break;
        case 27:
          console.error("I found an error :(");
          console.error("Nothing in your clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard");
          return _context2.abrupt("return", GENERIC_ERROR_CODE);
        case 30:
          _context2.next = 68;
          break;
        case 32:
          if (!(arg2 === "-b" || arg2 === "--base64url")) {
            _context2.next = 50;
            break;
          }
          if (arg3) {
            _context2.next = 37;
            break;
          }
          console.error("I found an error :(");
          console.error("No argument passed in to encode.");
          return _context2.abrupt("return", GENERIC_ERROR_CODE);
        case 37:
          _context2.prev = 37;
          bases64urlified = (0, _lib.base64URLEncode)(arg3);
          console.log(bases64urlified);
          return _context2.abrupt("return", bases64urlified);
        case 43:
          _context2.prev = 43;
          _context2.t1 = _context2["catch"](37);
          console.error("I found an error :(");
          console.error("base64url encoding failed:", _context2.t1.message);
          throw _context2.t1;
        case 48:
          _context2.next = 68;
          break;
        case 50:
          if (!arg2) {
            _context2.next = 65;
            break;
          }
          _context2.prev = 51;
          _decoded = (0, _lib.jwtDecode)(arg2);
          console.log("Decoding: \n" + arg2);
          console.log(_decoded);
          return _context2.abrupt("return", _decoded);
        case 58:
          _context2.prev = 58;
          _context2.t2 = _context2["catch"](51);
          console.error("I found an error :(.");
          console.error(_context2.t2, _context2.t2.message);
          throw _context2.t2;
        case 63:
          _context2.next = 68;
          break;
        case 65:
          console.error("I found an error :(.");
          console.error("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
          throw new Error("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
        case 68:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[8, 18], [37, 43], [51, 58]]);
  }));
  return function cli(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// read from clipboard
exports.cli = cli;
var clipboard;
try {
  clipboard = _clipboardy["default"].readSync();
} catch (e) {
  clipboard = null;
}

// read passed in argument
var argv = process.argv;
cli(clipboard, argv);
var _default = cli;
exports["default"] = _default;