import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './features/roles/roles.module';
import { UsersModule } from './features/users/users.modules';

@Module({
  imports: [DatabaseModule, RolesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
