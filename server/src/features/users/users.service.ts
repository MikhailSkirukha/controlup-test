import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
  ) {}

  findAll(roleIds?: number[]) {
    const qb = this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role');

    if (!!roleIds?.length) {
      qb.innerJoin(
        'user.roles',
        'roleFilter',
        'roleFilter.id IN (:...roleIds)',
        { roleIds },
      );
    }

    qb.orderBy('user.id', 'ASC').addOrderBy('role.id', 'ASC');

    return qb.getMany();
  }

  async updateRoles(userId: number, roleIds: number[]) {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const roles = await this.rolesRepo.findBy({ id: In(roleIds) });
    user.roles = roles;

    return this.usersRepo.save(user);
  }
}
