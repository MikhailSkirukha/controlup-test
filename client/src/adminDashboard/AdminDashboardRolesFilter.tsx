import { FormControl, Typography } from '@mui/material';
import type { Role } from './types/Role';
import { MultiSelect } from '../components/MultiSelect';

type AdminDashboardRolesFilterProps = {
  roles: Role[];
  selectedRoleIds: number[];
  onChange: (roleId: number[]) => void;
};

export const AdminDashboardRolesFilter = ({
  roles,
  selectedRoleIds,
  onChange,
}: AdminDashboardRolesFilterProps) => (
  <FormControl sx={{ minWidth: 300, mb: 2 }}>
    <Typography>Filter by Role</Typography>
    <MultiSelect
      values={selectedRoleIds}
      range={roles.map((role) => ({ id: role.id, name: role.name }))}
      onChange={onChange}
      placeholder="Select roles..."
    />
  </FormControl>
);
