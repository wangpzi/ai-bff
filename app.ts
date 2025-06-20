const { addAliases } = require('module-alias');
addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interface`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
});

import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa';
import co from 'co';
import render from 'koa-swig';
import config from '@config/index';
import serve from 'koa-static';

const { port, viewDir, staticDir, memoryFlag } = config;
import { historyApiFallback } from 'koa2-connect-history-api-fallback';


const app = new Koa();

// 静态资源目录
app.use(serve(staticDir));

const container = createContainer();
// 所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*.{js,ts}`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
});

// 第一次用户请求router中  都会从容器中取到注入的服务
app.use(scopePerRequest(container));

app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <'memory' | false>memoryFlag, // disable, set to false
    writeBody: true,
    ext: 'html',
  })
)

app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
// 所有的路由全都生效
app.use(loadControllers(`${__dirname}/routers/*.{js,ts}`));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})