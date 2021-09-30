---
title: "Verifying with RS256 (PEM)"
categories:
  - documentation
tags:
  - docs
  - jwt
  - verify
  - rs256
  - pem
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

## **rs256PEMVerify(jwt, publicKey)**

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

* jwt: the signed JWT (JSON Web Token) that you're trying to verify.
* publicKey: the public key used to verify the signature of the JWT.

```js
import { rs256PEMVerify } from "jwt-authn";

const encoded = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM"

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