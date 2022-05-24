# Cloudflare Workers™ - Password hasher

A worker that uses bcrypt to hash your passwords at the edge. Designed for use with an IdP solution or for creating accounts at the edge.

## Why?
This Worker was built for Wordful, my multiplayer Wordle that needs a way to hash passwords for storage without having a dedicated VPS or machine doing it.
I would have loved to use Argon2 however the current WASM implementations leave a lot to be desired and they currently only work in browsers.

