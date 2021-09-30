---
title: "Appendix - Generating RSA256 Private and Public Key Pairs"
categories:
  - appendix
tags:
  - appendix
  - jwt
  - rsa256
  - rs256
  - private
  - public
  - key pair
  - key
  - bash
  - javascript
  - js
  - node
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

## Generating RSA256 private and public key pair

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

**with javascript**

```javascript
import crypto from "crypto";

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
      passphrase: "top secret", // this creates an encrypted private key. Make sure to pass it in when trying to sign a JWT. Omit for an unencrypted private key.
    },
  }
);
```

**or from a bash shell**

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```