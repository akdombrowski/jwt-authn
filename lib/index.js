'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtDecode = jwtDecode;
exports.jwtEncode = jwtEncode;

require('crypto');

var _base64url = require('base64url');

var _base64url2 = _interopRequireDefault(_base64url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jwtDecode(jwt) {
  try {
    console.log(jwt);
    if (!jwt.includes('.')) {
      throw new Error("Need at least one '.'");
    }

    var components = jwt.split('.');
    var header = components[0];
    var base64DecodedHeader = JSON.parse(_base64url2.default.decode(header));

    console.log('base64DecodedHeader');
    console.log(base64DecodedHeader);
    if (!base64DecodedHeader) {
      console.log('header');
      console.log(header);
      throw new Error("Header isn't base64 encoded");
    }

    var typ = base64DecodedHeader.typ,
        cty = base64DecodedHeader.cty,
        alg = base64DecodedHeader.alg;


    if (typ && typ !== 'JWT') {
      throw new Error('Need to be type jwt.');
    }
    if (cty && cty !== 'JWT') {
      throw new Error("Need a cty of 'JWT'");
    }
    if (!alg) {
      throw new Error('Missing algorithm in JOSE header.');
    }
  } catch (e) {
    console.error(e.message, e);
  }
}
function jwtEncode() {
  console.log('jwtEncode here');
}