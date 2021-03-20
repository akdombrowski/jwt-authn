"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtDecode = jwtDecode;
exports.jwtEncode = jwtEncode;

var _base64url = require("base64url");

var _base64url2 = _interopRequireDefault(_base64url);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jwtDecode(jwt) {
  try {
    // 1.   Verify that the JWT contains at least one period ('.')
    //        character.
    if (!jwt.includes(".")) {
      throw new Error("Need at least one '.'");
    }

    // 2.   Let the Encoded JOSE Header be the portion of the JWT before the
    //     first period ('.') character.
    var components = jwt.split(".");
    var header = components[0];

    // 3.   Base64url decode the Encoded JOSE Header following the
    // restriction that no line breaks, whitespace, or other additional
    // characters have been used.
    var base64DecodedHeader = _base64url2.default.decode(header);
    if (!base64DecodedHeader) {
      console.err("base64DecodedHeader");
      console.err(base64DecodedHeader);
      throw new Error("Header isn't base64url encoded");
    }

    // 4.   Verify that the resulting octet sequence is a UTF-8-encoded
    //         representation of a completely valid JSON object conforming to
    //         RFC 7159 [RFC7159]; let the JOSE Header be this JSON object.
    var jsonHeader = JSON.parse(base64DecodedHeader);

    // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.
    var typ = jsonHeader.typ,
        cty = jsonHeader.cty,
        alg = jsonHeader.alg;


    if (typ && typ !== "JWT") {
      throw new Error("Need to be type jwt. Received: " + typ);
    }
    if (cty && cty !== "JWT") {
      throw new Error("Need a cty of 'JWT'. Received: " + cty);
    }
    if (!alg) {
      throw new Error("Missing algorithm in JOSE header.");
    }

    // 6.   Determine whether the JWT is a JWS or a JWE using any of the
    //         methods described in Section 9 of [JWE].
    if (components.length === 3) {
      // JWS
      // 7a   If the JWT is a JWS, follow the steps specified in [JWS] for
      // validating a JWS.  Let the Message be the result of base64url
      // decoding the JWS Payload.
      var payload = components[1];
      var base64urlDecodedPayload = _base64url2.default.decode(payload);
      var jsonPayload = JSON.parse(base64urlDecodedPayload);

      return {
        header: jsonHeader,
        payload: jsonPayload,
        signature: components[2]
      };
    }

    if (components.length === 5) {
      throw new Error("JWE not currently supported.");
      // TODO
      // // JWE
      // // 7b   Else, if the JWT is a JWE, follow the steps specified in
      // //      [JWE] for validating a JWE.  Let the Message be the resulting
      // //      plaintext.
      // // When using the JWE Compact Serialization, the
      // //   JWE Protected Header, the JWE Encrypted Key, the JWE
      // //   Initialization Vector, the JWE Ciphertext, and the JWE
      // //   Authentication Tag are represented as base64url-encoded values
      // //   in that order, with each value being separated from the next by
      // //   a single period ('.') character, resulting in exactly four
      // //   delimiting period characters being used.
      // // header = components[0]
      // const key = components[1];
      // const initVector = components[2];
      // const ciphertext = components[3];
      // const authnTag = components[4];

      // // const base64urlDecodedKey = base64url.decode(key);
      // const base64urlDecodedKey = base64url.toBuffer(key).toString();
      // const base64urlDecodedInitVector = base64url.decode(initVector);
      // const base64urlDecodedCiphertext = base64url.decode(ciphertext);
      // const base64urlDecodedAuthnTag = base64url.decode(authnTag);

      // switch(alg) {

      // }
    } else {
      throw new Error("Not using compact serialization.");
    }
  } catch (e) {
    console.error(e.message, e);
    return { header: "header", payload: "payload", signature: "signature" };
  }
}

function hs256(value, key) {
  var hmac = _crypto2.default.createHmac("sha256", key);
  hmac.update(value);
  return hmac.digest("utf8");
}

function jwtEncode(header, payload, key) {
  var jsonHeader = void 0;
  try {
    jsonHeader = JSON.parse(header);
  } catch (e) {
    // Is it invald json syntax or is it not a string
    console.err(e.name + ":" + e.message);
  }
  console.log("jsonHeader");
  console.log(jsonHeader);

  var headerBase64URL = _base64url2.default.encode(header);
  console.log("headerBase64URL");
  console.log(headerBase64URL);
  console.log("eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9");
  var payloadBase64URL = _base64url2.default.encode(JSON.stringify(payload));
  console.log("payloadBase64URL");
  console.log(payloadBase64URL);
  console.log("eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ");
  var headerPayload = headerBase64URL + "." + payloadBase64URL;
  console.log("headerPayload");
  console.log(headerPayload);
  var headerPayloadBuff = Buffer.from(headerPayload, "ascii");
  console.log("headerPayloadBuff");
  console.log(headerPayloadBuff);

  var _JSON$parse = JSON.parse(header),
      alg = _JSON$parse.alg;

  console.log("alg");
  console.log(alg);
  var sig = void 0;
  switch (alg) {
    case "HS256":
      sig = Buffer.from(hs256(headerPayload, key)).toString("utf8");
      break;
    default:
      throw new Error("Unsupported alg." + alg);
  }
  console.log("sig");
  console.log(sig);
  var sigBase64URL = _base64url2.default.encode(Buffer.from(sig, "ascii").toString());
  console.log("sigBase64URL");
  console.log(sigBase64URL);
  var sigBase64URL2 = _base64url2.default.encode(Buffer.from(sig, "utf8").toString());
  console.log("sigBase64URL2");
  console.log(sigBase64URL2);
}