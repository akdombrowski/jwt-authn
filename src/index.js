import crypto from "crypto";

/**
 * Decodes a JWT that is in JWS format.
 *
 * @export
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
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
      console.err("base64URLDecodedHeader");
      console.err(base64URLDecodedHeader);
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

    throw new Error("Not using compact serialization (JWS).");
  } catch (e) {
    console.error(e.message, e);
    return { header: null, payload: null, signature: null };
  }
};

/**
 * Uses HMAC with SHA256 to create the signature of a JWT.
 *
 * @param {*} jwt JSON Web Token in JSON Web Signature format
 * @returns
 */
const hs256Sign = (headerPayload, key) => {
  const secret = crypto.createSecretKey(key, "base64url");
  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(headerPayload, "ascii");
  const hmacked = hmac.digest();
  const base64URLHmacked = Buffer.from(hmacked).toString("base64url");

  return base64URLHmacked;
};

/**
 * Uses RSA with SHA256 to create the signature of a JWT if key is in JWK format.
 *
 * @param {*} headerPayload The combined header and payload in base64url encoding separated by a period.
 * @param {*} key JSON Web Key used to sign the JWT.
 * @returns
 */
const rs256JWKSign = (headerPayload, key) => {
  const hashes = crypto.getHashes();
  if (hashes.includes("RSA-SHA256")) {
    let secret;
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

      const keyObject = crypto.createPrivateKey({ key: secret, format: "jwk" });
      const sig = crypto.sign("sha256", Buffer.from(headerPayload), {
        key: keyObject,
      });
      const sigBase64URL = sig.toString("base64url");

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
const rs256PEMSign = (headerPayload, privateKey) => {
  const hashes = crypto.getHashes();
  if (!hashes.includes("RSA-SHA256")) {
    console.error("RSA-SHA256 not found");
    return null;
  }

  const pemKey = crypto.createPrivateKey({ key: privateKey, format: "pem" });
  const sig = crypto.sign("sha256", Buffer.from(headerPayload), {
    key: pemKey,
  });
  const sigBase64URL = sig.toString("base64url");

  return sigBase64URL;
};

/**
 * Verifies a jwt signed with RS256 (RSA with SHA256) if key is in PEM format.
 *
 * @param {*} headerPayload The combined header and payload in base64url format.
 *
 * @param {*} publicKey The public key used to verify.
 * @param {*} signature The signature of the JWT.
 * @returns
 */
const rs256PEMVerify = (headerPayload, publicKey, signature) => {
  const keyObject = crypto.createPublicKey({
    key: publicKey,
    format: "pem",
  });
  const isVerified = crypto.verify(
    null,
    Buffer.from(headerPayload),
    {
      key: keyObject,
    },
    Buffer.from(signature)
  );
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
 *                          Either 'pem' or 'jwk'. Not used if alg is HS256.
 */
export const jwtEncode = (header, payload, key, keyFormat) => {
  let headerBase64URL;
  let payloadBase64URL;
  let jsonHeader = header;
  if (Buffer.isEncoding("base64url")) {
    if (header instanceof Object) {
      // not a string. convert to string
      jsonHeader = header;
      console.log("Using JSON.stringify() to convert to a string");
      const stringifyHeader = JSON.stringify(header);
      // headerBase64URL = base64url.encode(stringifyHeader);
      headerBase64URL = Buffer.from(stringifyHeader, "ascii").toString(
        "base64url"
      );
    } else {
      jsonHeader = JSON.parse(header);

      headerBase64URL = Buffer.from(header, "ascii").toString("base64url");
    }

    if (payload instanceof Object) {
      // not a string. convert to string
      console.log("Using JSON.stringify() to convert to a string");
      const stringifyHeader = JSON.stringify(payload);
      // headerBase64URL = base64url.encode(stringifyHeader);
      payloadBase64URL = Buffer.from(stringifyHeader, "ascii").toString(
        "base64url"
      );
    } else {
      payloadBase64URL = Buffer.from(payload, "ascii").toString("base64url");
    }

    const headerPayload = `${headerBase64URL}.${payloadBase64URL}`;

    const { alg } = jsonHeader;

    let sig;
    switch (alg.toLowerCase()) {
      case "hs256":
        sig = hs256Sign(headerPayload, key);
        break;
      case "rs256":
        if (keyFormat.toLowerCase() === "jwk") {
          sig = rs256JWKSign(headerPayload, key);
        } else if (keyFormat.toLowerCase() === "pem") {
          sig = rs256PEMSign(headerPayload, key);
          console.log();
          console.log(
            "rs256PEMVerify(headerPayload, -----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEAoDEmXwa0fhiB6EA33u8qSIEkR8o26nzrOjLl0xpJ4hfjBMm+izLb\
+WudOINw6BmNcHfapLJm1XJxGOqQrbOej1R513z+1GGZH+Ib94RQeQZRdReL5ZEf\
ZS4H8ONMxAWGfQU/WEaKrp5NgxjHK8wcGwbHBFXZBkc7F0Sumb+IE2kDGJm3E/I5\
SGY5WWF+mKvsbGzen290f4tZ29j8yM3RprwKx5TKG/bAf/GDgQFtk+VWv39BO7S3\
AnR+XhjmEsAsudTAzCeEoW18VOP1EdjLoCzVPUYe6hYuHRT+v2NhZW9srCHp6WtQ\
mh0GTz0d02l1Bbfws6e15lol9t91rlsxr8LxcWIWWzbKgSl8wJ1waR7CYtOWpSo3\
XGuftu0Fi2aLrsV7wkHyksvf69XYOC9FyxhokfFPgvfYd6zveUAl/Fvl6qYgtbbS\
fiNrKp3Rvd32hfBy4o7spKNGrTyQorWH8whQlTavSDxzSRcWcNSkZkkAeMlCJjc2\
mZTRpps06umVHZxibRiGf40WUMZHX/SzF+ba9fFgTFmfIYvGZ0Kv6AEtJkEzreMj\
QvmGvt1b8L9FICp7dxcu/CWZE7xBgtYPcDUM9UwCdLBT8ObrLgv5rL/XNImAF8+l\
UG3k8WPupzOtDQxcAC7J+inb65HDSkK9JsiBGcDuqIAroTwjs457N4UCAwEAAQ==\n-----END RSA PUBLIC KEY-----, sig)"
          );
          console.log(
            rs256PEMVerify(
              headerPayload,
              "-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEAoDEmXwa0fhiB6EA33u8qSIEkR8o26nzrOjLl0xpJ4hfjBMm+izLb\
+WudOINw6BmNcHfapLJm1XJxGOqQrbOej1R513z+1GGZH+Ib94RQeQZRdReL5ZEf\
ZS4H8ONMxAWGfQU/WEaKrp5NgxjHK8wcGwbHBFXZBkc7F0Sumb+IE2kDGJm3E/I5\
SGY5WWF+mKvsbGzen290f4tZ29j8yM3RprwKx5TKG/bAf/GDgQFtk+VWv39BO7S3\
AnR+XhjmEsAsudTAzCeEoW18VOP1EdjLoCzVPUYe6hYuHRT+v2NhZW9srCHp6WtQ\
mh0GTz0d02l1Bbfws6e15lol9t91rlsxr8LxcWIWWzbKgSl8wJ1waR7CYtOWpSo3\
XGuftu0Fi2aLrsV7wkHyksvf69XYOC9FyxhokfFPgvfYd6zveUAl/Fvl6qYgtbbS\
fiNrKp3Rvd32hfBy4o7spKNGrTyQorWH8whQlTavSDxzSRcWcNSkZkkAeMlCJjc2\
mZTRpps06umVHZxibRiGf40WUMZHX/SzF+ba9fFgTFmfIYvGZ0Kv6AEtJkEzreMj\
QvmGvt1b8L9FICp7dxcu/CWZE7xBgtYPcDUM9UwCdLBT8ObrLgv5rL/XNImAF8+l\
UG3k8WPupzOtDQxcAC7J+inb65HDSkK9JsiBGcDuqIAroTwjs457N4UCAwEAAQ==\n-----END RSA PUBLIC KEY-----",
              sig
            )
          );
        }
        break;
      default:
        throw new Error(`Unsupported alg: ${alg}`);
    }
    // console.log();
    // console.log("sig");
    // console.log(sig);
    // console.log("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk");
    // console.log(sig === "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk");
    // console.log();
    // }
    // const rsa256Sig =
    //   "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
    // console.log();
    // console.log("sig");
    // console.log(sig);
    // console.log(rsa256Sig);
    // console.log(sig === rsa256Sig);
    // console.log();

    return headerPayload + "." + sig;
  } else {
    console.log("Error: Base64URL encoding isn't available.");
  }
};

export default jwtDecode;
