import type { Role } from '../types/Role';
import { MultiSelect } from '../../components/MultiSelect';

type RolesSelectProps = {
  userId: number;
  userRoles: Role[];
  roles: Role[];
  loading?: boolean;
  onChange: (userId: number, selectedRoleIds: number[]) => void;
};

export const UsersTableRolesSelect = ({
  userId,
  loading,
  userRoles,
  roles,
  onChange,
}: RolesSelectProps) => (
  <MultiSelect
    values={userRoles.map((r) => r.id)}
    range={roles}
    onChange={(roleIds) => onChange(userId, roleIds)}
    loading={loading}
    placeholder="Select roles..."
  />
);
