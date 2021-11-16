import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

const EditProfile = ()=> {
  return (
    <form noValidate autoComplete="off" className="shipping_form">
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <TextField label="First Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" variant="outlined" fullWidth />
        </Grid>
        <Button variant="contained" style={{margin: 'auto', marginTop: '10px'}}>Save</Button>
      </Grid>
    </form>
  );
};

export default EditProfile;