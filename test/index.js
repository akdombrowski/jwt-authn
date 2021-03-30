import chai from "chai";
import { jwtDecode, jwtEncode, rs256PEMVerify } from "../src/index.js";

const expect = chai.expect;
chai.config.includeStack = true;
describe("JWT decoding", () => {
  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when using JSON.stringify() on output", function () {
      context("and when alg is HS256", function () {
        it("decodes from encoded jwt", () => {
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
    });
  });

  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when using JSON.stringify() on output", function () {
      context("and when alg is HS256", function () {
        it("decodes from encoded jwt", () => {
          const jwt =
            "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
          const decoded = jwtDecode(jwt);
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
    });
  });
  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when using plain output", function () {
      context("checks deep equal on json object output", function () {
        context("and when alg is hs256.", function () {
          it("decodes from encoded jwt.", () => {
            const jwt =
              "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
            const decoded = jwtDecode(jwt);
            const expectedJWT = {
              header: { typ: "JWT", alg: "HS256" },
              payload: {
                iss: "joe",
                exp: 1300819380,
                "http://example.com/is_root": true,
              },
              signature: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
            };
            expect(decoded).to.deep.equal(expectedJWT);
          });
        });
      });
    });
  });
  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when using plain output", function () {
      context("checks deep equal on json object output", function () {
        context("and when alg is rs256.", function () {
          it("decodes from encoded jwt.", () => {
            const jwt =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
            const decoded = jwtDecode(jwt);
            const expectedJWT = {
              header: { alg: "RS256" },
              payload: {
                iss: "joe",
                exp: 1300819380,
                "http://example.com/is_root": true,
              },
              signature:
                "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
            };
            expect(decoded).to.deep.equal(expectedJWT);
          });
        });
      });
    });
  });

  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when using JSON.stringify on output", function () {
      context("and when alg is rs256.", function () {
        it("decodes from encoded jwt.", () => {
          const jwt =
            "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
          const decoded = jwtDecode(jwt);
          const expectedJWT = {
            header: { alg: "RS256" },
            payload: {
              iss: "joe",
              exp: 1300819380,
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

describe("JWT encoding", () => {
  describe("#jwtEncode()", () => {
    // specification for jwt encoding
    context("when strict string inputs are used", () => {
      context("and when alg is HS256", () => {
        it("encodes a jwt.", () => {
          const decodedHeader = '{"typ":"JWT",\r\n "alg":"HS256"}';
          const decodedPayload =
            '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}';
          const passphrase =
            "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

          const expectedJWT =
            "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
          const encoded = jwtEncode(decodedHeader, decodedPayload, passphrase);

          expect(encoded).to.equal(expectedJWT);
        });
      });
    });
  });

  describe("#jwtEncode()", () => {
    // specification for jwt encoding
    context("when JSON objects are used", () => {
      context("and when alg is HS256", () => {
        it("encodes a jwt.", () => {
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            iss: "joe",
            exp: 1300819380,
            "http://example.com/is_root": true,
          };
          const passphrase =
            "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

          const expectedJWT =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";
          const encoded = jwtEncode(decodedHeader, decodedPayload, passphrase);

          expect(encoded).to.equal(expectedJWT);
        });
      });
    });
    // specification for jwt encoding
    context("when string literals are used", () => {
      context("and when alg is RS256", () => {
        context("and jwk is strting literal", () => {
          it("encodes a jwt.", () => {
            const decodedHeader = '{"alg":"RS256"}';
            const decodedPayload =
              '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}';
            const jwk =
              '{"kty":"RSA",\r\n "n":"ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",\r\n "e":"AQAB",\r\n "d":"Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",\r\n "p":"4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",\r\n "q":"uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",\r\n "dp":"BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",\r\n "dq":"h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",\r\n "qi":"IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U"}';

            const expectedJWT =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              jwk,
              "jwk"
            );

            expect(encoded).to.equal(expectedJWT);
          });
        });
      });
    });

    context("when JSON objects are used", () => {
      context("and when alg is RS256", () => {
        context("and key is pem string", () => {
          it("encodes a jwt. and verifies with public key", () => {
            const decodedHeader = '{"alg":"RS256"}';
            const decodedPayload = {
              iss: "joe",
              exp: 1300819380,
              "http://example.com/is_root": true,
            };
            const privateKey =
              "-----BEGIN RSA PRIVATE KEY-----\n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\n-----END RSA PRIVATE KEY-----";

            const expectedJWT =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";
            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              privateKey,
              "pem"
            );

            // Check if the encoded JWT is equal to what we expect
            expect(encoded).to.equal(expectedJWT);
            // Check that we can verify our JWT using the public key that's paired with the private key we used to sign the JWT.
            expect(rs256PEMVerify(encoded, "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoDEmXwa0fhiB6EA33u8q\
SIEkR8o26nzrOjLl0xpJ4hfjBMm+izLb+WudOINw6BmNcHfapLJm1XJxGOqQrbOe\
j1R513z+1GGZH+Ib94RQeQZRdReL5ZEfZS4H8ONMxAWGfQU/WEaKrp5NgxjHK8wc\
GwbHBFXZBkc7F0Sumb+IE2kDGJm3E/I5SGY5WWF+mKvsbGzen290f4tZ29j8yM3R\
prwKx5TKG/bAf/GDgQFtk+VWv39BO7S3AnR+XhjmEsAsudTAzCeEoW18VOP1EdjL\
oCzVPUYe6hYuHRT+v2NhZW9srCHp6WtQmh0GTz0d02l1Bbfws6e15lol9t91rlsx\
r8LxcWIWWzbKgSl8wJ1waR7CYtOWpSo3XGuftu0Fi2aLrsV7wkHyksvf69XYOC9F\
yxhokfFPgvfYd6zveUAl/Fvl6qYgtbbSfiNrKp3Rvd32hfBy4o7spKNGrTyQorWH\
8whQlTavSDxzSRcWcNSkZkkAeMlCJjc2mZTRpps06umVHZxibRiGf40WUMZHX/Sz\
F+ba9fFgTFmfIYvGZ0Kv6AEtJkEzreMjQvmGvt1b8L9FICp7dxcu/CWZE7xBgtYP\
cDUM9UwCdLBT8ObrLgv5rL/XNImAF8+lUG3k8WPupzOtDQxcAC7J+inb65HDSkK9\
JsiBGcDuqIAroTwjs457N4UCAwEAAQ==\n-----END PUBLIC KEY-----")).to.be.true;
          });
        });
      });
    });
  });
});
