[![install size](https://packagephobia.com/badge?p=jwt-authn)](https://packagephobia.com/result?p=jwt-authn)

# jwt-authn

jwt-authn is an npm package for dealing with JSON Web Tokens. Encoding, decoding, verifying, and more coming.

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install jwt-authn.

```Shell
npm install jwt-authn
```

```Shell
yarn add jwt-authn
```

## Usage

JWTs of the form [JWS JSON Compact Serialization](https://tools.ietf.org/html/rfc7515#section-7.1):

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

### Decoding a JWT

Decoding example taken from [RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.2).

```javascript
// Decoding
import * as jwtAuthn from "jwt-authn";

jwtAuthn.jwtDecode(
  "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
);

/*
* Output is an object with these parameters:
*
* header: '{"typ":"JWT",\r\n "alg":"HS256"}',
* payload: '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}',
* key: 'AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow'
*
*/
```

### Encoding a JWT

Encoding example taken from [RFC 7515 JSON Web Signature (JWS)](https://tools.ietf.org/html/rfc7515#appendix-A.1.1).

**jwtEncode(header, payload, key[, options])**

where *options* contains:

- keyFormat - format of the rs256 private key
- passphrase - if using an encrypted private key, passphrase is also required
```javascript
import * as jwtAuthn from "jwt-authn";

jwt.jwtEncode(
  '{"typ":"JWT",\r\n "alg":"HS256"}',
  '{"iss":"joe",\r\n "exp":1300819380,\r\n "http://example.com/is_root":true}',
  'AyM1SysPpbyDfgZld3umj1qzKObwVMkoqQ-EstJQLr_T-1qS0gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr1Z9CAow'
);

// returns
// "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
```

## Appendix
### Generating RSA256 private and public key pair
```Shell
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

### Changing public key generated with ssh-keygen (the above command) into PEM format
*You need to do this to use it as the public key to verify a signed JWT.
```Shell
ssh-keygen -f jwtRS256.key.pub -e -m pem

# or with openssl
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
