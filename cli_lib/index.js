#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lib = require("../lib");

var _clipboardy = _interopRequireDefault(require("clipboardy"));

// read from clipboard
var clipboard = _clipboardy["default"].readSync(); // read passed in argument


var arg2 = process.argv[2];

var decode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(jwt) {
    var decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _lib.jwtDecode)(jwt);

          case 2:
            decoded = _context.sent;
            console.log("Decoding: \n" + clipboard + "\n" + decoded);
            return _context.abrupt("return", decoded);

          case 5:
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

var cli = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(clipboard, arg2) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(arg2 == "-h" || arg2 === "--help")) {
              _context2.next = 5;
              break;
            }

            console.log("use -c or --clipboard or call command with no arguments to decode the JWT in you clipboard");
            console.log("or call command with JWT as first argument");
            _context2.next = 25;
            break;

          case 5:
            if (!(arg2 === "-c" || arg2 === "--clipboard" || !arg2)) {
              _context2.next = 24;
              break;
            }

            if (!clipboard) {
              _context2.next = 20;
              break;
            }

            _context2.prev = 7;
            _context2.next = 10;
            return decode(clipboard);

          case 10:
            _context2.next = 18;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](7);
            console.error("I found an error :(.");
            console.error("Couldn't decode what was in clipboard. Pass in a JWT as the first argument or copy a JWT to clipboard");
            console.error("what's on your clipboard? ");
            console.error(clipboard);

          case 18:
            _context2.next = 22;
            break;

          case 20:
            console.error("I found an error :(.");
            console.error("Nothing in clipboard. Pass in a JWT as the first argument or copy a JWT to your clipboard");

          case 22:
            _context2.next = 25;
            break;

          case 24:
            if (arg2) {
              try {
                console.log("Decoding: \n" + arg2);
                console.log((0, _lib.jwtDecode)(arg2));
              } catch (e) {
                console.error("I found an error :(.");
                console.error(e, e.message);
              }
            } else {
              console.error("I found an error :(.");
              console.error("Nothing in clipboard and no arguments given. Pass in a JWT as the first argument or copy a JWT to your clipboard");
            }

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 12]]);
  }));

  return function cli(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

cli(clipboard, arg2);