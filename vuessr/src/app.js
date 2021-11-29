const Vue = require('vue');

const Koa = require('koa');

const Router = require('koa-router');

const path = require('path');

const fs = require('fs');

const template = fs.readFileSync(path.join(__dirname,'index.template.html'), 'utf-8')

const renderer = require('vue-server-renderer').createRenderer({
  template 
});

const app = new Koa();

const router = new Router();

const port = 8090;

router.get('*', async (ctx, next) => {
  console.log(ctx)
  try {
    const app = new Vue({
        data: {
          url: ctx.url
        },
        template: `<div> 访问的url是： {{url}} </div>`
    })
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


