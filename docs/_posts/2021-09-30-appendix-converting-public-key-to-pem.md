---
title: "Appendix - Converting Public Key to PEM Format"
categories:
  - appendix
tags:
  - appendix
  - jwt
  - rsa256
  - rs256
  - public
  - key pair
  - key
  - pem
  - ssh-keygen
  - bash
  - openssl
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

## Changing public key generated with ssh-keygen ([instructions in appendix]({{ site.baseurl }}{% link _posts/2021-09-30-appendix-generating-rsa256-private-public-key-pair.md %})) into PEM format

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

***You need to do this so it's in the right format to use as the public key to verify a signed JWT.**
```bash
# reads from file jwtRS256.key.pub
ssh-keygen -f jwtRS256.key.pub -e -m pem
```

**or with openssl**

```bash
# reads from file jwtRS256.key.pub
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```