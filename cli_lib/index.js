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

var decode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(jwt) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _lib.jwtDecode)(jwt);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function decode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var HELP_TEXT = "******HELP*****\n\
use -c or --clipboard or call command with no arguments to decode the JWT in your clipboard\n\
or call command with JWT as first argument\n\
****************"; // read from clipboard

exports.HELP_TEXT = HELP_TEXT;
var clipboard;

try {
  clipboard = _clipboardy["default"].readSync();
} catch (e) {
  clipboard = null;
} // read passed in argument


var arg2 = process.argv[2];

var cli = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(clipboard, arg2) {
    var decoded, _decoded;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(arg2 == "-h" || arg2 === "--help")) {
              _context2.next = 5;
              break;
            }

            // Help display
            console.log(HELP_TEXT);
            return _context2.abrupt("return", HELP_TEXT);

          case 5:
            if (!(arg2 === "-c" || arg2 === "--clipboard" || !arg2)) {
              _context2.next = 29;
              break;
            }

            if (!clipboard) {
              _context2.next = 25;
              break;
            }

            _context2.prev = 7;
            _context2.next = 10;
            return decode(clipboard);

          case 10:
            decoded = _context2.sent;
            // Show what we found in the clipboard
            console.log("Decoding: \n" + clipboard); // Show the decoded jwt.

            console.log(decoded);
            return _context2.abrupt("return", decoded);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](7);
            console.error("I found an error :(.");
            console.error("Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard");
            console.error("what's on your clipboard? ");
            console.error(clipboard);
            console.error(_context2.t0, _context2.t0.message);

          case 23:
            _context2.next = 27;
            break;

          case 25:
            console.error("I found an error :(.");
            console.error("Nothing in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard");

          case 27:
            _context2.next = 45;
            break;

          case 29:
            if (!arg2) {
              _context2.next = 43;
              break;
            }

            _context2.prev = 30;
            _decoded = (0, _lib.jwtDecode)(arg2);
            console.log("Decoding: \n" + arg2);
            console.log(_decoded);
            return _context2.abrupt("return", _decoded);

          case 37:
            _context2.prev = 37;
            _context2.t1 = _context2["catch"](30);
            console.error("I found an error :(.");
            console.error(_context2.t1, _context2.t1.message);

          case 41:
            _context2.next = 45;
            break;

          case 43:
            console.error("I found an error :(.");
            console.error("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");

          case 45:
            return _context2.abrupt("return", 1);

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 16], [30, 37]]);
  }));

  return function cli(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.cli = cli;
cli(clipboard, arg2);
var _default = cli;
exports["default"] = _default;