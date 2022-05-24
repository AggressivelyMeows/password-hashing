import Router from '@tsndr/cloudflare-worker-router'
import bcrypt from 'bcryptjs'

const router = new Router()

router.post('/v1/hash', async (req, res) => {
    const data = req.body

    // 12 will take about 600ms to complete
    // however 14 will take 1.5 seconds.
    const hash = await bcrypt.hash(data.password, 13)

    res.body = {
        success: true,
        hash
    }
})

router.post('/v1/compare', async (req, res) => {
    const data = req.body

    const is_same = await bcrypt.compare(data.password, data.hash)

    res.body = {
        success: true,
        is_same
    }
})

export default {
    async fetch(request) {
        return await router.handle(request)
    }
}