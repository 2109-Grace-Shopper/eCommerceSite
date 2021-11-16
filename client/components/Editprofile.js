import React from 'react';
import { Grid, TextField } from '@mui/material';

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
          <TextField label="Address line 1" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address line 2" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Postal/Zip Code" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Province/State" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Country" variant="outlined" fullWidth />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfile;