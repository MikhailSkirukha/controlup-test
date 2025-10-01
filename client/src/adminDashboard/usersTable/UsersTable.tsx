import { DataTable } from '../../components/DataTable';
import { UsersTableRolesSelect } from './UsersTableRolesSelect';
import type { User } from '../types/User';
import type { Role } from '../types/Role';

const userIdAccessor = (user: User) => user.id;

type UsersTableProps = {
  users: User[];
  roles: Role[];
  loading: boolean;
  updatingUserId: number | null;
  onRoleChange: (userId: number, selectedRoleIds: number[]) => void;
};

export const UsersTable = ({
  users,
  roles,
  loading,
  updatingUserId,
  onRoleChange,
}: UsersTableProps) => (
  <DataTable<User>
    idAccessor={userIdAccessor}
    data={users}
    loading={loading}
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      {
        key: 'roles',
        label: 'Roles',
        render: ({ id, roles: userRoles }) => (
          <UsersTableRolesSelect
            userId={id}
            userRoles={userRoles}
            roles={roles}
            loading={updatingUserId === id}
            onChange={onRoleChange}
          />
        ),
      },
    ]}
  />
);
