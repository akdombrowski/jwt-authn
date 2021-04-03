"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jwtEncode = exports.rs256PEMVerify = exports.rs256JWKVerify = exports.jwtDecode = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function cov_15bk4lhn0s() {
  var path = "D:\\Github\\jot\\src\\index.js";
  var hash = "3873de716a7ba946e316b59ae14dc16d4f2dc1b8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "D:\\Github\\jot\\src\\index.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 25
        },
        end: {
          line: 82,
          column: 1
        }
      },
      "1": {
        start: {
          line: 11,
          column: 2
        },
        end: {
          line: 81,
          column: 3
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 16,
          column: 5
        }
      },
      "3": {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 15,
          column: 47
        }
      },
      "4": {
        start: {
          line: 20,
          column: 23
        },
        end: {
          line: 20,
          column: 37
        }
      },
      "5": {
        start: {
          line: 21,
          column: 19
        },
        end: {
          line: 21,
          column: 32
        }
      },
      "6": {
        start: {
          line: 26,
          column: 35
        },
        end: {
          line: 28,
          column: 5
        }
      },
      "7": {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      "8": {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 30,
          column: 44
        }
      },
      "9": {
        start: {
          line: 31,
          column: 6
        },
        end: {
          line: 31,
          column: 42
        }
      },
      "10": {
        start: {
          line: 32,
          column: 6
        },
        end: {
          line: 32,
          column: 56
        }
      },
      "11": {
        start: {
          line: 38,
          column: 23
        },
        end: {
          line: 38,
          column: 57
        }
      },
      "12": {
        start: {
          line: 44,
          column: 30
        },
        end: {
          line: 44,
          column: 40
        }
      },
      "13": {
        start: {
          line: 46,
          column: 4
        },
        end: {
          line: 48,
          column: 5
        }
      },
      "14": {
        start: {
          line: 47,
          column: 6
        },
        end: {
          line: 47,
          column: 63
        }
      },
      "15": {
        start: {
          line: 49,
          column: 4
        },
        end: {
          line: 51,
          column: 5
        }
      },
      "16": {
        start: {
          line: 50,
          column: 6
        },
        end: {
          line: 50,
          column: 63
        }
      },
      "17": {
        start: {
          line: 52,
          column: 4
        },
        end: {
          line: 54,
          column: 5
        }
      },
      "18": {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
          column: 59
        }
      },
      "19": {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 75,
          column: 5
        }
      },
      "20": {
        start: {
          line: 63,
          column: 22
        },
        end: {
          line: 63,
          column: 35
        }
      },
      "21": {
        start: {
          line: 64,
          column: 38
        },
        end: {
          line: 67,
          column: 24
        }
      },
      "22": {
        start: {
          line: 68,
          column: 26
        },
        end: {
          line: 68,
          column: 61
        }
      },
      "23": {
        start: {
          line: 70,
          column: 6
        },
        end: {
          line: 74,
          column: 8
        }
      },
      "24": {
        start: {
          line: 77,
          column: 4
        },
        end: {
          line: 77,
          column: 62
        }
      },
      "25": {
        start: {
          line: 79,
          column: 4
        },
        end: {
          line: 79,
          column: 32
        }
      },
      "26": {
        start: {
          line: 80,
          column: 4
        },
        end: {
          line: 80,
          column: 60
        }
      },
      "27": {
        start: {
          line: 90,
          column: 18
        },
        end: {
          line: 99,
          column: 1
        }
      },
      "28": {
        start: {
          line: 91,
          column: 17
        },
        end: {
          line: 91,
          column: 57
        }
      },
      "29": {
        start: {
          line: 92,
          column: 15
        },
        end: {
          line: 92,
          column: 50
        }
      },
      "30": {
        start: {
          line: 94,
          column: 2
        },
        end: {
          line: 94,
          column: 38
        }
      },
      "31": {
        start: {
          line: 95,
          column: 18
        },
        end: {
          line: 95,
          column: 31
        }
      },
      "32": {
        start: {
          line: 96,
          column: 27
        },
        end: {
          line: 96,
          column: 69
        }
      },
      "33": {
        start: {
          line: 98,
          column: 2
        },
        end: {
          line: 98,
          column: 26
        }
      },
      "34": {
        start: {
          line: 108,
          column: 21
        },
        end: {
          line: 142,
          column: 1
        }
      },
      "35": {
        start: {
          line: 109,
          column: 17
        },
        end: {
          line: 109,
          column: 35
        }
      },
      "36": {
        start: {
          line: 110,
          column: 2
        },
        end: {
          line: 139,
          column: 3
        }
      },
      "37": {
        start: {
          line: 112,
          column: 4
        },
        end: {
          line: 136,
          column: 5
        }
      },
      "38": {
        start: {
          line: 113,
          column: 6
        },
        end: {
          line: 121,
          column: 7
        }
      },
      "39": {
        start: {
          line: 114,
          column: 8
        },
        end: {
          line: 114,
          column: 33
        }
      },
      "40": {
        start: {
          line: 116,
          column: 8
        },
        end: {
          line: 120,
          column: 9
        }
      },
      "41": {
        start: {
          line: 117,
          column: 10
        },
        end: {
          line: 117,
          column: 23
        }
      },
      "42": {
        start: {
          line: 119,
          column: 10
        },
        end: {
          line: 119,
          column: 45
        }
      },
      "43": {
        start: {
          line: 123,
          column: 24
        },
        end: {
          line: 123,
          column: 79
        }
      },
      "44": {
        start: {
          line: 124,
          column: 18
        },
        end: {
          line: 126,
          column: 8
        }
      },
      "45": {
        start: {
          line: 127,
          column: 27
        },
        end: {
          line: 127,
          column: 52
        }
      },
      "46": {
        start: {
          line: 129,
          column: 6
        },
        end: {
          line: 129,
          column: 26
        }
      },
      "47": {
        start: {
          line: 131,
          column: 6
        },
        end: {
          line: 135,
          column: 7
        }
      },
      "48": {
        start: {
          line: 132,
          column: 8
        },
        end: {
          line: 132,
          column: 21
        }
      },
      "49": {
        start: {
          line: 134,
          column: 8
        },
        end: {
          line: 134,
          column: 36
        }
      },
      "50": {
        start: {
          line: 138,
          column: 4
        },
        end: {
          line: 138,
          column: 39
        }
      },
      "51": {
        start: {
          line: 141,
          column: 2
        },
        end: {
          line: 141,
          column: 14
        }
      },
      "52": {
        start: {
          line: 150,
          column: 21
        },
        end: {
          line: 183,
          column: 1
        }
      },
      "53": {
        start: {
          line: 151,
          column: 17
        },
        end: {
          line: 151,
          column: 35
        }
      },
      "54": {
        start: {
          line: 154,
          column: 2
        },
        end: {
          line: 157,
          column: 3
        }
      },
      "55": {
        start: {
          line: 155,
          column: 4
        },
        end: {
          line: 155,
          column: 42
        }
      },
      "56": {
        start: {
          line: 156,
          column: 4
        },
        end: {
          line: 156,
          column: 16
        }
      },
      "57": {
        start: {
          line: 159,
          column: 2
        },
        end: {
          line: 176,
          column: 3
        }
      },
      "58": {
        start: {
          line: 160,
          column: 4
        },
        end: {
          line: 160,
          column: 73
        }
      },
      "59": {
        start: {
          line: 162,
          column: 4
        },
        end: {
          line: 175,
          column: 5
        }
      },
      "60": {
        start: {
          line: 166,
          column: 6
        },
        end: {
          line: 174,
          column: 7
        }
      },
      "61": {
        start: {
          line: 167,
          column: 8
        },
        end: {
          line: 171,
          column: 11
        }
      },
      "62": {
        start: {
          line: 173,
          column: 8
        },
        end: {
          line: 173,
          column: 76
        }
      },
      "63": {
        start: {
          line: 177,
          column: 14
        },
        end: {
          line: 179,
          column: 4
        }
      },
      "64": {
        start: {
          line: 180,
          column: 23
        },
        end: {
          line: 180,
          column: 48
        }
      },
      "65": {
        start: {
          line: 182,
          column: 2
        },
        end: {
          line: 182,
          column: 22
        }
      },
      "66": {
        start: {
          line: 192,
          column: 30
        },
        end: {
          line: 216,
          column: 1
        }
      },
      "67": {
        start: {
          line: 193,
          column: 24
        },
        end: {
          line: 193,
          column: 38
        }
      },
      "68": {
        start: {
          line: 194,
          column: 24
        },
        end: {
          line: 194,
          column: 65
        }
      },
      "69": {
        start: {
          line: 195,
          column: 20
        },
        end: {
          line: 195,
          column: 36
        }
      },
      "70": {
        start: {
          line: 196,
          column: 20
        },
        end: {
          line: 199,
          column: 4
        }
      },
      "71": {
        start: {
          line: 200,
          column: 21
        },
        end: {
          line: 207,
          column: 3
        }
      },
      "72": {
        start: {
          line: 215,
          column: 2
        },
        end: {
          line: 215,
          column: 20
        }
      },
      "73": {
        start: {
          line: 225,
          column: 30
        },
        end: {
          line: 249,
          column: 1
        }
      },
      "74": {
        start: {
          line: 226,
          column: 24
        },
        end: {
          line: 226,
          column: 38
        }
      },
      "75": {
        start: {
          line: 227,
          column: 24
        },
        end: {
          line: 227,
          column: 65
        }
      },
      "76": {
        start: {
          line: 228,
          column: 20
        },
        end: {
          line: 228,
          column: 36
        }
      },
      "77": {
        start: {
          line: 229,
          column: 20
        },
        end: {
          line: 232,
          column: 4
        }
      },
      "78": {
        start: {
          line: 233,
          column: 21
        },
        end: {
          line: 240,
          column: 3
        }
      },
      "79": {
        start: {
          line: 248,
          column: 2
        },
        end: {
          line: 248,
          column: 20
        }
      },
      "80": {
        start: {
          line: 262,
          column: 25
        },
        end: {
          line: 333,
          column: 1
        }
      },
      "81": {
        start: {
          line: 265,
          column: 19
        },
        end: {
          line: 265,
          column: 25
        }
      },
      "82": {
        start: {
          line: 266,
          column: 2
        },
        end: {
          line: 332,
          column: 3
        }
      },
      "83": {
        start: {
          line: 267,
          column: 4
        },
        end: {
          line: 280,
          column: 5
        }
      },
      "84": {
        start: {
          line: 269,
          column: 6
        },
        end: {
          line: 269,
          column: 26
        }
      },
      "85": {
        start: {
          line: 270,
          column: 6
        },
        end: {
          line: 270,
          column: 67
        }
      },
      "86": {
        start: {
          line: 271,
          column: 30
        },
        end: {
          line: 271,
          column: 52
        }
      },
      "87": {
        start: {
          line: 273,
          column: 6
        },
        end: {
          line: 275,
          column: 8
        }
      },
      "88": {
        start: {
          line: 277,
          column: 6
        },
        end: {
          line: 277,
          column: 38
        }
      },
      "89": {
        start: {
          line: 279,
          column: 6
        },
        end: {
          line: 279,
          column: 75
        }
      },
      "90": {
        start: {
          line: 282,
          column: 4
        },
        end: {
          line: 292,
          column: 5
        }
      },
      "91": {
        start: {
          line: 284,
          column: 6
        },
        end: {
          line: 284,
          column: 67
        }
      },
      "92": {
        start: {
          line: 285,
          column: 30
        },
        end: {
          line: 285,
          column: 53
        }
      },
      "93": {
        start: {
          line: 287,
          column: 6
        },
        end: {
          line: 289,
          column: 8
        }
      },
      "94": {
        start: {
          line: 291,
          column: 6
        },
        end: {
          line: 291,
          column: 77
        }
      },
      "95": {
        start: {
          line: 294,
          column: 26
        },
        end: {
          line: 294,
          column: 66
        }
      },
      "96": {
        start: {
          line: 296,
          column: 20
        },
        end: {
          line: 296,
          column: 30
        }
      },
      "97": {
        start: {
          line: 299,
          column: 4
        },
        end: {
          line: 329,
          column: 5
        }
      },
      "98": {
        start: {
          line: 300,
          column: 6
        },
        end: {
          line: 325,
          column: 7
        }
      },
      "99": {
        start: {
          line: 302,
          column: 10
        },
        end: {
          line: 302,
          column: 46
        }
      },
      "100": {
        start: {
          line: 303,
          column: 10
        },
        end: {
          line: 303,
          column: 16
        }
      },
      "101": {
        start: {
          line: 305,
          column: 10
        },
        end: {
          line: 321,
          column: 11
        }
      },
      "102": {
        start: {
          line: 306,
          column: 30
        },
        end: {
          line: 306,
          column: 47
        }
      },
      "103": {
        start: {
          line: 307,
          column: 12
        },
        end: {
          line: 315,
          column: 13
        }
      },
      "104": {
        start: {
          line: 308,
          column: 14
        },
        end: {
          line: 308,
          column: 53
        }
      },
      "105": {
        start: {
          line: 309,
          column: 19
        },
        end: {
          line: 315,
          column: 13
        }
      },
      "106": {
        start: {
          line: 310,
          column: 14
        },
        end: {
          line: 314,
          column: 15
        }
      },
      "107": {
        start: {
          line: 311,
          column: 16
        },
        end: {
          line: 311,
          column: 75
        }
      },
      "108": {
        start: {
          line: 313,
          column: 16
        },
        end: {
          line: 313,
          column: 55
        }
      },
      "109": {
        start: {
          line: 318,
          column: 12
        },
        end: {
          line: 320,
          column: 14
        }
      },
      "110": {
        start: {
          line: 322,
          column: 10
        },
        end: {
          line: 322,
          column: 16
        }
      },
      "111": {
        start: {
          line: 324,
          column: 10
        },
        end: {
          line: 324,
          column: 53
        }
      },
      "112": {
        start: {
          line: 326,
          column: 6
        },
        end: {
          line: 326,
          column: 39
        }
      },
      "113": {
        start: {
          line: 328,
          column: 6
        },
        end: {
          line: 328,
          column: 70
        }
      },
      "114": {
        start: {
          line: 331,
          column: 4
        },
        end: {
          line: 331,
          column: 66
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 10,
            column: 25
          },
          end: {
            line: 10,
            column: 26
          }
        },
        loc: {
          start: {
            line: 10,
            column: 34
          },
          end: {
            line: 82,
            column: 1
          }
        },
        line: 10
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 90,
            column: 18
          },
          end: {
            line: 90,
            column: 19
          }
        },
        loc: {
          start: {
            line: 90,
            column: 42
          },
          end: {
            line: 99,
            column: 1
          }
        },
        line: 90
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 108,
            column: 21
          },
          end: {
            line: 108,
            column: 22
          }
        },
        loc: {
          start: {
            line: 108,
            column: 45
          },
          end: {
            line: 142,
            column: 1
          }
        },
        line: 108
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 150,
            column: 21
          },
          end: {
            line: 150,
            column: 22
          }
        },
        loc: {
          start: {
            line: 150,
            column: 64
          },
          end: {
            line: 183,
            column: 1
          }
        },
        line: 150
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 192,
            column: 30
          },
          end: {
            line: 192,
            column: 31
          }
        },
        loc: {
          start: {
            line: 192,
            column: 50
          },
          end: {
            line: 216,
            column: 1
          }
        },
        line: 192
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 225,
            column: 30
          },
          end: {
            line: 225,
            column: 31
          }
        },
        loc: {
          start: {
            line: 225,
            column: 50
          },
          end: {
            line: 249,
            column: 1
          }
        },
        line: 225
      },
      "6": {
        name: "(anonymous_6)",
        decl: {
          start: {
            line: 262,
            column: 25
          },
          end: {
            line: 262,
            column: 26
          }
        },
        loc: {
          start: {
            line: 262,
            column: 60
          },
          end: {
            line: 333,
            column: 1
          }
        },
        line: 262
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }, {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 16,
            column: 5
          }
        }],
        line: 14
      },
      "1": {
        loc: {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }, {
          start: {
            line: 29,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }],
        line: 29
      },
      "2": {
        loc: {
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 48,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 48,
            column: 5
          }
        }, {
          start: {
            line: 46,
            column: 4
          },
          end: {
            line: 48,
            column: 5
          }
        }],
        line: 46
      },
      "3": {
        loc: {
          start: {
            line: 46,
            column: 8
          },
          end: {
            line: 46,
            column: 28
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 46,
            column: 8
          },
          end: {
            line: 46,
            column: 11
          }
        }, {
          start: {
            line: 46,
            column: 15
          },
          end: {
            line: 46,
            column: 28
          }
        }],
        line: 46
      },
      "4": {
        loc: {
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 51,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 51,
            column: 5
          }
        }, {
          start: {
            line: 49,
            column: 4
          },
          end: {
            line: 51,
            column: 5
          }
        }],
        line: 49
      },
      "5": {
        loc: {
          start: {
            line: 49,
            column: 8
          },
          end: {
            line: 49,
            column: 28
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 49,
            column: 8
          },
          end: {
            line: 49,
            column: 11
          }
        }, {
          start: {
            line: 49,
            column: 15
          },
          end: {
            line: 49,
            column: 28
          }
        }],
        line: 49
      },
      "6": {
        loc: {
          start: {
            line: 52,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 52,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        }, {
          start: {
            line: 52,
            column: 4
          },
          end: {
            line: 54,
            column: 5
          }
        }],
        line: 52
      },
      "7": {
        loc: {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 75,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 75,
            column: 5
          }
        }, {
          start: {
            line: 58,
            column: 4
          },
          end: {
            line: 75,
            column: 5
          }
        }],
        line: 58
      },
      "8": {
        loc: {
          start: {
            line: 110,
            column: 2
          },
          end: {
            line: 139,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 110,
            column: 2
          },
          end: {
            line: 139,
            column: 3
          }
        }, {
          start: {
            line: 110,
            column: 2
          },
          end: {
            line: 139,
            column: 3
          }
        }],
        line: 110
      },
      "9": {
        loc: {
          start: {
            line: 116,
            column: 8
          },
          end: {
            line: 120,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 116,
            column: 8
          },
          end: {
            line: 120,
            column: 9
          }
        }, {
          start: {
            line: 116,
            column: 8
          },
          end: {
            line: 120,
            column: 9
          }
        }],
        line: 116
      },
      "10": {
        loc: {
          start: {
            line: 131,
            column: 6
          },
          end: {
            line: 135,
            column: 7
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 131,
            column: 6
          },
          end: {
            line: 135,
            column: 7
          }
        }, {
          start: {
            line: 131,
            column: 6
          },
          end: {
            line: 135,
            column: 7
          }
        }],
        line: 131
      },
      "11": {
        loc: {
          start: {
            line: 154,
            column: 2
          },
          end: {
            line: 157,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 154,
            column: 2
          },
          end: {
            line: 157,
            column: 3
          }
        }, {
          start: {
            line: 154,
            column: 2
          },
          end: {
            line: 157,
            column: 3
          }
        }],
        line: 154
      },
      "12": {
        loc: {
          start: {
            line: 162,
            column: 4
          },
          end: {
            line: 175,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 162,
            column: 4
          },
          end: {
            line: 175,
            column: 5
          }
        }, {
          start: {
            line: 162,
            column: 4
          },
          end: {
            line: 175,
            column: 5
          }
        }],
        line: 162
      },
      "13": {
        loc: {
          start: {
            line: 163,
            column: 6
          },
          end: {
            line: 164,
            column: 65
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 163,
            column: 6
          },
          end: {
            line: 163,
            column: 28
          }
        }, {
          start: {
            line: 164,
            column: 6
          },
          end: {
            line: 164,
            column: 65
          }
        }],
        line: 163
      },
      "14": {
        loc: {
          start: {
            line: 166,
            column: 6
          },
          end: {
            line: 174,
            column: 7
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 166,
            column: 6
          },
          end: {
            line: 174,
            column: 7
          }
        }, {
          start: {
            line: 166,
            column: 6
          },
          end: {
            line: 174,
            column: 7
          }
        }],
        line: 166
      },
      "15": {
        loc: {
          start: {
            line: 266,
            column: 2
          },
          end: {
            line: 332,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 266,
            column: 2
          },
          end: {
            line: 332,
            column: 3
          }
        }, {
          start: {
            line: 266,
            column: 2
          },
          end: {
            line: 332,
            column: 3
          }
        }],
        line: 266
      },
      "16": {
        loc: {
          start: {
            line: 267,
            column: 4
          },
          end: {
            line: 280,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 267,
            column: 4
          },
          end: {
            line: 280,
            column: 5
          }
        }, {
          start: {
            line: 267,
            column: 4
          },
          end: {
            line: 280,
            column: 5
          }
        }],
        line: 267
      },
      "17": {
        loc: {
          start: {
            line: 282,
            column: 4
          },
          end: {
            line: 292,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 282,
            column: 4
          },
          end: {
            line: 292,
            column: 5
          }
        }, {
          start: {
            line: 282,
            column: 4
          },
          end: {
            line: 292,
            column: 5
          }
        }],
        line: 282
      },
      "18": {
        loc: {
          start: {
            line: 299,
            column: 4
          },
          end: {
            line: 329,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 299,
            column: 4
          },
          end: {
            line: 329,
            column: 5
          }
        }, {
          start: {
            line: 299,
            column: 4
          },
          end: {
            line: 329,
            column: 5
          }
        }],
        line: 299
      },
      "19": {
        loc: {
          start: {
            line: 300,
            column: 6
          },
          end: {
            line: 325,
            column: 7
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 301,
            column: 8
          },
          end: {
            line: 303,
            column: 16
          }
        }, {
          start: {
            line: 304,
            column: 8
          },
          end: {
            line: 322,
            column: 16
          }
        }, {
          start: {
            line: 323,
            column: 8
          },
          end: {
            line: 324,
            column: 53
          }
        }],
        line: 300
      },
      "20": {
        loc: {
          start: {
            line: 305,
            column: 10
          },
          end: {
            line: 321,
            column: 11
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 305,
            column: 10
          },
          end: {
            line: 321,
            column: 11
          }
        }, {
          start: {
            line: 305,
            column: 10
          },
          end: {
            line: 321,
            column: 11
          }
        }],
        line: 305
      },
      "21": {
        loc: {
          start: {
            line: 305,
            column: 14
          },
          end: {
            line: 305,
            column: 42
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 305,
            column: 14
          },
          end: {
            line: 305,
            column: 21
          }
        }, {
          start: {
            line: 305,
            column: 25
          },
          end: {
            line: 305,
            column: 42
          }
        }],
        line: 305
      },
      "22": {
        loc: {
          start: {
            line: 307,
            column: 12
          },
          end: {
            line: 315,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 307,
            column: 12
          },
          end: {
            line: 315,
            column: 13
          }
        }, {
          start: {
            line: 307,
            column: 12
          },
          end: {
            line: 315,
            column: 13
          }
        }],
        line: 307
      },
      "23": {
        loc: {
          start: {
            line: 309,
            column: 19
          },
          end: {
            line: 315,
            column: 13
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 309,
            column: 19
          },
          end: {
            line: 315,
            column: 13
          }
        }, {
          start: {
            line: 309,
            column: 19
          },
          end: {
            line: 315,
            column: 13
          }
        }],
        line: 309
      },
      "24": {
        loc: {
          start: {
            line: 310,
            column: 14
          },
          end: {
            line: 314,
            column: 15
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 310,
            column: 14
          },
          end: {
            line: 314,
            column: 15
          }
        }, {
          start: {
            line: 310,
            column: 14
          },
          end: {
            line: 314,
            column: 15
          }
        }],
        line: 310
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "26": 0,
      "27": 0,
      "28": 0,
      "29": 0,
      "30": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "36": 0,
      "37": 0,
      "38": 0,
      "39": 0,
      "40": 0,
      "41": 0,
      "42": 0,
      "43": 0,
      "44": 0,
      "45": 0,
      "46": 0,
      "47": 0,
      "48": 0,
      "49": 0,
      "50": 0,
      "51": 0,
      "52": 0,
      "53": 0,
      "54": 0,
      "55": 0,
      "56": 0,
      "57": 0,
      "58": 0,
      "59": 0,
      "60": 0,
      "61": 0,
      "62": 0,
      "63": 0,
      "64": 0,
      "65": 0,
      "66": 0,
      "67": 0,
      "68": 0,
      "69": 0,
      "70": 0,
      "71": 0,
      "72": 0,
      "73": 0,
      "74": 0,
      "75": 0,
      "76": 0,
      "77": 0,
      "78": 0,
      "79": 0,
      "80": 0,
      "81": 0,
      "82": 0,
      "83": 0,
      "84": 0,
      "85": 0,
      "86": 0,
      "87": 0,
      "88": 0,
      "89": 0,
      "90": 0,
      "91": 0,
      "92": 0,
      "93": 0,
      "94": 0,
      "95": 0,
      "96": 0,
      "97": 0,
      "98": 0,
      "99": 0,
      "100": 0,
      "101": 0,
      "102": 0,
      "103": 0,
      "104": 0,
      "105": 0,
      "106": 0,
      "107": 0,
      "108": 0,
      "109": 0,
      "110": 0,
      "111": 0,
      "112": 0,
      "113": 0,
      "114": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0],
      "7": [0, 0],
      "8": [0, 0],
      "9": [0, 0],
      "10": [0, 0],
      "11": [0, 0],
      "12": [0, 0],
      "13": [0, 0],
      "14": [0, 0],
      "15": [0, 0],
      "16": [0, 0],
      "17": [0, 0],
      "18": [0, 0],
      "19": [0, 0, 0],
      "20": [0, 0],
      "21": [0, 0],
      "22": [0, 0],
      "23": [0, 0],
      "24": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "3873de716a7ba946e316b59ae14dc16d4f2dc1b8"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_15bk4lhn0s = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_15bk4lhn0s();
cov_15bk4lhn0s().s[0]++;

/**
 * Decodes a JWT that is in JWS format.
 *
 * @export
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */
var jwtDecode = function jwtDecode(jwt) {
  cov_15bk4lhn0s().f[0]++;
  cov_15bk4lhn0s().s[1]++;

  try {
    cov_15bk4lhn0s().s[2]++;

    // 1.   Verify that the JWT contains at least one period ('.')
    //        character.
    if (!jwt.includes(".")) {
      cov_15bk4lhn0s().b[0][0]++;
      cov_15bk4lhn0s().s[3]++;
      throw new Error("Need at least one '.'");
    } else {
      cov_15bk4lhn0s().b[0][1]++;
    } // 2.   Let the Encoded JOSE Header be the portion of the JWT before the
    //     first period ('.') character.


    var components = (cov_15bk4lhn0s().s[4]++, jwt.split("."));
    var header = (cov_15bk4lhn0s().s[5]++, components[0]); // 3.   Base64url decode the Encoded JOSE Header following the
    // restriction that no line breaks, whitespace, or other additional
    // characters have been used.

    var base64URLDecodedHeader = (cov_15bk4lhn0s().s[6]++, Buffer.from(header, "base64url").toString("utf8"));
    cov_15bk4lhn0s().s[7]++;

    if (!base64URLDecodedHeader) {
      cov_15bk4lhn0s().b[1][0]++;
      cov_15bk4lhn0s().s[8]++;
      console.err("base64URLDecodedHeader");
      cov_15bk4lhn0s().s[9]++;
      console.err(base64URLDecodedHeader);
      cov_15bk4lhn0s().s[10]++;
      throw new Error("Header isn't base64url encoded");
    } else {
      cov_15bk4lhn0s().b[1][1]++;
    } // 4.   Verify that the resulting octet sequence is a UTF-8-encoded
    //         representation of a completely valid JSON object conforming to
    //         RFC 7159 [RFC7159]; let the JOSE Header be this JSON object.


    var jsonHeader = (cov_15bk4lhn0s().s[11]++, JSON.parse(base64URLDecodedHeader)); // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.

    var _ref = (cov_15bk4lhn0s().s[12]++, jsonHeader),
        typ = _ref.typ,
        cty = _ref.cty,
        alg = _ref.alg;

    cov_15bk4lhn0s().s[13]++;

    if ((cov_15bk4lhn0s().b[3][0]++, typ) && (cov_15bk4lhn0s().b[3][1]++, typ !== "JWT")) {
      cov_15bk4lhn0s().b[2][0]++;
      cov_15bk4lhn0s().s[14]++;
      throw new Error("Need to be type jwt. Received: ".concat(typ));
    } else {
      cov_15bk4lhn0s().b[2][1]++;
    }

    cov_15bk4lhn0s().s[15]++;

    if ((cov_15bk4lhn0s().b[5][0]++, cty) && (cov_15bk4lhn0s().b[5][1]++, cty !== "JWT")) {
      cov_15bk4lhn0s().b[4][0]++;
      cov_15bk4lhn0s().s[16]++;
      throw new Error("Need a cty of 'JWT'. Received: ".concat(cty));
    } else {
      cov_15bk4lhn0s().b[4][1]++;
    }

    cov_15bk4lhn0s().s[17]++;

    if (!alg) {
      cov_15bk4lhn0s().b[6][0]++;
      cov_15bk4lhn0s().s[18]++;
      throw new Error("Missing algorithm in JOSE header.");
    } else {
      cov_15bk4lhn0s().b[6][1]++;
    } // 6.   Determine whether the JWT is a JWS or a JWE using any of the
    //         methods described in Section 9 of [JWE].


    cov_15bk4lhn0s().s[19]++;

    if (components.length === 3) {
      cov_15bk4lhn0s().b[7][0]++;
      // JWS
      // 7a   If the JWT is a JWS, follow the steps specified in [JWS] for
      // validating a JWS.  Let the Message be the result of base64url
      // decoding the JWS Payload.
      var payload = (cov_15bk4lhn0s().s[20]++, components[1]);
      var base64urlDecodedPayload = (cov_15bk4lhn0s().s[21]++, Buffer.from(payload, "base64url").toString("utf8"));
      var jsonPayload = (cov_15bk4lhn0s().s[22]++, JSON.parse(base64urlDecodedPayload));
      cov_15bk4lhn0s().s[23]++;
      return {
        header: jsonHeader,
        payload: jsonPayload,
        signature: components[2]
      };
    } else {
      cov_15bk4lhn0s().b[7][1]++;
    }

    cov_15bk4lhn0s().s[24]++;
    throw new Error("Not using compact serialization (JWS).");
  } catch (e) {
    cov_15bk4lhn0s().s[25]++;
    console.error(e.message, e);
    cov_15bk4lhn0s().s[26]++;
    return {
      header: null,
      payload: null,
      signature: null
    };
  }
};
/**
 * Uses HMAC with SHA256 to create the signature of a JWT.
 *
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */


exports.jwtDecode = jwtDecode;
cov_15bk4lhn0s().s[27]++;

var hs256Sign = function hs256Sign(headerPayload, key) {
  cov_15bk4lhn0s().f[1]++;
  var secret = (cov_15bk4lhn0s().s[28]++, _crypto["default"].createSecretKey(key, "base64url"));
  var hmac = (cov_15bk4lhn0s().s[29]++, _crypto["default"].createHmac("sha256", secret));
  cov_15bk4lhn0s().s[30]++;
  hmac.update(headerPayload, "ascii");
  var hmacked = (cov_15bk4lhn0s().s[31]++, hmac.digest());
  var base64URLHmacked = (cov_15bk4lhn0s().s[32]++, Buffer.from(hmacked).toString("base64url"));
  cov_15bk4lhn0s().s[33]++;
  return base64URLHmacked;
};
/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in JWK format.
 *
 * @param {*} headerPayload The combined header and payload in base64url encoding separated by a period.
 * @param {*} key JSON Web Key used to sign the JWT.
 * @returns
 */


cov_15bk4lhn0s().s[34]++;

var rs256JWKSign = function rs256JWKSign(headerPayload, key) {
  cov_15bk4lhn0s().f[2]++;
  var hashes = (cov_15bk4lhn0s().s[35]++, _crypto["default"].getHashes());
  cov_15bk4lhn0s().s[36]++;

  if (hashes.includes("RSA-SHA256")) {
    cov_15bk4lhn0s().b[8][0]++;
    var secret;
    cov_15bk4lhn0s().s[37]++;

    try {
      cov_15bk4lhn0s().s[38]++;

      try {
        cov_15bk4lhn0s().s[39]++;
        secret = JSON.parse(key);
      } catch (e) {
        cov_15bk4lhn0s().s[40]++;

        if (JSON.stringify(key)) {
          cov_15bk4lhn0s().b[9][0]++;
          cov_15bk4lhn0s().s[41]++;
          secret = key;
        } else {
          cov_15bk4lhn0s().b[9][1]++;
          cov_15bk4lhn0s().s[42]++;
          throw new Error("Not valid JSON.");
        }
      }

      var keyObject = (cov_15bk4lhn0s().s[43]++, _crypto["default"].createPrivateKey({
        key: secret,
        format: "jwk"
      }));
      var sig = (cov_15bk4lhn0s().s[44]++, _crypto["default"].sign("sha256", Buffer.from(headerPayload), {
        key: keyObject
      }));
      var sigBase64URL = (cov_15bk4lhn0s().s[45]++, sig.toString("base64url"));
      cov_15bk4lhn0s().s[46]++;
      return sigBase64URL;
    } catch (e) {
      cov_15bk4lhn0s().s[47]++;

      if (e instanceof TypeError) {
        cov_15bk4lhn0s().b[10][0]++;
        cov_15bk4lhn0s().s[48]++;
        secret = key;
      } else {
        cov_15bk4lhn0s().b[10][1]++;
        cov_15bk4lhn0s().s[49]++;
        console.error(e.message, e);
      }
    }
  } else {
    cov_15bk4lhn0s().b[8][1]++;
    cov_15bk4lhn0s().s[50]++;
    console.error("RSA-256 not found");
  }

  cov_15bk4lhn0s().s[51]++;
  return null;
};
/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in PEM format.
 *
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */


cov_15bk4lhn0s().s[52]++;

var rs256PEMSign = function rs256PEMSign(headerPayload, privateKey, passphrase) {
  cov_15bk4lhn0s().f[3]++;
  var hashes = (cov_15bk4lhn0s().s[53]++, _crypto["default"].getHashes());
  var pemKey;
  cov_15bk4lhn0s().s[54]++;

  if (!hashes.includes("RSA-SHA256")) {
    cov_15bk4lhn0s().b[11][0]++;
    cov_15bk4lhn0s().s[55]++;
    console.error("RSA-SHA256 not found");
    cov_15bk4lhn0s().s[56]++;
    return null;
  } else {
    cov_15bk4lhn0s().b[11][1]++;
  }

  cov_15bk4lhn0s().s[57]++;

  try {
    cov_15bk4lhn0s().s[58]++;
    pemKey = _crypto["default"].createPrivateKey({
      key: privateKey,
      format: "pem"
    });
  } catch (e) {
    cov_15bk4lhn0s().s[59]++;

    if ((cov_15bk4lhn0s().b[13][0]++, e instanceof TypeError) && (cov_15bk4lhn0s().b[13][1]++, e.message.includes("Passphrase required for encrypted key"))) {
      cov_15bk4lhn0s().b[12][0]++;
      cov_15bk4lhn0s().s[60]++;

      if (passphrase) {
        cov_15bk4lhn0s().b[14][0]++;
        cov_15bk4lhn0s().s[61]++;
        pemKey = _crypto["default"].createPrivateKey({
          key: privateKey,
          format: "pem",
          passphrase: passphrase
        });
      } else {
        cov_15bk4lhn0s().b[14][1]++;
        cov_15bk4lhn0s().s[62]++;
        throw new Error("Need a passphrase since private key is encrypted");
      }
    } else {
      cov_15bk4lhn0s().b[12][1]++;
    }
  }

  var sig = (cov_15bk4lhn0s().s[63]++, _crypto["default"].sign("sha256", Buffer.from(headerPayload), {
    key: pemKey
  }));
  var sigBase64URL = (cov_15bk4lhn0s().s[64]++, sig.toString("base64url"));
  cov_15bk4lhn0s().s[65]++;
  return sigBase64URL;
};
/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in PEM format.
 *
 * @param {*} jwt The JSON web token.
 * @param {*} publicKey The public key used to verify.
 * @returns
 */


cov_15bk4lhn0s().s[66]++;

var rs256JWKVerify = function rs256JWKVerify(jwt, publicKey) {
  cov_15bk4lhn0s().f[4]++;
  var jwtComponents = (cov_15bk4lhn0s().s[67]++, jwt.split("."));
  var headerPayload = (cov_15bk4lhn0s().s[68]++, jwtComponents[0] + "." + jwtComponents[1]);
  var signature = (cov_15bk4lhn0s().s[69]++, jwtComponents[2]);
  var keyObject = (cov_15bk4lhn0s().s[70]++, _crypto["default"].createPublicKey({
    key: publicKey,
    format: "jwk"
  }));
  var isVerified = (cov_15bk4lhn0s().s[71]++, _crypto["default"].verify(null, Buffer.from(headerPayload, "ascii"), {
    key: keyObject
  }, Buffer.from(signature, "base64url"))); // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")

  cov_15bk4lhn0s().s[72]++;
  return isVerified;
};
/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in PEM format.
 *
 * @param {*} jwt The JSON web token.
 * @param {*} publicKey The public key used to verify.
 * @returns
 */


exports.rs256JWKVerify = rs256JWKVerify;
cov_15bk4lhn0s().s[73]++;

var rs256PEMVerify = function rs256PEMVerify(jwt, publicKey) {
  cov_15bk4lhn0s().f[5]++;
  var jwtComponents = (cov_15bk4lhn0s().s[74]++, jwt.split("."));
  var headerPayload = (cov_15bk4lhn0s().s[75]++, jwtComponents[0] + "." + jwtComponents[1]);
  var signature = (cov_15bk4lhn0s().s[76]++, jwtComponents[2]);
  var keyObject = (cov_15bk4lhn0s().s[77]++, _crypto["default"].createPublicKey({
    key: publicKey,
    format: "pem"
  }));
  var isVerified = (cov_15bk4lhn0s().s[78]++, _crypto["default"].verify(null, Buffer.from(headerPayload, "ascii"), {
    key: keyObject
  }, Buffer.from(signature, "base64url"))); // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")

  cov_15bk4lhn0s().s[79]++;
  return isVerified;
};
/**
 * Encodes a JWT in JWS compact serialization.
 *
 * @export
 * @param {*} header JWT header. Algorithms supported are 'RS256' and 'HS256'.
 * @param {*} payload JWT payload. The data to be included in the JWT.
 * @param {*} key The private key used to create the JWT signature.
 *                    A JWK object or PEM formatted string.
 * @param {*} keyFormat The format of the key if using the RS256 alg.
 *                          Either 'pem' (default) or 'jwk'. Not used if alg is HS256.
 */


exports.rs256PEMVerify = rs256PEMVerify;
cov_15bk4lhn0s().s[80]++;

var jwtEncode = function jwtEncode(header, payload, key, options) {
  cov_15bk4lhn0s().f[6]++;
  var headerBase64URL;
  var payloadBase64URL;
  var jsonHeader = (cov_15bk4lhn0s().s[81]++, header);
  cov_15bk4lhn0s().s[82]++;

  if (Buffer.isEncoding("base64url")) {
    cov_15bk4lhn0s().b[15][0]++;
    cov_15bk4lhn0s().s[83]++;

    if (header instanceof Object) {
      cov_15bk4lhn0s().b[16][0]++;
      cov_15bk4lhn0s().s[84]++;
      // not a string. convert to string
      jsonHeader = header;
      cov_15bk4lhn0s().s[85]++;
      console.log("Using JSON.stringify() to convert to a string");
      var stringifyHeader = (cov_15bk4lhn0s().s[86]++, JSON.stringify(header)); // headerBase64URL = base64url.encode(stringifyHeader);

      cov_15bk4lhn0s().s[87]++;
      headerBase64URL = Buffer.from(stringifyHeader, "ascii").toString("base64url");
    } else {
      cov_15bk4lhn0s().b[16][1]++;
      cov_15bk4lhn0s().s[88]++;
      jsonHeader = JSON.parse(header);
      cov_15bk4lhn0s().s[89]++;
      headerBase64URL = Buffer.from(header, "ascii").toString("base64url");
    }

    cov_15bk4lhn0s().s[90]++;

    if (payload instanceof Object) {
      cov_15bk4lhn0s().b[17][0]++;
      cov_15bk4lhn0s().s[91]++;
      // not a string. convert to string
      console.log("Using JSON.stringify() to convert to a string");

      var _stringifyHeader = (cov_15bk4lhn0s().s[92]++, JSON.stringify(payload)); // headerBase64URL = base64url.encode(stringifyHeader);


      cov_15bk4lhn0s().s[93]++;
      payloadBase64URL = Buffer.from(_stringifyHeader, "ascii").toString("base64url");
    } else {
      cov_15bk4lhn0s().b[17][1]++;
      cov_15bk4lhn0s().s[94]++;
      payloadBase64URL = Buffer.from(payload, "ascii").toString("base64url");
    }

    var headerPayload = (cov_15bk4lhn0s().s[95]++, "".concat(headerBase64URL, ".").concat(payloadBase64URL));

    var _ref2 = (cov_15bk4lhn0s().s[96]++, jsonHeader),
        alg = _ref2.alg;

    var sig;
    cov_15bk4lhn0s().s[97]++;

    if (alg) {
      cov_15bk4lhn0s().b[18][0]++;
      cov_15bk4lhn0s().s[98]++;

      switch (alg.toLowerCase()) {
        case "hs256":
          cov_15bk4lhn0s().b[19][0]++;
          cov_15bk4lhn0s().s[99]++;
          sig = hs256Sign(headerPayload, key);
          cov_15bk4lhn0s().s[100]++;
          break;

        case "rs256":
          cov_15bk4lhn0s().b[19][1]++;
          cov_15bk4lhn0s().s[101]++;

          if ((cov_15bk4lhn0s().b[21][0]++, options) && (cov_15bk4lhn0s().b[21][1]++, options.keyFormat)) {
            cov_15bk4lhn0s().b[20][0]++;
            var keyFormat = (cov_15bk4lhn0s().s[102]++, options.keyFormat);
            cov_15bk4lhn0s().s[103]++;

            if (keyFormat.toLowerCase() === "jwk") {
              cov_15bk4lhn0s().b[22][0]++;
              cov_15bk4lhn0s().s[104]++;
              sig = rs256JWKSign(headerPayload, key);
            } else {
              cov_15bk4lhn0s().b[22][1]++;
              cov_15bk4lhn0s().s[105]++;

              if (keyFormat.toLowerCase() === "pem") {
                cov_15bk4lhn0s().b[23][0]++;
                cov_15bk4lhn0s().s[106]++;

                if (options.passphrase) {
                  cov_15bk4lhn0s().b[24][0]++;
                  cov_15bk4lhn0s().s[107]++;
                  sig = rs256PEMSign(headerPayload, key, options.passphrase);
                } else {
                  cov_15bk4lhn0s().b[24][1]++;
                  cov_15bk4lhn0s().s[108]++;
                  sig = rs256PEMSign(headerPayload, key);
                }
              } else {
                cov_15bk4lhn0s().b[23][1]++;
              }
            }
          } else {
            cov_15bk4lhn0s().b[20][1]++;
            cov_15bk4lhn0s().s[109]++;
            // Default to "pem"
            throw new Error("Need to specify keyFormat in options for RS256 algorithm as either jwk or pem.");
          }

          cov_15bk4lhn0s().s[110]++;
          break;

        default:
          cov_15bk4lhn0s().b[19][2]++;
          cov_15bk4lhn0s().s[111]++;
          throw new Error("Unsupported alg: ".concat(alg));
      }

      cov_15bk4lhn0s().s[112]++;
      return headerPayload + "." + sig;
    } else {
      cov_15bk4lhn0s().b[18][1]++;
      cov_15bk4lhn0s().s[113]++;
      throw new Error("Algorithm couldn't be determined. alg:" + alg);
    }
  } else {
    cov_15bk4lhn0s().b[15][1]++;
    cov_15bk4lhn0s().s[114]++;
    throw new Error("Error: Base64URL encoding isn't available.");
  }
};

exports.jwtEncode = jwtEncode;
var _default = jwtDecode;
exports["default"] = _default;