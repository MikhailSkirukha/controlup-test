import {
  Select,
  MenuItem,
  ListItemText,
  Skeleton,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

type IdName = { id: number; name: string };

type MultiSelectProps = {
  values: number[];
  range: IdName[];
  loading?: boolean;
  placeholder?: string;
  onChange: (selectedIds: number[]) => void;
};

export const MultiSelect = ({
  values,
  range,
  loading,
  placeholder = 'Select...',
  onChange,
}: MultiSelectProps) => {
  if (!range || range.length === 0) {
    return (
      <Box sx={{ width: 250 }}>
        <Skeleton variant="rectangular" height={40} />
      </Box>
    );
  }

  const placeholderComponent = (
    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
      {placeholder}
    </Typography>
  );

  return (
    <Box sx={{ position: 'relative', width: 250 }}>
      <Select
        multiple
        displayEmpty
        value={values}
        onChange={(e) => onChange(e.target.value as number[])}
        renderValue={(selected) =>
          (selected as number[])
            .map((id) => range.find((r) => r.id === id)?.name)
            .join(', ') || placeholderComponent
        }
        sx={{ width: 250 }}
      >
        {range.map(({ id, name }) => (
          <MenuItem key={id} value={id} selected={values.includes(id)}>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            marginTop: '-12px',
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};
