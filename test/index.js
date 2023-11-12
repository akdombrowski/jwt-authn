import chai from "chai";
import { jwtDecode } from "../src/index.js";

const expect = chai.expect;
// chai.config.includeStack = true;

describe("JWT decoding", function () {
  describe("#jwtDecode()", function () {
    // specification for decoding
    context("when when alg is HS256", function () {
      context("when using JSON.stringify() on output", function () {
        it("decodes from encoded jwt", function () {
          const jwt =
            "eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjAzMzc2MDExfQ.ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q";
          const decoded = jwtDecode(jwt);
          const expectedJWT = {
            header: { alg: "HS256", cty: "JWT" },
            payload: { sub: "1234567890", iat: 1603376011 },
            signature: "ixWwz6G_3K0y57BHRYpEh6yxMjxdekYgRQ2sOPCBF-Q",
          };
          expect(JSON.stringify(decoded)).to.equal(JSON.stringify(expectedJWT));
        });
      });

      // specification for decoding
      context("when using JSON.stringify() on output", function () {
        it("decodes from encoded jwt", function () {
          const jwt =
            "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
          const decoded = jwtDecode(jwt);
          const expectedJWT = {
            header: { typ: "JWT", alg: "HS256" },
            payload: {
              "iss": "joe",
              "exp": 1300819380,
              "http://example.com/is_root": true,
            },
            signature: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
          };
          expect(JSON.stringify(decoded)).to.equal(JSON.stringify(expectedJWT));
        });
      });

      // specification for decoding
      context("when using plain output", function () {
        context("checks deep equal on json object output", function () {
          it("decodes from encoded jwt.", function () {
            const jwt =
              "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
            const decoded = jwtDecode(jwt);
            const expectedJWT = {
              header: { typ: "JWT", alg: "HS256" },
              payload: {
                "iss": "joe",
                "exp": 1300819380,
                "http://example.com/is_root": true,
              },
              signature: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
            };
            expect(decoded).to.deep.equal(expectedJWT);
          });
        });
      });
    });

    context("when alg is rs256.", function () {
      // specification for decoding
      context("when using plain output", function () {
        context("when using deep equal on json object output", function () {
          it("decodes from encoded jwt.", function () {
            const jwt =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
            const decoded = jwtDecode(jwt);
            const expectedJWT = {
              header: { alg: "RS256" },
              payload: {
                "iss": "joe",
                "exp": 1300819380,
                "http://example.com/is_root": true,
              },
              signature:
                "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
            };
            expect(decoded).to.deep.equal(expectedJWT);
          });
        });
      });

      // specification for decoding
      context("when using JSON.stringify on output", function () {
        it("decodes from encoded jwt.", function () {
          const jwt =
            "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
          const decoded = jwtDecode(jwt);
          const expectedJWT = {
            header: { alg: "RS256" },
            payload: {
              "iss": "joe",
              "exp": 1300819380,
              "http://example.com/is_root": true,
            },
            signature:
              "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
          };
          expect(JSON.stringify(decoded)).to.equal(JSON.stringify(expectedJWT));
        });
      });
    });
  });
});
