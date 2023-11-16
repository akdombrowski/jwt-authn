![npm](https://img.shields.io/npm/v/jwt-authn?style=for-the-badge&logo=npm)
![npm bundle size](https://img.shields.io/bundlephobia/min/jwt-authn?style=for-the-badge&logo=npm)
![codesize](https://img.shields.io/github/languages/code-size/akdombrowski/jwt-authn?&style=for-the-badge&logo=github)
![npm](https://img.shields.io/npm/dw/jwt-authn?&style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/jwt-authn?&style=for-the-badge&logo=npm)
![GitHub Sponsors](https://img.shields.io/github/sponsors/akdombrowski?style=for-the-badge&logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/akdombrowski/jwt-authn?style=for-the-badge&logo=github)
![GitHub forks](https://img.shields.io/github/forks/akdombrowski/jwt-authn?style=for-the-badge&logo=github)
![GitHub watchers](https://img.shields.io/github/watchers/akdombrowski/jwt-authn?style=for-the-badge&logo=github)
[![](https://data.jsdelivr.com/v1/package/npm/jwt-authn/badge)](https://www.jsdelivr.com/package/npm/jwt-authn)

[link to npm](https://www.npmjs.com/package/jwt-authn)

# jwt-authn

jwt-authn is an npm package for dealing with JSON Web Tokens (JWT). Encoding,
decoding, verifying, signing, and more coming. It includes support for the RS256
and HS256 algorithms and JWK and PEM format keys (even encrypted keys). Only
Node >=18.18.2 as a requirement and 1 dependency
([clipboardy](https://github.com/sindresorhus/clipboardy#readme) to read from a
user's clipboard when using cli mode)!

Now with command line support!

\*[Must be on Node >= 18.18.2](https://nodejs.org/en/about/releases/)

## Index

- [jwt-authn](#jwt-authn)
  - [Index](#index)
  - [⬆Usage](#usage)
    - [⬆Installation:](#installation)
    - [⬆Accepted Form of JWTs](#accepted-form-of-jwts)
    - [⬆CLI support (command line)](#cli-support-command-line)
      - [⬆CLI JWT Decoding](#cli-jwt-decoding)
      - [⬆CLI Base64URL Encoding](#cli-base64url-encoding)
    - [⬆Decoding a JWT](#decoding-a-jwt)
      - [⬆**jwtDecode(jwt)**](#jwtdecodejwt)
    - [⬆Encoding a JWT](#encoding-a-jwt)
      - [⬆**jwtEncode(header, payload, key[, options])**](#jwtencodeheader-payload-key-options)
    - [⬆Signing](#signing)
      - [⬆**rs256PEMSign(headerPayload, privateKey, passphrase)**](#rs256pemsignheaderpayload-privatekey-passphrase)
      - [⬆**rs256JWKSign(headerPayload, privateKey)**](#rs256jwksignheaderpayload-privatekey)
      - [⬆**hs256Sign(headerPayload, key)**](#hs256signheaderpayload-key)
    - [⬆Verifying a signature](#verifying-a-signature)
      - [⬆**rs256JWKVerify(jwt, publicKey)**](#rs256jwkverifyjwt-publickey)
      - [⬆**rs256PEMVerify(jwt, publicKey)**](#rs256pemverifyjwt-publickey)
      - [⬆**hs256Verify(jwt, passphrase, passphraseEncoding)**](#hs256verifyjwt-passphrase-passphraseencoding)
    - [⬆Utility Methods](#utility-methods)
      - [⬆**createHeaderPayload(header, payload)**](#createheaderpayloadheader-payload)
      - [⬆**base64URLEncode(json)**](#base64urlencodejson)
  - [⬆Appendix](#appendix)
    - [⬆What is a JWT?](#what-is-a-jwt)
    - [⬆Generating RSA256 private and public key pair](#generating-rsa256-private-and-public-key-pair)
    - [⬆Changing public key generated with ssh-keygen (the above command) into PEM format](#changing-public-key-generated-with-ssh-keygen-the-above-command-into-pem-format)
  - [⬆Contributing](#contributing)
  - [⬆License](#license)

<br>

## [⬆Usage](#index)

---

### [⬆Installation:](#index)

Use the package manager [npm](https://www.npmjs.com/) or
[yarn](https://yarnpkg.com/) to install jwt-authn.

```Shell
npm install jwt-authn
```

```Shell
yarn add jwt-authn
```

Or from a cdn:

```
https://cdn.jsdelivr.net/npm/jwt-authn@1.0.39/lib
```

If using for the command line support (or it'll only be available in the current
directory's node_modules folder):

```Shell
npm install -g jwt-authn
```

```Shell
yarn global install jwt-authn
```

<br>

---

### [⬆Accepted Form of JWTs](#index)

**This package is for dealing with JWTs of the form
[JWS JSON Compact Serialization](https://tools.ietf.org/html/rfc7515#section-7.1):**

\*[hint: read the two vertical bars/pipes "||" as AND operators.](https://tools.ietf.org/html/rfc7515#section-1.1)

```
BASE64URL(UTF8(JWS Protected Header)) || '.' ||
BASE64URL(JWS Payload) || '.' ||
BASE64URL(JWS Signature)

Ex:
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk

  where:
    JWS Protected Header: '{"typ":"JWT",\r\n "alg":"HS256"}'
    JWS Payload: '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}'
    JWS Signature: HS256(ASCII(BASE64URL(UTF8(JWS Protected Header)) || '.' ||
       BASE64URL(JWS Payload))) = dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

<br>

---

### [⬆CLI support (command line)](#index)

<br>

#### [⬆CLI JWT Decoding](#index)

<br>

Running just jwt-authn will try to decode whatever is in your clipboard.

```Shell
# Decodes what's in your clipboard.
jwt-authn
```

Alternatively, you can run jwt-authn with the clipboard option.

```Shell
jwt-authn -c
```

```Shell
jwt-authn --clipboard
```

or to decode the input

```Shell
jwt-authn eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

<br>

#### [⬆CLI Base64URL Encoding](#index)

<br>

Use the -b flag and a string to base64url encode the string

```shell
jwt-authn -b "hello"

# expected output
# aGVsbG8
```

Or use the --base64url flag and a string to base64url encode the string

```shell
jwt-authn --base64url "hello"

# expected output
# aGVsbG8
```

<br>

---

### [⬆Decoding a JWT](#index)

<br>

#### [⬆**jwtDecode(jwt)**](#index)

\*Decoding example taken from
[RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.2).

```javascript
// Decoding
import * as jwtAuthn from "jwt-authn";

jwtAuthn.jwtDecode(
  "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
);

/*
 * Output is an object that looks like this:
 *
 * {
 *   header: { alg: "RS256" },
 *   payload: {
 *     iss: "joe",
 *     exp: 1300819380,
 *     "http://example.com/is_root": true,
 *   },
 *   signature: "cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw",
 * };
 *
 */
```

<br>

---

### [⬆Encoding a JWT](#index)

<br>

#### [⬆**jwtEncode(header, payload, key[, options])**](#index)

where _options_ contains:

- keyFormat - format of the rs256 private key
- passphrase - if using an encrypted private key, passphrase is also required

\*Encoding example taken from
[RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.1).

```javascript
import * as jwtAuthn from "jwt-authn";

jwt.jwtEncode(
  '{"typ":"JWT",\r\n "alg":"HS256"}',
  '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}',
  "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow"
);

// returns
("eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk");
```

<br>
<br>

---

### [⬆Signing](#index)

<br>

#### [⬆**rs256PEMSign(headerPayload, privateKey, passphrase)**](#index)

- headerPayload: The combined base64url(header) and base64url(payload) separated
  by a ".".

- privateKey: The signing key.

- passphrase: (optional) if the privateKey is encrypted, include the passphrase
  used to encrypt it.

```javascript
import { rs256PEMSign, createHeaderPayload } from "jwt-authn";

const decodedHeader = { alg: "RS256" };
const decodedPayload = {
  "iss": "joe",
  "exp": 1300819380,
  "http://example.com/is_root": true,
};

// Make sure to have the new line "\n" after the title end before the ending
const privateKey =
  "-----BEGIN RSA PRIVATE KEY-----\n\
  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\
  \n-----END RSA PRIVATE KEY-----";

const headerPayload = createHeaderPayload(decodedHeader, decodedPayload);

const sig = rs256PEMSign(headerPayload, privateKey);

// expected output
// "UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";
```

<br>

#### [⬆**rs256JWKSign(headerPayload, privateKey)**](#index)

- headerPayload: The combined base64url(header) and base64url(payload) separated
  by a ".".

- privateKey: The signing key.

```javascript
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

const headerPayload = createHeaderPayload(decodedHeader, decodedPayload);

const sig = rs256JWKSign(headerPayload, privateKey);

// expected output
// "el3lmx2zFYSGmoOC5sJFjV4nCFyb6_2nY5WDSv_d9L2cw857vQBhjV2xybTQz5_4IIVLxpollxyomEQpC1xwZSZoU9lrmNau2TGg1iFGjyIXrtZy-UxV0t_xSwujFlA_WNFjw6eLI00ji3EcuOiMpqPa8IOTfXijtgkCx7oVweb2IVO6ZjMcssvhA7s3ezF8YHf6ewHK74UF4o0RuKn4K1PjBbmxDu3TXMOp69IvbnCj2ku--9QI7H9DFjiNVyWWnpz3wekGZuUePAj5GkrbPgvwhVVUiTcczYy55MUaF7mPjkb7JGEk2sH4lCa1Jlvz9xgYMdYTfbwmT9Wgvq_Usg"
```

<br>

#### [⬆**hs256Sign(headerPayload, key)**](#index)

- headerPayload: The combined base64url(header) and base64url(payload) separated
  by a ".".
- key: The signing key or passphrase.

```javascript
import { hs256Sign, createHeaderPayload } from "jwt-authn";

const decodedHeader = { typ: "JWT", alg: "HS256" };
const decodedPayload = {
  "iss": "joe",
  "exp": 1300819380,
  "http://example.com/is_root": true,
};
const passphrase =
  "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

const headerPayload = createHeaderPayload(decodedHeader, decodedPayload);

const sig = hs256Sign(headerPayload, passphrase);

// expected output
// "lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY"
```

<br>
<br>

---

### [⬆Verifying a signature](#index)

<br>

#### [⬆**rs256JWKVerify(jwt, publicKey)**](#index)

- jwt: the signed JWT (JSON Web Token) that you're trying to verify.
- publicKey: the public key used to verify the signature of the JWT.

```javascript
import { rs256JWKVerify } from "jwt-authn";

const encoded =
  "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.el3lmx2zFYSGmoOC5sJFjV4nCFyb6_2nY5WDSv_d9L2cw857vQBhjV2xybTQz5_4IIVLxpollxyomEQpC1xwZSZoU9lrmNau2TGg1iFGjyIXrtZy-UxV0t_xSwujFlA_WNFjw6eLI00ji3EcuOiMpqPa8IOTfXijtgkCx7oVweb2IVO6ZjMcssvhA7s3ezF8YHf6ewHK74UF4o0RuKn4K1PjBbmxDu3TXMOp69IvbnCj2ku--9QI7H9DFjiNVyWWnpz3wekGZuUePAj5GkrbPgvwhVVUiTcczYy55MUaF7mPjkb7JGEk2sH4lCa1Jlvz9xgYMdYTfbwmT9Wgvq_Usg";

rs256JWKVerify(encoded, {
  kty: "RSA",
  n: "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
  e: "AQAB",
});

// expected output: true
```

<br>

#### [⬆**rs256PEMVerify(jwt, publicKey)**](#index)

- jwt: the signed JWT (JSON Web Token) that you're trying to verify.
- publicKey: the public key used to verify the signature of the JWT.

```js
import { rs256PEMVerify } from "jwt-authn";

const encoded =
  "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";

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
);

// expected output: true
```

<br>

#### [⬆**hs256Verify(jwt, passphrase, passphraseEncoding)**](#index)

- jwt: the signed JWT (JSON Web Token) that you're trying to verify.
- passphrase: the passphrase used when signing with HMAC (HS256).
- passphraseEncoding: (optional) if specified and available, the encoding is
  used to read the passphrase. Otherwise, base64url encoding is assumed.

```js
import { hs256Verify } from "jwt-authn";

const passphrase =
  "AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow";

const encoded =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.lliDzOlRAdGUCfCHCPx_uisb6ZfZ1LRQa0OJLeYTTpY";

hs256Verify(encoded, passphrase);

// expected output: true
```

<br>
<br>

---

### [⬆Utility Methods](#index)

#### [⬆**createHeaderPayload(header, payload)**](#index)

- header: the decoded JWT header either in JSON object or a string literal in
  json format.
- payload: the decoded JWT payload either in JSON object or a string literal in
  json format.

Use this to create the header and payload combined by a ".". Useful for signing
functions.

```js
import { createHeaderPayload } from "jwt-authn";

const header = { alg: "RS256" },
const payload = {
  iss: "joe",
  exp: 1300819380,
  "http://example.com/is_root": true,
}

createHeaderPayload(header, payload);

// expected output:
// eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ
```

<br>

#### [⬆**base64URLEncode(json)**](#index)

- json: the input in JSON object format.

Use to create the base64url encoding of the the input.

```js
import { base64urlEncode } from "jwt-authn";

const payload = {
  "iss": "joe",
  "exp": 1300819380,
  "http://example.com/is_root": true,
};

base64URLEncode(payload);

// expected output:
// eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ
```

<br>
<br>

---

## [⬆Appendix](#index)

<br>

### [⬆What is a JWT?](#index)

A JWT (JSON Web Token), pronounced like "jot", passes along information in the
form of claims. It's often used because it's url safe and compact. Its
components are also in the form of JSON objects, a popular way to read
information across the internet. The cryptographic mechanisms of a JWS provide
integrity protection as well.

Resources:

[RFC 7519 JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)

[RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515)

[RFC 6749 The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)

<br>
<br>

### [⬆Generating RSA256 private and public key pair](#index)

```javascript
import crypto from "crypto";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "top secret", // this creates an encrypted private key. Make sure to pass it in when trying to sign a JWT. Omit for an unencrypted private key.
  },
});
```

**or from a bash shell**

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

<br>
<br>

### [⬆Changing public key generated with ssh-keygen (the above command) into PEM format](#index)

\*You need to do this to use it as the public key to verify a signed JWT.

```bash
# reads from file jwtRS256.key.pub
ssh-keygen -f jwtRS256.key.pub -e -m pem
```

**or with openssl**

```bash
# reads from file jwtRS256.key.pub
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

<br>
<br>

---

## [⬆Contributing](#index)

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

<br>
<br>

---

## [⬆License](#index)

![NPM](https://img.shields.io/npm/l/jwt-authn?&style=for-the-badge&logo=npm)

[MIT-Modern-Variant](https://spdx.org/licenses/MIT-Modern-Variant.html)

[MIT](https://choosealicense.com/licenses/mit/)
