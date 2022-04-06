const Vue = require('vue');
const fs = require('fs');
const Koa = require('koa')
const path = require('path');
const send = require('koa-send');
const Router = require('koa-router');
const { createBundleRenderer } = require('vue-server-renderer');

// 监听文件变化
const devConfig = require('./build/dev.config.js')

let renderer

const port = 8090;
const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV === 'production') {
    const template = fs.readFileSync(path.join(__dirname,'src/index.template.html'), 'utf-8');
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');

    renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false, // 推荐
        template: template, // 页面模板
        clientManifest // 客户端构建 manifest
    });

    router.get('/static/*', async (ctx, next) => {
        await send(ctx, ctx.path, {root: __dirname + '/./dist'})
    });
} else {
    const template = path.resolve(__dirname, './src/index.template.html')
    devConfig(app, template, (bundle, options)=> {
        console.log('开发环境重新打包....')
        const option = Object.assign({
            runInNewContext: false
        }, options)
        renderer = createBundleRenderer(bundle, option)
    })
}

const renders = async (ctx, next) => {
    ctx.set('Content-Type', 'text/html')
    const handleError = err => {
        if (err.code === 404) {
            ctx.status = 404
            ctx.body = '404 page not found'
        } else {
            ctx.status = 500
            ctx.body = '500 internal server error'
            console.log(err.stack)
        }
    }
    const context = {
        url: ctx.url,
        title: 'vue服务器渲染组件',
        meta: `
            <meta charset = "utf-8">
            <meta name = "" content="vue服务器渲染组件">
        `
    }
    try {
        const html = await renderer.renderToString(context)
        ctx.status = 200
        ctx.body = html
    } catch (e) {
        handleError(e)
    }
    next()
}



router.get('*', renders)

app
  .use(router.routes());
app.use(router.allowedMethods({}));

app.listen(port, ()=> {
  console.log(`server started at http://localhost:${port}`)
});


