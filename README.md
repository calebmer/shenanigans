# shenanigans

A sane way to do errors in a node app.

How you ask?

Well requiring custom errors isn’t too fun so this module takes your error message of shenanigans syntax, parses it, and returns an object with some much friendlier properties.

```js
const Shenanigans = require('./shenanigans')

try {
  throw new Error('403: Not allowed to access resource (Try logging in)')
}
catch (error) {
  const info = Shenanigans.parse(error)
  console.log(info) // => { statusCode: 403, message: 'Not allowed to access resource', hint: 'Try logging in' }
}
```

And for some real fun if you are using HTTP status codes

```js
const Shenanigans = require('./shenanigans')

try {
  throw new Error(404)
}
catch (error) {
  const info = Shenanigans.parse(error)
  console.log(info) // => { statusCode: 404, message: 'Not Found' }
}
```

## Syntax

```
${status code}: ${message} (${hint})
```

Where status code is a number.

## API

### Shenanigans.parse(message[, options])

Parses the message and returns an info object.

Options are booleans which enable/disable features, they are all true by default and they include:

- `statusCode`: Parse the HTTP status code
- `hint`: Parse the hint
- `assertion`: Enable the assertion error special case
