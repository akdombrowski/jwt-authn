import {
  hs256Sign,
  rs256PEMSign,
  rs256JWKSign,
  createHeaderPayload,
} from "../src/index.js";
// import {
//   hs256Sign,
//   rs256PEMSign,
//   rs256JWKSign,
//   createHeaderPayload,
// } from "../lib/index.js";
import { expect } from "chai";

describe("Signing and Verification", function () {
  describe("JWT signing", function () {
    context("when alg is hs256", function () {
      describe("#hs256Sign()", function () {
        it("correctly generates a signature", function () {
          const expectedSig = "lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";
          const decodedHeader = { typ: "JWT", alg: "HS256" };
          const decodedPayload = {
            "iss": "joe",
            "exp": 1300819380,
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

    describe("RS256 Signing", function () {
      context("when alg is rs256", function () {
        describe("#rs256PEMSign()", function () {
          context("when key is in PEM format", function () {
            it("correctly generates a signature", function () {
              const decodedHeader = { alg: "RS256" };
              const decodedPayload = {
                "iss": "joe",
                "exp": 1300819380,
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

        describe("#rs256JWKSign()", function () {
          context("when key is in JWK format", function () {
            it("correctly generates a signature", function () {
              const decodedHeader = { alg: "RS256" };
              const decodedPayload = {
                "iss": "joe",
                "exp": 1300819380,
                "http://example.com/is_root": true,
              };
              const privateKey = {
                kty: "RSA",
                n: "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
                e: "AQAB",
                d: "Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",
                p: "4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",
                q: "uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",
                dp: "BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",
                dq: "h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",
                qi: "IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U",
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
