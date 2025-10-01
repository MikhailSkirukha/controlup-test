import type { Role } from './types/Role';
import type { User } from './types/User';
import { baseApi } from '../api/baseApi';

export const fetchUsers = async (roleIds?: number[]) => {
  const params = roleIds ? { roles: roleIds.join(',') } : {};
  const { data } = await baseApi.get<User[]>('/users', { params });

  return data;
};

export const fetchRoles = async () => {
  const { data } = await baseApi.get<Role[]>('/roles');

  return data;
};

export const updateUserRoles = (userId: number, roleIds: number[]) =>
  baseApi.patch(`/users/${userId}/roles`, { roleIds });
