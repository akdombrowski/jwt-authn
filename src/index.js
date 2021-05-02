import crypto from "crypto";

/**
 * Decodes a JWT that is in JWS format.
 *
 * @export
 * @param {*} jwt JSON Web Token in JSON Web Signature format to decode.
 * @returns The decoded JWT as an object with header, payload, and signature
 *    as the keys.
 */
export const jwtDecode = (jwt) => {
  try {
    // 1.   Verify that the JWT contains at least one period ('.')
    //        character.
    if (!jwt.includes(".")) {
      throw new Error("Need at least one '.'");
    }

    // 2.   Let the Encoded JOSE Header be the portion of the JWT before the
    //     first period ('.') character.
    const components = jwt.split(".");
    const header = components[0];

    // 3.   Base64url decode the Encoded JOSE Header following the
    // restriction that no line breaks, whitespace, or other additional
    // characters have been used.
    const base64URLDecodedHeader = Buffer.from(header, "base64url").toString(
      "utf8"
    );
    if (!base64URLDecodedHeader) {
      console.error("base64URLDecodedHeader");
      console.error(base64URLDecodedHeader);
      throw new Error("Header isn't base64url encoded");
    }

    // 4.   Verify that the resulting octet sequence is a UTF-8-encoded
    //         representation of a completely valid JSON object conforming to
    //         RFC 7159 [RFC7159]; let the JOSE Header be this JSON object.
    const jsonHeader = JSON.parse(base64URLDecodedHeader);

    // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.
    const { typ, cty, alg } = jsonHeader;

    if (typ && typ !== "JWT") {
      throw new Error(`Need to be type jwt. Received: ${typ}`);
    }
    if (cty && cty !== "JWT") {
      throw new Error(`Need a cty of 'JWT'. Received: ${cty}`);
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
      const payload = components[1];
      const base64urlDecodedPayload = Buffer.from(
        payload,
        "base64url"
      ).toString("utf8");
      const jsonPayload = JSON.parse(base64urlDecodedPayload);

      return {
        header: jsonHeader,
        payload: jsonPayload,
        signature: components[2],
      };
    }

    throw new SyntaxError("Not using compact serialization (JWS).");
  } catch (e) {
    // debugging(e);
    throw e;
  }
};

const debugging = (e) => {
  // debugging
  console.error(e.message, e);
  console.error("e instanceof SyntaxError");
  console.error(e instanceof SyntaxError);
  console.error(e.message);
  console.error(e.name);
  console.error(e.fileName);
  console.error(e.lineNumber);
  console.error(e.columnNumber);
  console.error(e.stack);
};

/**
 * Uses HMAC with SHA256 to create the signature of a JWT.
 *
 * @export
 * @param {*} headerPayload The combined header and payload separated
 *    by a ".".
 * @param {*} key The private key used to sign the JWT.
 * @returns The signature in base64url encoding.
 */
export const hs256Sign = (headerPayload, key) => {
  const secret = crypto.createSecretKey(key, "base64url");
  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(headerPayload, "ascii");
  const hmacked = hmac.digest();
  const base64URLHmacked = Buffer.from(hmacked).toString("base64url");

  return base64URLHmacked;
};

/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in JWK
 *    format.
 *
 * @export
 * @param {*} headerPayload The combined header and payload in base64url
 *    encoding separated by a period.
 * @param {*} privateKey JSON Web Key used to sign the JWT. Must be in jwk
 *    format.
 * @returns Returns the signature in base64url encoding, or null if
 *    failure occurs.
 */
export const rs256JWKSign = (headerPayload, privateKey) => {
  const hashes = crypto.getHashes();
  if (hashes.includes("RSA-SHA256")) {
    let secret;
    try {
      try {
        secret = JSON.parse(privateKey);
      } catch (e) {
        if (JSON.stringify(privateKey)) {
          secret = privateKey;
        } else {
          throw new Error("Not valid JSON.");
        }
      }

      const keyObject = crypto.createPrivateKey({ key: secret, format: "jwk" });
      const sig = crypto.sign("sha256", Buffer.from(headerPayload), {
        key: keyObject,
      });
      const sigBase64URL = sig.toString("base64url");

      return sigBase64URL;
    } catch (e) {
      if (e instanceof TypeError) {
        secret = privateKey;
      } else {
        console.error("I found an error :(.");
        console.error(e.message, e);
      }
    }
  } else {
    console.error("I found an error :(.");
    console.error("RSA-SHA256 not found");
    throw new Error("RSA-SHA256 isn't available in the current system.");
  }

  return null;
};

/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in PEM
 *    format.
 *
 * @export
 * @param {*} headerPayload The combined header and payload. Each in base64url
 *    format, concatenated by a
 * @param {*} privateKey The private key that's used to sign the JWT.
 * @param {*} passphrase If privateKey is encrypted, we need a passphrase to
 *    decrypt.
 * @returns The signature in base64url encoded format. Throws an error if
 *    encrypted key is given with no passphrase. Returns null if RSA-SHA256
 *    hash is unavailable in the currently used version of node.
 */
export const rs256PEMSign = (headerPayload, privateKey, passphrase) => {
  const hashes = crypto.getHashes();
  let pemKey;

  if (!hashes.includes("RSA-SHA256")) {
    console.error("RSA-SHA256 not found");
    return null;
  }

  try {
    pemKey = crypto.createPrivateKey({ key: privateKey, format: "pem" });
  } catch (e) {
    if (
      e instanceof TypeError &&
      e.message.includes("Passphrase required for encrypted key")
    ) {
      if (passphrase) {
        pemKey = crypto.createPrivateKey({
          key: privateKey,
          format: "pem",
          passphrase: passphrase,
        });
      } else {
        throw new Error("Need a passphrase since private key is encrypted");
      }
    }
  }
  const sig = crypto.sign("sha256", Buffer.from(headerPayload), {
    key: pemKey,
  });
  const sigBase64URL = sig.toString("base64url");

  return sigBase64URL;
};

/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in jwk format.
 *
 * @export
 * @param {*} jwt The JSON web token.
 * @param {*} publicKey The public key used to verify the signature of the JWT.
 *    Must be in jwk format for this method.
 * @returns True if the signature has been verified, false otherwise.
 */
export const rs256JWKVerify = (jwt, publicKey) => {
  const jwtComponents = jwt.split(".");
  const headerPayload = jwtComponents[0] + "." + jwtComponents[1];
  const signature = jwtComponents[2];
  const keyObject = crypto.createPublicKey({
    key: publicKey,
    format: "jwk",
  });

  // If `algorithm` (first argument) is `null` or `undefined`, then the
  //    algorithm is dependent upon the key type
  const isVerified = crypto.verify(
    null,
    Buffer.from(headerPayload, "ascii"),
    {
      key: keyObject,
    },
    Buffer.from(signature, "base64url")
  );

  /*
   * Could also use this
   */
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")

  return isVerified;
};

/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in PEM format.
 *
 * @export
 * @param {*} jwt The JSON web token.
 * @param {*} publicKey The public key used to verify. Must be a PEM formatted
 *                      string.
 *    for this method
 * @returns True if verified, false otherwise.
 */
export const rs256PEMVerify = (jwt, publicKey) => {
  const jwtComponents = jwt.split(".");
  const headerPayload = jwtComponents[0] + "." + jwtComponents[1];
  const signature = jwtComponents[2];
  const keyObject = crypto.createPublicKey({
    key: publicKey,
    format: "pem",
  });

  // If `algorithm` (first argument) is `null` or `undefined`, then the
  //    algorithm is dependent upon the key type
  const isVerified = crypto.verify(
    null,
    Buffer.from(headerPayload, "ascii"),
    {
      key: keyObject,
    },
    Buffer.from(signature, "base64url")
  );

  // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")

  return isVerified;
};

/**
 * Verifies a jwt signed with HS256 (HMAC with SHA256) with a passphrase.
 *
 * @export
 * @param {string} jwt The JSON web token.
 * @param {string} passphrase The secret or passphrase used to sign the jwt.
 * @param {string} passphraseEncoding The encoding of the passphrase or secret.
 *
 * @returns True if verified, false otherwise.
 */
export const hs256Verify = (jwt, passphrase, passphraseEncoding) => {
  const jwtComponents = jwt.split(".");
  const headerPayload = jwtComponents[0] + "." + jwtComponents[1];
  const signature = jwtComponents[2];

  let secret = crypto.createSecretKey(passphrase, "base64url");
  if (passphraseEncoding && Buffer.isEncoding(passphraseEncoding)) {
    secret = crypto.createSecretKey(passphrase, passphraseEncoding);
  } else {
    secret = crypto.createSecretKey(passphrase, "base64url");
  }

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(headerPayload, "ascii");
  const hmacked = hmac.digest();
  const base64URLHmacked = Buffer.from(hmacked).toString("base64url");

  // Check for equality between the signature in the jwt and what we just created.
  const isVerified = base64URLHmacked === signature;

  // Could also use this:
  // const verify = crypto.createVerify("SHA256");
  // verify.update(headerPayload, "ascii");
  // verify.end();
  // verify.verify(keyObject, signature, "base64")

  return isVerified;
};

/**
 * Creates the combined header payload portion of the JWT. Can accept JSON
 * objects or string literals.
 *
 * @export
 * @param {*} header The decoded header.
 * @param {*} payload The decoded payload.
 * @returns The combined the header payload portion of the JWT. It is equal to
 *          base64url(header) + "." + base64url(payload).
 */
export const createHeaderPayload = (header, payload) => {
  if (Buffer.isEncoding("base64url")) {
    let headerBase64URL;
    let payloadBase64URL;

    // use string literals
    if (typeof header === "string") {
      headerBase64URL = Buffer.from(header, "ascii").toString("base64url");
    } else {
      const jsonHeader = parseToJSON(header);
      headerBase64URL = base64URLEncode(jsonHeader);
    }

    if (typeof payload === "string") {
      // use string literals
      payloadBase64URL = Buffer.from(payload, "ascii").toString("base64url");
    } else {
      const jsonPayload = parseToJSON(payload);
      payloadBase64URL = base64URLEncode(jsonPayload);
    }

    const headerPayload = `${headerBase64URL}.${payloadBase64URL}`;

    return headerPayload;
  }

  throw new Error("Error: Base64URL encoding isn't available.");
};

/**
 * Encodes the JSON object input in base64url format. Must be in JSON format.
 *   Uses JSON stringify to convert jsonObject input.
 *
 * @export
 * @param {*} jsonObject The header or payload (or anything) in JSON object fromat.
 * @returns The base64URL encoding of the input.
 */
export const base64URLEncode = (jsonObject) => {
  if (Buffer.isEncoding("base64url")) {
    // not a string. convert to string
    const stringifyHeader = JSON.stringify(jsonObject);
    // headerBase64URL = base64url.encode(stringifyHeader);
    const payloadBase64URL = Buffer.from(stringifyHeader, "ascii").toString(
      "base64url"
    );
    return payloadBase64URL;
  }

  throw new Error("Error: Base64URL encoding isn't available");
};

/**
 * Converts input into a JSON object.
 *
 * @export
 * @param {*} input The input to be parsed as JSON. Will try to take string or
 *                  JSON object.
 * @returns The input as a JSON object.
 */
export const parseToJSON = (input) => {
  let json = input;

  if (Buffer.isEncoding("base64url")) {
    if (input instanceof Object) {
      // already appears to be a JSON object.
      json = input;
    } else {
      // received a string. convert to json object.
      json = JSON.parse(input);
    }
    return json;
  }

  throw new Error("Error: Base64URL encoding isn't available");
};

/**
 * Encodes a JWT in JWS compact serialization.
 *
 * @export
 * @param {*} header JWT header. Algorithms supported are 'RS256' and 'HS256'.
 * @param {*} payload JWT payload. The data to be included in the JWT.
 * @param {*} key The private key used to create the JWT signature.
 *    A JWK object or PEM formatted string. Or a passphrase for HS256.
 * @param {*} options Includes keyFormat and passphrase. keyFormat is the
 *    format of the key if using the RS256 alg. Either 'pem' or 'jwk'. Not used
 *    if alg is HS256. passphrase is to decrypt an encrypted PEM key.
 * @returns The encoded JWT.
 */
export const jwtEncode = (header, payload, key, options) => {
  let headerBase64URL;
  let payloadBase64URL;
  let jsonHeader = header;

  if (Buffer.isEncoding("base64url")) {
    if (header instanceof Object) {
      // not a string. convert to string
      jsonHeader = header;
      const stringifyHeader = JSON.stringify(header);
      // headerBase64URL = base64url.encode(stringifyHeader);
      headerBase64URL = Buffer.from(stringifyHeader, "ascii").toString(
        "base64url"
      );
    } else {
      jsonHeader = JSON.parse(header);

      headerBase64URL = Buffer.from(header, "ascii").toString("base64url");
    }

    const headerPayload = createHeaderPayload(header, payload);

    const { alg } = jsonHeader;

    let sig;
    if (alg) {
      switch (alg.toLowerCase()) {
        case "hs256":
          sig = hs256Sign(headerPayload, key);
          break;
        case "rs256":
          if (options && options.keyFormat) {
            const keyFormat = options.keyFormat;
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
            throw new Error(
              "Need to specify keyFormat in options for RS256 algorithm as either jwk or pem."
            );
          }
          break;
        default:
          throw new Error(`Unsupported alg: ${alg}`);
      }
      return headerPayload + "." + sig;
    } else {
      throw new Error("Algorithm couldn't be determined. alg:" + alg);
    }
  }

  throw new Error("Error: Base64URL encoding isn't available.");
};

// Default use-case is to decode a JWT.
export default jwtDecode;
