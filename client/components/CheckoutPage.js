import { Box, Button, Typography, FormControl } from '@mui/material';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import AddressForm from "./AddressForm";

const CheckoutPage = () => {
  return (
    <Box
        className="shiping_box"
        bgcolor="#E4FBFF"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1000 }}>
        <div className="checkout_page">
            <h1>Shipping Address</h1>
            <AddressForm/>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowRightAltIcon />}
                size="large"
                >
                Continue
            </Button>
        </div>
    </Box>
  );
};

export default CheckoutPage;