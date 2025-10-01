import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.modules';
import { DatabaseConfig } from './database.config';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [DatabaseConfig],
});

const typeOrmModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const db = config.get('database');

    return {
      ...db,
      autoLoadEntities: true,
      synchronize: true,
    };
  },
});

@Global()
@Module({
  imports: [configModule, typeOrmModule, SeedModule],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
