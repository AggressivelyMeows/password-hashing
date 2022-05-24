# Cloudflare Workers™ - Password hasher

A worker that uses bcrypt to hash your passwords at the edge. Designed for use with an IdP solution or for creating accounts at the edge.

## Why?
This Worker was built for Wordful, my multiplayer Wordle that needs a way to hash passwords for storage without having a dedicated VPS or machine doing it.
I would have loved to use Argon2 however the current WASM implementations leave a lot to be desired and they currently only work in browsers.

## API
`POST /v1/hash`
```js
fetch('password-hasher.your.workers.dev/v1/hash',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: 'Hello, World'
        })
    }
)
```

Returns the hash result as the `hash` key in the response.

`POST /v1/compare`
```js
fetch('password-hasher.your.workers.dev/v1/hash',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // the password you want to compare with.
            password: 'Hello, World',
            // the hash you saved from the first call to hash
            hash: '$2a$13$OCtThZwrfMevsNggyeXnJum7D5Gksy71OVLnJvL8RmtCH5fPPzXpq'
        })
    }
)
```

Returns `is_same` if the password matches the hash.

