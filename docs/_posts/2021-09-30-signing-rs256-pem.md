---
title: "Signing with RS256 (PEM)"
categories:
  - documentation
tags:
  - docs
  - jwt
  - sign
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

## **rs256PEMSign(headerPayload, privateKey, passphrase)**

[Full Documentation]({{ site.baseurl }}{% link _posts/2021-09-25-full-documentation.md %})

* headerPayload: The combined base64url(header) and base64url(payload) separated by a ".".

* privateKey: The signing key.

* passphrase: (optional) if the privateKey is encrypted, include the passphrase used to encrypt it.

```javascript
import { rs256PEMSign, createHeaderPayload } from "jwt-authn";

const decodedHeader = { alg: "RS256" };
const decodedPayload = {
  iss: "joe",
  exp: 1300819380,
  "http://example.com/is_root": true,
};

// Make sure to have the new line "\n" after the title end before the ending
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

const sig = rs256PEMSign(headerPayload, privateKey);

// expected output
// "UkNEGPn1I_xQg_ztCjwjzQXetpRMtuLOnGx-6lHB1UH3QE6s8kCkYJLOT1dGMuH_LCcJU41VfGoKTKvAT0ZzDu0Au7g8FL1DFj0HmflpoWsYcuKrSywvqwHL8KSJySYzbSBzNLAYOn1CxfNKRcQyVwRAXJUkZlIL2eE0LRhSwuwQdobHm_oyB4l4OhQSLVgehprGBRLyHxh2fAuyTb3dE2HBXta5YKSPVSbGIvv41KRdqoBoo3a2-GxEMjjS9W7xSjc7Pb7sOt1IJLXeFF5aULI8WsefaW5kPvcdYtGbphxK3qJItudmk_3IuQoMXAZVvLcbfsUu920-gYKKN_iWAb9VDP6WRVOOihTVi5dtFfdzJMfg7rRz2Vprly6fsIDDedERMR-4e6YNE4lmpjjkWx7Roj5xSH0EmfHIiQagwLZ4UYhTpLSYnp_y3Eh7lb7VsoNRBFj_c-26ofB3TLRKqSzJzNdzCJWTZeugYk8Rv75zyh7bGUtX_WmdgwWNKwi4df_nBltB5VZ-UzbQakmqWoZ-HrkkCXrrbooZIySzNBDJJc89rYilIlB3rLv8pu4aSXf8pBp2ii-GZYK4rONK9wPlzYgXa-wMcifUQ7j5bBB9njPITRcp6iT60bAf143vnzGaZ7IE-5GxZ3x8smnBCTqxtRU6cZ3yhXrX5dN9_BM";
```