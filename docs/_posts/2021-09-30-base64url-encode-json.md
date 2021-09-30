---
title: "Utility Methods - Base64URL Encode"
categories:
  - utility
tags:
  - utility
  - jwt
  - base64url
  - encode
  - utility
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

## **base64URLEncode(json)**

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

* json: the input in JSON object format.

Use to create the base64url encoding of the the input.

```js
import { base64urlEncode } from "jwt-authn";

const payload = {
  iss: "joe",
  exp: 1300819380,
  "http://example.com/is_root": true,
}

base64URLEncode(payload);

// expected output:
// eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ
```