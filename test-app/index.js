#!/usr/bin/env node

import { jwtDecode } from "jwt-authn";
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
const testJWTDecode = ({ jwt, expectedDecode }) => {
  const decoded = jwtDecode(jwt);
  const encodedJWT =
    "eyJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjAzMzc2MDExfQ.R2_pYKYmwkOA4AnrC7DXvpsz_7IU5gMCeY1fSLJD2NvTZ8hF7FfCcW94YpJf8uBrD4PeJjzzYGom7MiuSUejjd10EKD0rKtBfMP5IeUpABITdxuIll7IfSanknVFjdCbRwYhy1LY1BbRhcDlf4zl3qoskY_d3SQDZ6aZONv9V4p2tMK8nhnYYvRoOZCDMzZlX_kIj-Inad8xShoR9v6upG5N7roj0FgfbfhMhtimGSQD8zV-W9F3fpcn-Kn2babJWpxx1Md0lATtkpj4asZZ-0pVP7aSu2ca8JBlYTBf2aNI_7Owzo8gI6jDmd1ZbiHHJwfpqm274h4wS0DUYCOU24Xt5I2uFCMKQtIEmdH0KaIOTjwIitdZ20HeaSNIUBKdkvHxngmfvhvbZaA1OrwwIM_pu-0gst1PseuFAj5u3KII2t5HVrTQzoaXZWh4muq8r-snaOfPmRnprqectRsSC00rAlJzG77yLuENlwtnSCCoQqEHALvuXG_OOXw973tiaBYP0FcL4iYXeMgNwi13W8t-vPBxm8VHG1Bg6Zfgrt-w6FUNaQcHMTrm97-GLv3er5gwccfiKf0F3AdC6fvXeq3SZNyZ65QucNwr-1Iui2IeDIJvmMIaweePaEAOF1QO0rL29QUpUr1ShvcIWJCPEazFX7wgoMlpS8OaTpERq_o";
  const decodedJWT = {
    header: {
      alg: "RS256",
      cty: "JWT",
    },
    payload: {
      iss: "anthony",
      sub: "1234567890",
      iat: 1603376011,
    },
    signature:
      "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
  };
};
