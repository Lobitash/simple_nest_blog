import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/nest-blog?replicaSet=rs0', {
    //   serverSelectionTimeoutMS: 10000,
    //   // replicaSet: 'rs0',
    // }),
    MongooseModule.forRoot("mongodb://mongodb:27017/nest-blog", {
      directConnection: true,
      serverSelectionTimeoutMS: 10000,
    }),
    // MongooseModule.forRoot('mongodb://root:example@127.0.0.1:27017/nestjs', {
    //   serverSelectionTimeoutMS: 100000,
    // }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'my_postgres',
      // port: 5433,
      // username: 'root',
      // password: 'example',
      // database: 'nestjs',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'openup',
      database: 'simple_nestjs_blog',
      entities: [User, Blog],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

