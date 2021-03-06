import chai from "chai";
import {
  jwtDecode,
  jwtEncode,
  rs256PEMVerify,
  rs256JWKVerify,
  hs256Verify,
  hs256Sign,
  rs256PEMSign,
  rs256JWKSign,
  createHeaderPayload,
  base64URLEncode,
} from "../src/index.js";
import crypto from "crypto";
import cli, { HELP_TEXT } from "../cli/index.js";
import sinon from "sinon";
import { spawn } from "child_process";

const expect = chai.expect;
chai.config.includeStack = true;

describe("JWT decoding", () => {
  describe("#jwtDecode()", () => {
    // specification for decoding
    context("when when alg is HS256", () => {
      context("when using JSON.stringify() on output", () => {
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

      // specification for decoding
      context("when using JSON.stringify() on output", () => {
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

      // specification for decoding
      context("when using plain output", () => {
        context("checks deep equal on json object output", () => {
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

    context("when alg is rs256.", () => {
      // specification for decoding
      context("when using plain output", () => {
        context("when using deep equal on json object output", () => {
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

      // specification for decoding
      context("when using JSON.stringify on output", function () {
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
    context("when alg is HS256", () => {
      // specification for jwt encoding
      context("when string literals are used", () => {
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

      // specification for jwt encoding
      context("when JSON objects are used", () => {
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

          expect(hs256Verify(encoded, passphrase)).to.equal(true);
        });
      });
    });
    // specification for jwt encoding
    context("when alg is RS256", () => {
      context("when string literals are used", () => {
        context("and jwk is string literal", () => {
          it("encodes a jwt.", () => {
            const decodedHeader = '{"alg":"RS256"}';
            const decodedPayload =
              '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}';
            const jwk =
              '{"kty":"RSA",\r\n "n":"ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",\r\n "e":"AQAB",\r\n "d":"Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",\r\n "p":"4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",\r\n "q":"uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",\r\n "dp":"BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",\r\n "dq":"h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",\r\n "qi":"IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U"}';
            const options = { keyFormat: "jwk" };

            const expectedJWT =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw";
            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              jwk,
              options
            );

            expect(encoded).to.equal(expectedJWT);
          });
        });
      });

      context("when JSON objects are used", () => {
        context("and key is pem string", () => {
          it("encodes a jwt. and verifies with public key", () => {
            const decodedHeader = { alg: "RS256" };
            const decodedPayload = {
              iss: "joe",
              exp: 1300819380,
              "http://example.com/is_root": true,
            };
            const privateKey =
              "-----BEGIN RSA PRIVATE KEY-----\n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\n-----END RSA PRIVATE KEY-----";
            const options = { keyFormat: "pem" };

            const expectedJWT =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";
            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              privateKey,
              options
            );

            // Check if the encoded JWT is equal to what we expect
            expect(encoded).to.equal(expectedJWT);
            // Check that we can verify our JWT using the public key that's paired with the private key we used to sign the JWT.
            expect(
              rs256PEMVerify(
                encoded,
                "-----BEGIN PUBLIC KEY-----\n\
                MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoDEmXwa0fhiB6EA33u8q\
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
                JsiBGcDuqIAroTwjs457N4UCAwEAAQ==\
                \n-----END PUBLIC KEY-----"
              )
            ).to.be.true;
          });
        });
      });

      context("when JSON objects are used", () => {
        context("and jwk is object", () => {
          it("encodes a jwt. and verifies with public key", () => {
            const decodedHeader = { alg: "RS256" };
            const decodedPayload = {
              iss: "joe",
              exp: 1300819380,
              "http://example.com/is_root": true,
            };
            const privateKey = {
              kty: "RSA",
              n:
                "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
              e: "AQAB",
              d:
                "Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",
              p:
                "4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",
              q:
                "uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",
              dp:
                "BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",
              dq:
                "h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",
              qi:
                "IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U",
            };
            const options = { keyFormat: "jwk" };

            const expectedJWT =
              "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.el3lmx2zFYSGmoOC5sJFjV4nCFyb6_2nY5WDSv_d9L2cw857vQBhjV2xybTQz5_4IIVLxpollxyomEQpC1xwZSZoU9lrmNau2TGg1iFGjyIXrtZy-UxV0t_xSwujFlA_WNFjw6eLI00ji3EcuOiMpqPa8IOTfXijtgkCx7oVweb2IVO6ZjMcssvhA7s3ezF8YHf6ewHK74UF4o0RuKn4K1PjBbmxDu3TXMOp69IvbnCj2ku--9QI7H9DFjiNVyWWnpz3wekGZuUePAj5GkrbPgvwhVVUiTcczYy55MUaF7mPjkb7JGEk2sH4lCa1Jlvz9xgYMdYTfbwmT9Wgvq_Usg";
            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              privateKey,
              options
            );

            // Check if the encoded JWT is equal to what we expect
            expect(encoded).to.equal(expectedJWT);
            // Check that we can verify our JWT using the public key that's paired with the private key we used to sign the JWT.
            expect(
              rs256JWKVerify(encoded, {
                kty: "RSA",
                n:
                  "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
                e: "AQAB",
              })
            ).to.be.true;
          });
        });
      });

      context("when JSON objects are used", () => {
        context("and public and private keys are generated", () => {
          it("encodes a jwt. and verifies with public key", (done) => {
            const decodedHeader = '{"alg":"RS256"}';
            const decodedPayload = {
              iss: "joe",
              exp: 1300819380,
              "http://example.com/is_root": true,
            };
            const { publicKey, privateKey } = crypto.generateKeyPairSync(
              "rsa",
              {
                modulusLength: 4096,
                publicKeyEncoding: {
                  type: "spki",
                  format: "pem",
                },
                privateKeyEncoding: {
                  type: "pkcs8",
                  format: "pem",
                  cipher: "aes-256-cbc",
                  passphrase: "top secret",
                },
              }
            );
            const options = { keyFormat: "pem", passphrase: "top secret" };

            const encoded = jwtEncode(
              decodedHeader,
              decodedPayload,
              privateKey,
              options
            );

            // Check if the encoded JWT is equal to what we expect
            // expect(encoded).to.equal(expectedJWT);
            // Check that we can verify our JWT using the public key that's paired with the private key we used to sign the JWT.
            expect(rs256PEMVerify(encoded, publicKey)).to.be.true;
            done();
          }).timeout(10000);
        });
      });
    });
  });
});

describe("#jwtEncode() and #jwtDecode()", () => {
  describe("JWT encoding then decoding", () => {
    context("when alg is HS256", () => {
      context("when deep equal used", () => {
        it("the decoding is equal when encoding then re-decoding", () => {
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

  describe("JWT decoding then encoding", () => {
    context("when alg is HS256", () => {
      context("when deep equal used", () => {
        it("the encoding is equal when decoding then re-encoding", () => {
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            iss: "joe",
            exp: 1300819380,
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

describe("Signing and Verification", () => {
  describe("JWT signing", () => {
    context("when alg is hs256", () => {
      describe("#hs256Sign()", () => {
        it("correctly generates a signature", () => {
          const expectedSig = "lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            iss: "joe",
            exp: 1300819380,
            "http://example.com/is_root": true,
          };
          const passphrase =
            "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

          const headerPayload = createHeaderPayload(
            decodedHeader,
            decodedPayload
          );

          const sig = hs256Sign(headerPayload, passphrase);
          expect(sig).to.equal(expectedSig);
        });
      });
    });

    describe("RS256 Signing", () => {
      context("when alg is rs256", () => {
        describe("#rs256PEMSign()", () => {
          context("when key is in PEM format", () => {
            it("correctly generates a signature", () => {
              const decodedHeader = { alg: "RS256" };
              const decodedPayload = {
                iss: "joe",
                exp: 1300819380,
                "http://example.com/is_root": true,
              };
              const privateKey =
                "-----BEGIN RSA PRIVATE KEY-----\n\
                MIIJKAIBAAKCAgEAoDEmXwa0fhiB6EA33u8qSIEkR8o26nzrOjLl0xpJ4hfjBMm+\
                izLb+WudOINw6BmNcHfapLJm1XJxGOqQrbOej1R513z+1GGZH+Ib94RQeQZRdReL\
                5ZEfZS4H8ONMxAWGfQU/WEaKrp5NgxjHK8wcGwbHBFXZBkc7F0Sumb+IE2kDGJm3\
                E/I5SGY5WWF+mKvsbGzen290f4tZ29j8yM3RprwKx5TKG/bAf/GDgQFtk+VWv39B\
                O7S3AnR+XhjmEsAsudTAzCeEoW18VOP1EdjLoCzVPUYe6hYuHRT+v2NhZW9srCHp\
                6WtQmh0GTz0d02l1Bbfws6e15lol9t91rlsxr8LxcWIWWzbKgSl8wJ1waR7CYtOW\
                pSo3XGuftu0Fi2aLrsV7wkHyksvf69XYOC9FyxhokfFPgvfYd6zveUAl/Fvl6qYg\
                tbbSfiNrKp3Rvd32hfBy4o7spKNGrTyQorWH8whQlTavSDxzSRcWcNSkZkkAeMlC\
                Jjc2mZTRpps06umVHZxibRiGf40WUMZHX/SzF+ba9fFgTFmfIYvGZ0Kv6AEtJkEz\
                reMjQvmGvt1b8L9FICp7dxcu/CWZE7xBgtYPcDUM9UwCdLBT8ObrLgv5rL/XNImA\
                F8+lUG3k8WPupzOtDQxcAC7J+inb65HDSkK9JsiBGcDuqIAroTwjs457N4UCAwEA\
                AQKCAgB+D++4XFhx2utwUAknwWKvCCH69OFeisu6Uw+Vn1yBNncK75Cpjm6Zy9w/\
                +wBBRsqNtWQ0s8hFNPhXuU/9whqHhN0VfWI01FFiS9fiYxfJBfXYhZ0sHZZtU1og\
                cV+Z6xc5D4YX+/trC1zITBmBF/EOO7kmakCNtkSEPSKCD74QOFWdaGowoi/+D6QV\
                +Kldj/5QHSTcpyMwtAMVBZ94jq/r3JNHGIosk3RNu0vXm74V4ybvMD+vsrlKj05a\
                0pFMNDt+SjUm8/pl5vku/O2BC/DCrkVpION3J9lGPZ10E8szvgnxNAcWD8OwZCLw\
                /JGaK6VRyLz9RH/bNRonOxcrDMz92y86sTsbjvzU/5e8XdaWZPqmsS0U2i4oxLxU\
                N3GhDvMLkqSNU1DBd+sm0F5hkyjuUEwH79YYOa2T7DyhApMDcKpc6Y4CJP6Oeqev\
                nMGBEuqLRQhf3Iy+Q6YXqYX/ocHnQuxQvkYW5NQVPu+pzSUCmLsKrYWmgVTMEoeZ\
                yt0mFFl4sxw533L3vtjrtoHn+x+ZyoXRBVy5TufIXr7uNBkIFekUSIny+Mg08F1V\
                tgD91B92JihJR6rss51OgMec84P0vDRvFtliQTfQDxDu2S8eJ82wxdz7Y8en0wcT\
                P/zZIU7xEOdt+s67M6OQRIlKexNTC//XYxjqDCKX9ugOnxh4SQKCAQEA0UARkjGv\
                A1mhYFESugOTl6WzksOqQa98kaENFR63ZL2thue7CqPK48y68LYuFIou/vFAzi8G\
                Z2EyQajJSbf6HF4r5HxTLqs4EePzJfM9Nq4bR76VC382o3YJsyYe3WFu6K0JzBKa\
                Bo1Uf5hcV9lkE5xpZxTb90hZVZoAcmDxarYOUMPDBGkU8TIHJCidCQe3Yi2KUlCq\
                kshONigPTtT2V98N9TC3swoE01qb0S4LvCjQUjkuGayCNjjcQ3FGLs6Ni7sMBCeW\
                D2On8izC6kPpPQWyb6QClOgQ95c3a8aQ7hcuSi2NHTpkcl2moWx/2e1/ziA0rdSo\
                pOGcSl1soLgMdwKCAQEAw/s5tUdWhrsFyT8T58I6qURvlEaTWTZstUmU2Q3Uq1iC\
                sMDroNOYxwX2xaMWTDLw0w8EhH7Y1Nt4oscnGKtj7R+J1+UdEv7muAqBnUpLxxAJ\
                nCrr/bsl3T7oIzlob46KiFslJoj/mfZiksMzkQBXISkS7MDFyE7Wob1FeTI9xPYq\
                bJ/C7b2zHDse28z8frAHShjoUxPO3oLDYNwjLtGAhehllZK0QX7huK5Ltr1oN9lR\
                5EdpFgeP85hQ+abXNW4sX0ZmHMb6uvpig9LemP+ya9ZHzJNRdKkyQ94XLFhKEA5b\
                r82fUvq99gC3hXZBd8hifd+fR53PlX7pljaWyiWm4wKCAQBTzLq8t5UFXHHaZt1/\
                DUugYcXmsuGOaL8Ue1EH8kMz3xqNemRXwHzSef0rxWny49wqUWfIquB/qlc8IGJs\
                WXeawMQHPxr5B6zuzUFlI2KScWuPce2yqwGwuObtjgiyVADcwd+4kIKKuTLr3pKs\
                w+zmRa+YjqwA/kJ4m7IuHFDSkZJuGdgR/hta9NQTUQiCw0pX0TEiAhgtrHZWDfkD\
                cxos2rF2TkpjM1H3asQYI76jXhz/sNKbiZCkMmVTxRt8R1A8c24+g7P++cQaon50\
                3zmbLJrnRuGZzM5uuWqCiQUltLbfEhr/Z5Euk/7ViuQw3IJghFlUfGQFlCzJQ1zr\
                iInFAoIBADTYoY8IVYSvGbhSkgOElFzgX1YUUddUnauk08ZTvG0XyOXwn5kWdbP1\
                H73bZD/X3KiM/CLeMYn0RGtgWGKGlMN0Ja9Z0KU2pvAppRnM1vIumOjLiic5N9SZ\
                Ce+1ozuxrBlounPRrVrO3XXFvTn0ZYpDkR7WPH7vA2FJsFol+hIKbxYrXlzNMmcC\
                aifK9qsSvGR2ou8EAFxv1k9gDPyq8YUqTXovvPuMQ0GRfkkgeeHVcAemWefe0ipV\
                gEBRhOabdsuaKB7KaQHSUo5JZkzLZkk91s6LSwOyPCOg147Vn+MEfCTDxZqSknar\
                atFKOg0as7RNgJ3HKBqfxk0DG1YXIRECggEBAMDvDLw5LIblQZq/qJafp4pKeRJI\
                0pIMRcOcqtg8XH2JkiUbBQP/dP5uikzeiLQXCFa+lTAUCNp0c1m0H/KJEsF78Fto\
                yadYGaPQCJEWX3VEjlYECOls+Rajp6SIYD9V9neLLf42MrPDXUtBJkYofZvzcm9T\
                9gKWwNBonHPuEnjvpqFg9VWTNCYeJ/3ZJdvQz7EM5mGvPOnMSXkHQ6WE/oDbfbIN\
                Ky9Bzc5cP6gkQ0zsgzCMOfjVLnHB12c0OrcaAQ1K5qOujZn3LIEc4QiRjNoqOCDv\
                g8W+z36ROKfkVVbmEVHY1Kg9yMo7oKYZEIa5AcAZyxxDoedT0jnlBRaWLtM=\
                \n-----END RSA PRIVATE KEY-----";

              const headerPayload = createHeaderPayload(
                decodedHeader,
                decodedPayload
              );
              const options = { keyFormat: "pem" };

              const sig = rs256PEMSign(headerPayload, privateKey);

              const expectedSig =
                "UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";

              expect(sig).to.equal(expectedSig);
            });
          });
        });

        describe("#rs256JWKSign()", () => {
          context("when key is in JWK format", () => {
            it("correctly generates a signature", () => {
              const decodedHeader = { alg: "RS256" };
              const decodedPayload = {
                iss: "joe",
                exp: 1300819380,
                "http://example.com/is_root": true,
              };
              const privateKey = {
                kty: "RSA",
                n:
                  "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
                e: "AQAB",
                d:
                  "Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",
                p:
                  "4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",
                q:
                  "uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",
                dp:
                  "BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",
                dq:
                  "h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",
                qi:
                  "IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U",
              };

              const expectedSig =
                "el3lmx2zFYSGmoOC5sJFjV4nCFyb6_2nY5WDSv_d9L2cw857vQBhjV2xybTQz5_4IIVLxpollxyomEQpC1xwZSZoU9lrmNau2TGg1iFGjyIXrtZy-UxV0t_xSwujFlA_WNFjw6eLI00ji3EcuOiMpqPa8IOTfXijtgkCx7oVweb2IVO6ZjMcssvhA7s3ezF8YHf6ewHK74UF4o0RuKn4K1PjBbmxDu3TXMOp69IvbnCj2ku--9QI7H9DFjiNVyWWnpz3wekGZuUePAj5GkrbPgvwhVVUiTcczYy55MUaF7mPjkb7JGEk2sH4lCa1Jlvz9xgYMdYTfbwmT9Wgvq_Usg";

              const headerPayload = createHeaderPayload(
                decodedHeader,
                decodedPayload
              );

              const sig = rs256JWKSign(headerPayload, privateKey);

              expect(sig).to.equal(expectedSig);
            });
          });
        });
      });
    });
  });
});

describe("#base64URLEncode()", () => {
  context("when string literal is used", () => {
    it("correctly base64url encodes the input", () => {
      const rndBytes = crypto.randomBytes(128);
      const rndBytesHexString = rndBytes.toString("hex");
      const base64URLEncoded = base64URLEncode(rndBytesHexString);
      const base64URLEncodedFromBuffer = base64URLEncode(rndBytes);
      const bufferTransformed = Buffer.from(
        rndBytesHexString,
        "ascii"
      ).toString("base64url");
      const bufferTransformedFromBuffer = Buffer.from(
        rndBytes,
        "ascii"
      ).toString("base64url");
      expect(
        base64URLEncoded,
        "base64URLEncode returns the same thing as transforming with Buffer"
      ).to.be.equal(bufferTransformed);
      expect(
        base64URLEncodedFromBuffer,
        "encodes from Buffer object"
      ).to.be.equal(bufferTransformedFromBuffer);
    });
  });

  context("when Buffer is used", () => {
    it("correctly base64url encodes the input", () => {
      const rndBytes = crypto.randomBytes(128);
      const rndBytesHexString = rndBytes.toString("hex");
      const base64URLEncoded = base64URLEncode(rndBytesHexString);
      const base64URLEncodedFromBuffer = base64URLEncode(rndBytes);
      const bufferTransformed = Buffer.from(
        rndBytesHexString,
        "ascii"
      ).toString("base64url");
      const bufferTransformedFromBuffer = Buffer.from(
        rndBytes,
        "ascii"
      ).toString("base64url");
      expect(
        base64URLEncoded,
        "base64URLEncode returns the same thing as transforming with Buffer"
      ).to.be.equal(bufferTransformed);
      expect(
        base64URLEncodedFromBuffer,
        "encodes from Buffer object"
      ).to.be.equal(bufferTransformedFromBuffer);
    });
  });
});

describe("#cli()", () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    sandbox.restore();
  });

  describe("using help", () => {
    context("when argument is -h", () => {
      it("shows the help screen", () => {
        const log = sandbox.spy(console, "log");
        // Mock process.argv
        const processArgv = [0, 0, "-h"];
        cli(null, [0, 0, "-h"]);
        expect(log.calledOnceWith(HELP_TEXT)).to.be.true;
      });
    });

    context("when argument is --help", () => {
      it("shows the help screen", () => {
        const log = sandbox.spy(console, "log");
        // Mock process.argv
        const processArgv = [0, 0, "-h"];
        cli(null, [0, 0, "-h"]);
        expect(log.calledOnceWith(HELP_TEXT)).to.be.true;
      });
    });
  });

  describe("mock using clipboard", () => {
    context("when 'clipboard' contains a jwt", () => {
      it("decodes the jwt", async () => {
        const log = sandbox.spy(console, "log");
        const myCli = cli;
        const spy = sandbox.spy(myCli);

        const clipboard =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const expectedOutput = {
          header: { alg: "HS256", typ: "JWT" },
          payload: { sub: "1234567890", name: "John Doe", iat: 1516239022 },
          signature: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        };
        const cliOutput = await spy(clipboard, null);

        expect(
          spy.calledOnceWith(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          )
        ).to.be.true;
        expect(log.calledWith("Decoding: ")).to.be.true;
        expect(
          log.calledWith(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          )
        ).to.be.true;
        expect(
          log.getCall(2).firstArg,
          "decoded jwt was logged to the console"
        ).to.be.deep.equal(expectedOutput);
        expect(expectedOutput).to.be.deep.equal(cliOutput);
      });
    });

    context("when 'clipboard' doesn't contain a jwt", () => {
      context("when it's not in proper JSON format", () => {
        it("throws a SyntaxError", async () => {
          const err = sandbox.spy(console, "error");
          const spy = sandbox.spy(cli);

          const clipboard = "abc.abc.abc";
          let syntaxErr;

          try {
            await spy(clipboard, null);
          } catch (e) {
            try {
              syntaxErr = await spy.returnValues[0];
            } catch (ex) {
              expect(ex instanceof SyntaxError).to.be.true;
            }
          }

          expect(err.calledWith("I found an error :(")).to.be.true;
          expect(spy.called).to.be.true;
        });
      });

      context("when it doesn't contain a '.'", () => {
        it("throws an error", async () => {
          const err = sandbox.spy(console, "error");
          const spy = sandbox.spy(cli);

          const clipboard = "abc";
          let dotErr;

          try {
            await spy(clipboard, null);
          } catch (e) {
            try {
              dotErr = await spy.returnValues[0];
            } catch (ex) {
              expect(ex instanceof Error).to.be.true;
              expect(ex.message).to.equal("Need at least one '.'");
            }
          }

          expect(err.calledWith("I found an error :(")).to.be.true;
          expect(spy.called).to.be.true;
        });
      });
    });
  });

  describe("#base64urlEncode()", () => {
    context("when first given argument is -b", () => {
      it("properly base64url encodes the input", async () => {
        const log = sandbox.spy(console, "log");
        const spy = sandbox.spy(cli);

        const b64u =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        const rndBytes = crypto.randomBytes(128);
        const rndBytesHexString = rndBytes.toString("hex");

        // Mock process.argv
        const processArgv = [0, 0, "-b", rndBytesHexString];

        // call the command line function. it's an async function so wait for
        // result.
        const cliOut = await spy(null, processArgv);

        const base64urlified = base64URLEncode(rndBytesHexString);
        const bufferTransform = Buffer.from(
          rndBytesHexString,
          "ascii"
        ).toString("base64url");

        // Only called cli function once
        expect(spy.calledOnce, "cli function should be called once").to.be.true;
        expect(
          spy.calledOnceWith(null, processArgv),
          "cli should be called with -b and a string: " + processArgv
        ).to.be.true;

        // Expect return value of cli function to be equal to using Buffer's transformation
        expect(
          cliOut,
          "cli output is equal to Buffer's conversion to a base64url string"
        ).to.be.equal(bufferTransform);

        // Expect return value of cli function to be equal to directly calling base64URLEncode
        expect(
          cliOut,
          "cli output is equal to using the base64URLEncode function"
        ).to.be.equal(base64urlified);

        // Cli outputs to console
        expect(
          log.calledOnceWith(cliOut),
          "the encoded string was output to the console"
        ).to.be.true;

        // Make sure it's not just base64 encoded
        expect(cliOut.includes("+"), "no + symbols").to.be.false;
        expect(cliOut.includes("/"), "no / symbols").to.be.false;

        // Make sure all characters are part of the base64url char set
        for (let i = 0; i < cliOut.length; i++) {
          expect(b64u.includes(cliOut.charAt(i))).to.be.true;
        }
      });
    });

    context("when first given argument is --base64url", () => {
      it("properly base64url encodes the input", async () => {
        const log = sandbox.spy(console, "log");
        const spy = sandbox.spy(cli);

        const b64u =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        const rndBytes = crypto.randomBytes(128);
        const rndBytesHexString = rndBytes.toString("hex");

        // Mock process.argv
        const processArgv = [0, 0, "-b", rndBytesHexString];

        // call the command line function. it's an async function so wait for
        // result.
        const cliOut = await spy(null, processArgv);

        const base64urlified = base64URLEncode(rndBytesHexString);
        const bufferTransform = Buffer.from(
          rndBytesHexString,
          "ascii"
        ).toString("base64url");

        expect(spy.calledOnce, "cli function should be called once").to.be.true;
        expect(
          spy.calledWith(null, processArgv),
          "cli should be called with -b and a string: " + processArgv
        ).to.be.true;
        expect(
          cliOut,
          "cli output is equal to Buffer's conversion to a base64url string"
        ).to.be.equal(bufferTransform);
        expect(
          cliOut,
          "cli output is equal to using the base64URLEncode function"
        ).to.be.equal(base64urlified);
        expect(
          log.calledWith(cliOut),
          "the encoded string was output to the console"
        ).to.be.true;
        expect(cliOut.includes("+"), "no + symbols").to.be.false;
        expect(cliOut.includes("/"), "no / symbols").to.be.false;

        // Make sure all characters are part of the base64url char set
        for (let i = 0; i < cliOut.length; i++) {
          expect(b64u.includes(cliOut.charAt(i))).to.be.true;
        }
      });
    });
  });
});
