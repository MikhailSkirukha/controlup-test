import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../features/users/user.entity';
import { Role } from '../../features/roles/role.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [SeedService],
})
export class SeedModule {}
