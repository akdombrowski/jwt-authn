---
title: "Accepted Form of JWTs"
categories:
  - documentation
tags:
  - docs
  - jwt
  - form
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

### [⬆Accepted Form of JWTs](#index)

**This package is for dealing with JWTs of the form [JWS JSON Compact Serialization](https://tools.ietf.org/html/rfc7515#section-7.1):**

*[hint: read the two vertical bars/pipes "||" as AND operators.](https://tools.ietf.org/html/rfc7515#section-1.1)

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