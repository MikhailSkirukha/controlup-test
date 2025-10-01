import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  idAccessor: (row: T) => string | number;
};

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  idAccessor,
}: DataTableProps<T>) => {
  if (!data?.length && !loading) {
    return (
      <Typography sx={{ m: 2 }} align="center">
        No data available
      </Typography>
    );
  }

  const showSkeleton = !data?.length && loading;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <Typography fontWeight="bold">{col.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {showSkeleton
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.key as string}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((row) => (
                  <TableRow key={idAccessor(row)}>
                    {columns.map((col) => (
                      <TableCell key={col.key as string}>
                        {col.render
                          ? col.render(row)
                          : (row[col.key] as React.ReactNode)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.6)"
          zIndex={1}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
