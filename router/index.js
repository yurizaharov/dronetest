const Router = require('koa-router');

const router = new Router();

router
    .get('/ping', (ctx) => {
        ctx.body = 'Pong';
    })

module.exports = router;
