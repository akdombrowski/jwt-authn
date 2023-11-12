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
            _context2.next = 34;
            break;
          }
          if (!clipboard) {
            _context2.next = 29;
            break;
          }
          _context2.prev = 8;
          // Show what we found in the clipboard
          console.log("Decoding: ");
          console.log(clipboard);
          _context2.next = 13;
          return decode(clipboard);
        case 13:
          decoded = _context2.sent;
          // Show the decoded jwt.
          console.log(decoded);
          return _context2.abrupt("return", decoded);
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](8);
          console.error("I found an error :(");
          console.error("Couldn't decode what was in your clipboard. You might try copying the JWT again.");
          console.error("What's the problem? ");
          console.error(" ", _context2.t0.message);
          console.error("What's on your clipboard? ");
          console.error(" ", clipboard);
          return _context2.abrupt("return", GENERIC_ERROR_CODE);
        case 27:
          _context2.next = 32;
          break;
        case 29:
          console.error("I found an error :(");
          console.error("Didn't find anything in your clipboard.");
          return _context2.abrupt("return", GENERIC_ERROR_CODE);
        case 32:
          _context2.next = 52;
          break;
        case 34:
          if (!(arg2 === "-b" || arg2 === "--base64url")) {
            _context2.next = 51;
            break;
          }
          if (arg3) {
            _context2.next = 39;
            break;
          }
          console.error("I found an error :(");
          console.error("No argument passed in to encode.");
          return _context2.abrupt("return", GENERIC_ERROR_CODE);
        case 39:
          _context2.prev = 39;
          bases64urlified = (0, _lib.base64URLEncode)(arg3);
          console.log(bases64urlified);
          return _context2.abrupt("return", bases64urlified);
        case 45:
          _context2.prev = 45;
          _context2.t1 = _context2["catch"](39);
          console.error("I found an error :(");
          console.error("base64url encoding failed:", _context2.t1.message);
        case 49:
          _context2.next = 52;
          break;
        case 51:
          if (arg2) {
            try {
              _decoded = (0, _lib.jwtDecode)(arg2);
              console.log("Decoding: \n" + arg2);
              console.log(_decoded);
              // return decoded;
            } catch (e) {
              console.error("I found an error :(.");
              // console.error(e, e.message);
              console.error(e.message);
            }
          } else {
            console.error("I found an error :(.");
            console.error("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
          }
        case 52:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[8, 18], [39, 45]]);
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