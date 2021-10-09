const ctx = require.context('./ts', true, /\.ts$/)

interface AllFileModule {
  [prop:string]: any
}

const importAll = (ctx:any)=> {
  const allFileModule:AllFileModule = {}
  return ctx.keys().reduce((acc:AllFileModule, path: string) => {
    const keyArr: string[] = path.split('/')
    keyArr.shift()
    const moduleName = keyArr.join('.').replace(/\.ts$/g, '')
    acc[moduleName] = ctx(path)
    return acc
  }, {})
}

const allJs = importAll(ctx)

console.log('所有文件暴露方法',allJs)



