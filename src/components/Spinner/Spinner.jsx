import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
  return (
    <Box sx={{ display: 'flex', alignSelf: 'center' }}>
      <CircularProgress />
    </Box>
  );
}
export default Spinner;
