#!/usr/bin/env node

import jwt from "jwt-authn";
import { generateKeyPairSync } from "node:crypto";

const createKeyPair = ({ format }) => {
  if (format !== "pem" || format !== "der" || format !== "jwk") {
    throw new Error(
      "Format of generated keys needs to be one of the following: pem, der, or jwk. Received " +
        format +
        "instead."
    );
  }

  const keyPair = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format,
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format,
    },
  });

  return keyPair;
};

// TODO: Finish working on this function
const createJWTSig = ({ header, payload, privateKey }) => {
  let headerB64URL;
  let jsonHeader;

  if (Buffer.isEncoding("base64url")) {
    // do I even need it to be a JSON object?
    // try {
    //   jsonHeader = JSON.parse(header);
    // } catch (error) {
    //   // if it says something about already being an object or JSON, then can
    // }

    // need to check if utf16 is the right encoding
    // that's what strings in JS use
    // but ascii has worked so far
    // default is utf8 which is pretty ubiquitous
    headerB64URL = Buffer.from(header, "utf16").toString("base64url");

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
  }
};

// TODO: Finish this function after finishing auxiliary functions
const createJWT = () => {
  const decodedJWT = {
    header: { alg: "RS256" },
    payload: {
      "iss": "anthony",
      "exp": 1300819380,
      "http://example.com/is_root": true,
    },
    signature:
      "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
  };
};

// TODO: Finish this function once can create a JWT, then can decode it using the jwt-authn package
const testJWTDecode = ({ jwt }) => {};
