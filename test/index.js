const { expect } = require("chai");
const jwtAuthn = require("../src");

describe("JWT decoding and encoding", () => {
  describe("Decoding", () => {
    // specification for decoding
    it("decodes from encoded jwt", () => {
      const jwt =
        "eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjAzMzc2MDExfQ.ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q";
      const decoded = jwtAuthn.jwtDecode(jwt);
      const expectedJWT = {
        header: { alg: "HS256", cty: "JWT" },
        payload: { sub: "1234567890", iat: 1603376011 },
        signature: "ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q",
      };
      expect(JSON.stringify(decoded)).to.equal(JSON.stringify(expectedJWT));
    });
  });

  describe("Decoding", () => {
    // specification for decoding
    it("decodes from encoded jwt", () => {
      const jwt =
        "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
      const decoded = jwtAuthn.jwtDecode(jwt);
      const expectedJWT = {
        header: { typ: "JWT", alg: "HS256" },
        payload: {
          iss: "joe",
          exp: 1300819380,
          "http://example.com/is_root": true,
        },
        signature: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
      };
      expect(JSON.stringify(decoded)).to.equal(JSON.stringify(expectedJWT));
    });
  });

  describe("Encoding", () => {
    // specification for jwt encoding
    it("Encodes a jwt.", () => {
      const decodedHeader = '{"typ":"JWT",\r\n "alg":"HS256"}';
      const decodedPayload =
        '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}';
      const sig =
        "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

      const expectedJWT =
        "eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjAzMzc2MDExfQ.ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q";
      const encoded = jwtAuthn.jwtEncode(decodedHeader, decodedPayload, sig);

      expect(encoded.to.equal(expectedJWT));
    });
  });
});
