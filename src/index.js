import "crypto";
import base64url from "base64url";

export function jwtDecode(jwt) {
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
    const base64DecodedHeader = base64url.decode(header);
    if (!base64DecodedHeader) {
      console.err("base64DecodedHeader");
      console.err(base64DecodedHeader);
      throw new Error("Header isn't base64url encoded");
    }

    // 4.   Verify that the resulting octet sequence is a UTF-8-encoded
    //         representation of a completely valid JSON object conforming to
    //         RFC 7159 [RFC7159]; let the JOSE Header be this JSON object.
    const jsonHeader = JSON.parse(base64DecodedHeader);

    // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.
    const { typ, cty, alg } = jsonHeader;

    if (typ && typ !== "JWT") {
      throw new Error("Need to be type jwt.");
    }
    if (cty && cty !== "JWT") {
      throw new Error("Need a cty of 'JWT'");
    }
    if (!alg) {
      throw new Error(`Missing algorithm in JOSE header. alg: ${alg}`);
    }

    // 6.   Determine whether the JWT is a JWS or a JWE using any of the
    //         methods described in Section 9 of [JWE].
    if (components.length === 3) {
      // JWS
      // 7a   If the JWT is a JWS, follow the steps specified in [JWS] for
      // validating a JWS.  Let the Message be the result of base64url
      // decoding the JWS Payload.
      const payload = components[1];
      const base64urlDecodedPayload = base64url.decode(payload);
      const jsonPayload = JSON.parse(base64urlDecodedPayload);

      return {
        header: jsonHeader,
        payload: jsonPayload,
        signature: components[2],
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
export function jwtEncode() {
  console.log("jwtEncode here");
}
