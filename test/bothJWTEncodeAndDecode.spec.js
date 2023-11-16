// import {
//   jwtDecode,
//   jwtEncode,
//   hs256Sign,
//   createHeaderPayload,
// } from "../lib/index.js";
import {
  jwtDecode,
  jwtEncode,
  hs256Sign,
  createHeaderPayload,
} from "../src/index.js";
import { expect } from "chai";

describe("#jwtEncode() and #jwtDecode()", function () {
  describe("JWT encoding then decoding", function () {
    context("when alg is HS256", function () {
      context("when deep equal used", function () {
        it("the decoding is equal when encoding then re-decoding", function () {
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            "iss": "joe",
            "exp": 1300819380,
            "http://example.com/is_root": true,
          };
          const passphrase =
            "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

          const expectedJWT =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";
          const encoded = jwtEncode(decodedHeader, decodedPayload, passphrase);

          expect(encoded).to.equal(expectedJWT);

          const headerPayload = createHeaderPayload(
            decodedHeader,
            decodedPayload
          );
          const sig = hs256Sign(headerPayload, passphrase);
          const objOutput = {
            header: decodedHeader,
            payload: decodedPayload,
            signature: sig,
          };
          const decoded = jwtDecode(encoded);
          expect(decoded).to.deep.equal(objOutput);
        });
      });
    });
  });

  describe("JWT decoding then encoding", function () {
    context("when alg is HS256", function () {
      context("when deep equal used", function () {
        it("the encoding is equal when decoding then re-encoding", function () {
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            "iss": "joe",
            "exp": 1300819380,
            "http://example.com/is_root": true,
          };
          const passphrase =
            "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

          const encodedJWT =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";
          const decoded = jwtDecode(encodedJWT);

          const headerPayload = createHeaderPayload(
            decodedHeader,
            decodedPayload
          );
          const sig = hs256Sign(headerPayload, passphrase);
          const objOutput = {
            header: decodedHeader,
            payload: decodedPayload,
            signature: sig,
          };
          expect(decoded).to.deep.equal(objOutput);

          const encoded = jwtEncode(
            objOutput.header,
            objOutput.payload,
            passphrase
          );

          expect(encoded).to.equal(encodedJWT);
        });
      });
    });
  });
});
