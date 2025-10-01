import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query('roles') roles?: string) {
    const roleIds = roles ? roles.split(',').map((id) => +id) : [];
    return this.usersService.findAll(roleIds);
  }

  @Patch(':id/roles')
  updateRoles(@Param('id') id: number, @Body() body: { roleIds: number[] }) {
    return this.usersService.updateRoles(+id, body.roleIds);
  }
}
