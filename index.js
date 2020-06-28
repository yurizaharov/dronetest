const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static-server')

const app = new Koa();
const router = require('./router');

const PORT = process.env.PORT || 8085;
const ADDRCONFIG = process.env.ADDRCONFIG || '0.0.0.0';

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${new Date()} - ${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// cross-domain requests
app.use(cors());

// response
app.use(router.routes());

// serving directory
app.use(serve({rootDir: 'frontend', rootPath: '/'}))

app.listen(PORT, ADDRCONFIG, () => console.log(`server is live @${ADDRCONFIG}:${PORT}`));
