const fs = require('fs');
const Koa = require('koa')
const path = require('path');
const send = require('koa-send');
const Router = require('koa-router');

const template = fs.readFileSync(path.join(__dirname,'src/index.template.html'), 'utf-8');

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = require('vue-server-renderer').createRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

// 引入app.js
const createApp = require(path.join(__dirname, 'src/app'));

const port = 8090;
const app = new Koa();
const router = new Router();

const render = async ()

router.get('*', async (ctx, next) => {
  try {
    const app = createApp(ctx)
    const context = {
      title: 'vue服务器渲染组件',
      meta: `
        <meta charset = "utf-8">
        <meta name = "" content="vue服务器渲染组件">
      `
    }
    const html = await renderer.renderToString(app, context)
    ctx.status = 200
    ctx.body = html
  } catch (e) {
      console.log(e)
    ctx.status = 500
    ctx.body = '服务器错误'
  }
  
});

app
  .use(router.routes());
app.use(router.allowedMethods({}));

app.listen(port, ()=> {
  console.log(`server started at http://localhost:${port}`)
});


