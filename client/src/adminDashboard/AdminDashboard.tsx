import React, { useCallback, useEffect, useState } from 'react';
import { fetchRoles, fetchUsers, updateUserRoles } from './adminDashboardApi';
import { useMessages } from '../messages/useMessagesContext';
import type { Role } from './types/Role';
import type { User } from './types/User';
import { UsersTable } from './usersTable/UsersTable';
import { AdminDashboardRolesFilter } from './AdminDashboardRolesFilter';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const { showMessage } = useMessages();

  useEffect(() => {
    const loadRoles = async () => {
      setIsLoadingRoles(true);
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (err: any) {
        showMessage(err.message || 'Failed to load data', 'error');
      } finally {
        setIsLoadingRoles(false);
      }
    };
    loadRoles();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const usersData = await fetchUsers(selectedRoleIds);
        setUsers(usersData);
      } catch (err: any) {
        showMessage(err.message || 'Failed to load data', 'error');
      } finally {
        setIsLoadingUsers(false);
      }
    };
    loadUsers();
  }, [selectedRoleIds]);

  const handleRoleFilterChange = (roleIds: number[]) => {
    setSelectedRoleIds(roleIds);
  };

  const handleUserRoleChange = useCallback(
    async (userId: number, selectedRoleIds: number[]) => {
      setUpdatingUserId(userId);
      try {
        await updateUserRoles(userId, selectedRoleIds);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  roles: roles.filter((r) => selectedRoleIds.includes(r.id)),
                }
              : u,
          ),
        );
        const user = users.find((u) => u.id === userId);
        showMessage(`Roles updated for ${user?.name}`, 'success');
      } catch (err: any) {
        showMessage(err.message || 'Failed to update roles', 'error');
      } finally {
        setUpdatingUserId(null);
      }
    },
    [roles, users],
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ padding: 2 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <AdminDashboardRolesFilter
          roles={roles}
          onChange={handleRoleFilterChange}
          selectedRoleIds={selectedRoleIds}
        />
        <UsersTable
          users={users}
          roles={roles}
          loading={isLoadingRoles || isLoadingUsers}
          updatingUserId={updatingUserId}
          onRoleChange={handleUserRoleChange}
        />
      </Box>
    </>
  );
};
