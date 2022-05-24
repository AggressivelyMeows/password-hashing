import test from "ava";
import { Miniflare } from "miniflare";

test.beforeEach((t) => {
    // Create a new Miniflare environment for each test
    const mf = new Miniflare({
        // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
        envPath: true,
        packagePath: true,
        wranglerConfigPath: true,
        // We don't want to rebuild our worker for each test, we're already doing
        // it once before we run all tests in package.json, so disable it here.
        // This will override the option in wrangler.toml.
        buildCommand: undefined,
    });
    t.context = { mf };
});

test('Hashes password successfully', async (t) => {
    const { mf } = t.context;

    const res = await mf.dispatchFetch(
        'http://localhost:8787/v1/hash',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: 'Hello, World'
            })
        }
    );

    const body = await res.json()

    t.is(body.success, true)
})

test('Password comparison is valid', async (t) => {
    const { mf } = t.context;

    const res = await mf.dispatchFetch(
        'http://localhost:8787/v1/compare',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: 'Hello, World',
                hash: '$2a$13$OCtThZwrfMevsNggyeXnJum7D5Gksy71OVLnJvL8RmtCH5fPPzXpq'
            })
        }
    );

    const body = await res.json()

    t.is(body.success, true)
    t.is(body.is_same, true)
})