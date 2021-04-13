![npm](https://img.shields.io/npm/v/jwt-authn?style=for-the-badge&logo=npm)
![npm bundle size](https://img.shields.io/bundlephobia/min/jwt-authn?style=for-the-badge&logo=npm)
![codesize](https://img.shields.io/github/languages/code-size/akdombrowski/jwt-authn?&style=for-the-badge&logo=github)
![npm](https://img.shields.io/npm/dw/jwt-authn?&style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/jwt-authn?&style=for-the-badge&logo=npm)
![GitHub Sponsors](https://img.shields.io/github/sponsors/akdombrowski?style=for-the-badge&logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/akdombrowski/jwt-authn?style=for-the-badge&logo=github)
![GitHub forks](https://img.shields.io/github/forks/akdombrowski/jwt-authn?style=for-the-badge&logo=github)
![GitHub watchers](https://img.shields.io/github/watchers/akdombrowski/jwt-authn?style=for-the-badge&logo=github)

# jwt-authn

jwt-authn is an npm package for dealing with JSON Web Tokens. Encoding, decoding, verifying, signing, and more coming. It's only dependency is the [Crypto](https://nodejs.org/api/crypto.html) module in Nodejs.

<br>
<br>
<br>

### Index
- [Usage](#usage)
  - [Installation](#installation)
  - [Accepted Form of JWts](#accepted-form-of-JWTs)

## Usage[⬆](#index)
### Installation:[⬆](#index)

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install jwt-authn.

```Shell
npm install jwt-authn
```

```Shell
yarn add jwt-authn
```
<br>
<br>
<br>

### Accepted Form of JWTs[⬆](#index)

**For JWTs of the form [JWS JSON Compact Serialization](https://tools.ietf.org/html/rfc7515#section-7.1):**

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
       BASE64URL(JWS Payload)))
               =
               dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```
<br>
<br>
<br>

---
### Decoding a JWT

<br>

#### **jwtDecode(jwt)**

*Decoding example taken from [RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.2).

```javascript
// Decoding
import * as jwtAuthn from "jwt-authn";

jwtAuthn.jwtDecode("eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk");

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
<br>
<br>

---
### Encoding a JWT

<br>

#### **jwtEncode(header, payload, key[, options])**


where *options* contains:

- keyFormat - format of the rs256 private key
- passphrase - if using an encrypted private key, passphrase is also required


*Encoding example taken from [RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.1).


```javascript
import * as jwtAuthn from "jwt-authn";

jwt.jwtEncode(
  '{"typ":"JWT",\r\n "alg":"HS256"}',
  '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}',
  'AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow'
);

// returns
"eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
```
<br>
<br>
<br>

---
## Appendix
<br>

### Generating RSA256 private and public key pair

```Shell
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```
<br>


<br>


### Changing public key generated with ssh-keygen (the above command) into PEM format

*You need to do this to use it as the public key to verify a signed JWT.
```Shell
ssh-keygen -f jwtRS256.key.pub -e -m pem

# or with openssl
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
<br>
<br>
<br>

---
# Contributing


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<br>
<br>
<br>

---
# License

[MIT](https://choosealicense.com/licenses/gpl-3.0/)

![NPM](https://img.shields.io/npm/l/jwt-authn?&style=for-the-badge&logo=npm)
