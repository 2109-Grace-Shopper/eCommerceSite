import React from 'react';
import { Grid, TextField, Button, Select, MenuItem} from '@mui/material';

const PaymentForm = ()=> {
  return (
    <form noValidate autoComplete="off" className="shipping_form">
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <TextField label="Name on Card" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select label="Type" variant="outlined" fullWidth>
            <MenuItem value={'Visa'}>Visa</MenuItem>
            <MenuItem value={'MasterCard'}>MasterCard</MenuItem>
            <MenuItem value={'Discover'}>Discover</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Credit Card No." variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="CVC" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Expiration Date" type="date" variant="outlined" fullWidth/>
        </Grid>
        <Button variant="contained" style={{margin: 'auto', marginTop: '10px'}}>Save</Button>
      </Grid>
    </form>
  );
};

export default PaymentForm