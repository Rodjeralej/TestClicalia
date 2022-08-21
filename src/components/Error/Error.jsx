// Dependencies
import React from 'react';
// Material UI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function Error() {
  return (
    <Card>
      <CardContent>
        <Typography>OOOPS...Something went wrong</Typography>
      </CardContent>
    </Card>
  );
}

export default Error;
