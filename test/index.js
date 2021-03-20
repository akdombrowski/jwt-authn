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

  describe("Encoding", () => {
    // specification for jwt encoding
    it("Encodes a jwt.", () => {
      const decodedJWT = {
        header: { alg: "HS256", cty: "JWT" },
        payload: { sub: "1234567890", iat: 1603376011 },
        signature: "ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q",
      };
      const expectedJWT =
        "eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjAzMzc2MDExfQ.ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q";
      const encoded = jwtAuthn.jwtDecode(decodedJWT);

      expect(encoded.to.equal(expectedJWT));
    });
  });
});
