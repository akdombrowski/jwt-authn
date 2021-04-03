"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jwtEncode = exports.rs256PEMVerify = exports.rs256JWKVerify = exports.jwtDecode = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Decodes a JWT that is in JWS format.
 *
 * @export
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */
var jwtDecode = function jwtDecode(jwt) {
  try {
    // 1.   Verify that the JWT contains at least one period ('.')
    //        character.
    if (!jwt.includes(".")) {
      throw new Error("Need at least one '.'");
    } // 2.   Let the Encoded JOSE Header be the portion of the JWT before the
    //     first period ('.') character.


    var components = jwt.split(".");
    var header = components[0]; // 3.   Base64url decode the Encoded JOSE Header following the
    // restriction that no line breaks, whitespace, or other additional
    // characters have been used.

    var base64URLDecodedHeader = Buffer.from(header, "base64url").toString("utf8");

    if (!base64URLDecodedHeader) {
      console.err("base64URLDecodedHeader");
      console.err(base64URLDecodedHeader);
      throw new Error("Header isn't base64url encoded");
    } // 4.   Verify that the resulting octet sequence is a UTF-8-encoded
    //         representation of a completely valid JSON object conforming to
    //         RFC 7159 [RFC7159]; let the JOSE Header be this JSON object.


    var jsonHeader = JSON.parse(base64URLDecodedHeader); // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.

    var typ = jsonHeader.typ,
        cty = jsonHeader.cty,
        alg = jsonHeader.alg;

    if (typ && typ !== "JWT") {
      throw new Error("Need to be type jwt. Received: ".concat(typ));
    }

    if (cty && cty !== "JWT") {
      throw new Error("Need a cty of 'JWT'. Received: ".concat(cty));
    }

    if (!alg) {
      throw new Error("Missing algorithm in JOSE header.");
    } // 6.   Determine whether the JWT is a JWS or a JWE using any of the
    //         methods described in Section 9 of [JWE].


    if (components.length === 3) {
      // JWS
      // 7a   If the JWT is a JWS, follow the steps specified in [JWS] for
      // validating a JWS.  Let the Message be the result of base64url
      // decoding the JWS Payload.
      var payload = components[1];
      var base64urlDecodedPayload = Buffer.from(payload, "base64url").toString("utf8");
      var jsonPayload = JSON.parse(base64urlDecodedPayload);
      return {
        header: jsonHeader,
        payload: jsonPayload,
        signature: components[2]
      };
    }

    throw new Error("Not using compact serialization (JWS).");
  } catch (e) {
    console.error(e.message, e);
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

var hs256Sign = function hs256Sign(headerPayload, key) {
  var secret = _crypto["default"].createSecretKey(key, "base64url");

  var hmac = _crypto["default"].createHmac("sha256", secret);

  hmac.update(headerPayload, "ascii");
  var hmacked = hmac.digest();
  var base64URLHmacked = Buffer.from(hmacked).toString("base64url");
  return base64URLHmacked;
};
/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in JWK format.
 *
 * @param {*} headerPayload The combined header and payload in base64url encoding separated by a period.
 * @param {*} key JSON Web Key used to sign the JWT.
 * @returns
 */


var rs256JWKSign = function rs256JWKSign(headerPayload, key) {
  var hashes = _crypto["default"].getHashes();

  if (hashes.includes("RSA-SHA256")) {
    var secret;

    try {
      try {
        secret = JSON.parse(key);
      } catch (e) {
        if (JSON.stringify(key)) {
          secret = key;
        } else {
          throw new Error("Not valid JSON.");
        }
      }

      var keyObject = _crypto["default"].createPrivateKey({
        key: secret,
        format: "jwk"
      });

      var sig = _crypto["default"].sign("sha256", Buffer.from(headerPayload), {
        key: keyObject
      });

      var sigBase64URL = sig.toString("base64url");
      return sigBase64URL;
    } catch (e) {
      if (e instanceof TypeError) {
        secret = key;
      } else {
        console.error(e.message, e);
      }
    }
  } else {
    console.error("RSA-256 not found");
  }

  return null;
};
/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in PEM format.
 *
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */


var rs256PEMSign = function rs256PEMSign(headerPayload, privateKey, passphrase) {
  var hashes = _crypto["default"].getHashes();

  var pemKey;

  if (!hashes.includes("RSA-SHA256")) {
    console.error("RSA-SHA256 not found");
    return null;
  }

  try {
    pemKey = _crypto["default"].createPrivateKey({
      key: privateKey,
      format: "pem"
    });
  } catch (e) {
    if (e instanceof TypeError && e.message.includes("Passphrase required for encrypted key")) {
      if (passphrase) {
        pemKey = _crypto["default"].createPrivateKey({
          key: privateKey,
          format: "pem",
          passphrase: passphrase
        });
      } else {
        throw new Error("Need a passphrase since private key is encrypted");
      }
    }
  }

  var sig = _crypto["default"].sign("sha256", Buffer.from(headerPayload), {
    key: pemKey
  });

  var sigBase64URL = sig.toString("base64url");
  return sigBase64URL;
};
/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in PEM format.
 *
 * @param {*} jwt The JSON web token.
 * @param {*} publicKey The public key used to verify.
 * @returns
 */


var rs256JWKVerify = function rs256JWKVerify(jwt, publicKey) {
  var jwtComponents = jwt.split(".");
  var headerPayload = jwtComponents[0] + "." + jwtComponents[1];
  var signature = jwtComponents[2];

  var keyObject = _crypto["default"].createPublicKey({
    key: publicKey,
    format: "jwk"
  });

  var isVerified = _crypto["default"].verify(null, Buffer.from(headerPayload, "ascii"), {
    key: keyObject
  }, Buffer.from(signature, "base64url")); // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")


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

var rs256PEMVerify = function rs256PEMVerify(jwt, publicKey) {
  var jwtComponents = jwt.split(".");
  var headerPayload = jwtComponents[0] + "." + jwtComponents[1];
  var signature = jwtComponents[2];

  var keyObject = _crypto["default"].createPublicKey({
    key: publicKey,
    format: "pem"
  });

  var isVerified = _crypto["default"].verify(null, Buffer.from(headerPayload, "ascii"), {
    key: keyObject
  }, Buffer.from(signature, "base64url")); // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")


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

var jwtEncode = function jwtEncode(header, payload, key, options) {
  var headerBase64URL;
  var payloadBase64URL;
  var jsonHeader = header;

  if (Buffer.isEncoding("base64url")) {
    if (header instanceof Object) {
      // not a string. convert to string
      jsonHeader = header;
      console.log("Using JSON.stringify() to convert to a string");
      var stringifyHeader = JSON.stringify(header); // headerBase64URL = base64url.encode(stringifyHeader);

      headerBase64URL = Buffer.from(stringifyHeader, "ascii").toString("base64url");
    } else {
      jsonHeader = JSON.parse(header);
      headerBase64URL = Buffer.from(header, "ascii").toString("base64url");
    }

    if (payload instanceof Object) {
      // not a string. convert to string
      console.log("Using JSON.stringify() to convert to a string");

      var _stringifyHeader = JSON.stringify(payload); // headerBase64URL = base64url.encode(stringifyHeader);


      payloadBase64URL = Buffer.from(_stringifyHeader, "ascii").toString("base64url");
    } else {
      payloadBase64URL = Buffer.from(payload, "ascii").toString("base64url");
    }

    var headerPayload = "".concat(headerBase64URL, ".").concat(payloadBase64URL);
    var _jsonHeader = jsonHeader,
        alg = _jsonHeader.alg;
    var sig;

    if (alg) {
      switch (alg.toLowerCase()) {
        case "hs256":
          sig = hs256Sign(headerPayload, key);
          break;

        case "rs256":
          if (options && options.keyFormat) {
            var keyFormat = options.keyFormat;

            if (keyFormat.toLowerCase() === "jwk") {
              sig = rs256JWKSign(headerPayload, key);
            } else if (keyFormat.toLowerCase() === "pem") {
              if (options.passphrase) {
                sig = rs256PEMSign(headerPayload, key, options.passphrase);
              } else {
                sig = rs256PEMSign(headerPayload, key);
              }
            }
          } else {
            // Default to "pem"
            throw new Error("Need to specify keyFormat in options for RS256 algorithm as either jwk or pem.");
          }

          break;

        default:
          throw new Error("Unsupported alg: ".concat(alg));
      }

      return headerPayload + "." + sig;
    } else {
      throw new Error("Algorithm couldn't be determined. alg:" + alg);
    }
  } else {
    throw new Error("Error: Base64URL encoding isn't available.");
  }
};

exports.jwtEncode = jwtEncode;
var _default = jwtDecode;
exports["default"] = _default;