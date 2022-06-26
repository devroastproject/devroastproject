import * as React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        margin='5px'>
        <CircularProgress />
      </Grid>
    </Box>
  );
}
