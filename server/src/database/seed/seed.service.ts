import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/features/users/user.entity';
import { Role } from 'src/features/roles/role.entity';
import { Roles } from 'src/features/roles/roles.enum';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRoles();
    await this.seedUsers();
  }

  private async seedRoles() {
    const count = await this.rolesRepo.count();
    if (count === 0) {
      await this.rolesRepo.save([
        { id: Roles.ADMIN, name: 'Admin' },
        { id: Roles.EDITOR, name: 'Editor' },
        { id: Roles.VIEWER, name: 'Viewer' },
      ]);
    }
  }

  private async seedUsers() {
    const count = await this.usersRepo.count();
    if (count === 0) {
      const roles = await this.rolesRepo.find();
      const rolesMap = new Map(roles.map((role) => [role.id, role]));
      await this.usersRepo.save([
        {
          name: 'Anakin Skywalker',
          email: 'askywalker@test.com',
          roles: [rolesMap.get(Roles.EDITOR) as Role],
        },
        {
          name: 'Boba Fett',
          email: 'bobfett@test.com',
          roles: [rolesMap.get(Roles.VIEWER) as Role],
        },
        {
          name: 'Chewbacca',
          email: 'chewbacca@test.com',
          roles: [rolesMap.get(Roles.VIEWER) as Role],
        },
        {
          name: 'Darth Vader',
          email: 'dvader@test.com',
          roles: [
            rolesMap.get(Roles.EDITOR) as Role,
            rolesMap.get(Roles.VIEWER) as Role,
          ],
        },
        {
          name: 'Emperor',
          email: 'emperor@test.com',
          roles: [
            rolesMap.get(Roles.ADMIN) as Role,
            rolesMap.get(Roles.EDITOR) as Role,
          ],
        },
      ]);
    }
  }
}
