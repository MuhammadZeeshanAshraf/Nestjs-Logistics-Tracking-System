import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import config from '../config';

@Injectable()
export class DatabaseModule implements TypeOrmOptionsFactory {
  constructor() {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      database: config.database.database,
      password: config.database.password,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      logging: true,
      // entities: [Container, Product],
      extra: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
      },
    } as TypeOrmModuleOptions;
  }
}
