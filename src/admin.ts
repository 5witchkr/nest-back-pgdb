///사용불가
import AdminJS from 'adminJS';
import * as AdminJSExpress from '@adminJS/express'
import { Database, Resource} from '@adminJS/typeorm'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Content } from 'src/contents/content.entity';

async function runAdmin() {
  // Nest.js App 생성
  const app = await NestFactory.create(AppModule);

  // AdminBro Adapter 등록
  AdminJS.registerAdapter({ Database, Resource });

  // AdminBro router 생성
  const adminJS = new AdminJS({
    resources: [
      { resource: Content }
    ],
    rootPath: '/admin'
  });
  const router = AdminJSExpress.default.buildRouter(adminJS);

  // Nest.js AdminBro 연결
  app.use(adminJS.options.rootPath, router);

  // App 실행
  await app.listen(3000);
  console.log('Nest.js AdminBro is running on 3000')
}

runAdmin();