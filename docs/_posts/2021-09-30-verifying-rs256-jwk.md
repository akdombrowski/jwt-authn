---
title: "Verifying with RS256 (JWK)"
categories:
  - documentation
tags:
  - docs
  - jwt
  - verify
  - rs256
  - jwk
---
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
[![Rate on Openbase](https://badges.openbase.com/js/rating/jwt-authn.svg)](https://openbase.com/js/jwt-authn?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)
[link to npm](https://www.npmjs.com/package/jwt-authn)
# jwt-authn

## **rs256JWKVerify(jwt, publicKey)**

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

* jwt: the signed JWT (JSON Web Token) that you're trying to verify.
* publicKey: the public key used to verify the signature of the JWT.

```javascript
import { rs256JWKVerify } from "jwt-authn";

const encoded = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.el3lmx2zFYSGmoOC5sJFjV4nCFyb6_2nY5WDSv_d9L2cw857vQBhjV2xybTQz5_4IIVLxpollxyomEQpC1xwZSZoU9lrmNau2TGg1iFGjyIXrtZy-UxV0t_xSwujFlA_WNFjw6eLI00ji3EcuOiMpqPa8IOTfXijtgkCx7oVweb2IVO6ZjMcssvhA7s3ezF8YHf6ewHK74UF4o0RuKn4K1PjBbmxDu3TXMOp69IvbnCj2ku--9QI7H9DFjiNVyWWnpz3wekGZuUePAj5GkrbPgvwhVVUiTcczYy55MUaF7mPjkb7JGEk2sH4lCa1Jlvz9xgYMdYTfbwmT9Wgvq_Usg";

rs256JWKVerify(encoded, {
  kty: "RSA",
  n: "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
  e: "AQAB",
});

// expected output: true
```