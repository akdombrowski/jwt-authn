import "crypto";
import base64url from "base64url";

export function jwtDecode(jwt) {
  try {
    console.log(jwt);
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
    console.log("jsonHeader");
    console.log(jsonHeader);

    // 5.   Verify that the resulting JOSE Header includes only parameters
    //     and values whose syntax and semantics are both understood and
    //     supported or that are specified as being ignored when not
    //     understood.
    const { typ, cty, alg } = base64DecodedHeader;

    if (typ && typ !== "JWT") {
      throw new Error("Need to be type jwt.");
    }
    if (cty && cty !== "JWT") {
      throw new Error("Need a cty of 'JWT'");
    }
    if (!alg) {
      throw new Error("Missing algorithm in JOSE header.");
    }

    // 6.   Determine whether the JWT is a JWS or a JWE using any of the
    //         methods described in Section 9 of [JWE].
    if (components.length === 3) {
      // JWS
    } else if (components.length === 5) {
      // JWE
    } else {
      throw new Error('Not using compact serialization.');
    }
  } catch (e) {
    console.error(e.message, e);
  }
}
export function jwtEncode() {
  console.log("jwtEncode here");
}
