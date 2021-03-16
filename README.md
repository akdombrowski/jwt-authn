[![install size](https://packagephobia.com/badge?p=jwt-authn)](https://packagephobia.com/result?p=jwt-authn)

# jwt-authn
jwt-authn is an npm package for dealing with JSON Web Tokens.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install jwt-authn.

```bash
npm install jwt-authn
```

## Usage

```javascript
import * as jwtAuthn from "jwt-authn"

jwtAuthn.jwtDecode('word') # returns 'words'
jwtAuthn.jwtEncode('goose') # returns 'geese'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
