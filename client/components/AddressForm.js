import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

const AddressForm = () => {

  return (
    <form noValidate autoComplete="off" className="shipping_form">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" variant="outlined" fullWidth />
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
        <Button
          variant="contained"
          style={{ margin: 'auto', marginTop: '10px' }}
        >
          Save
        </Button>
      </Grid>
    </form>
  );
};

export default AddressForm;
