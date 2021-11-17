import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearItems } from '../store/order';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { Box, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

class CheckoutPage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let guestOrderId = window.localStorage.orderId;
    this.props.clearItems(Number(guestOrderId));
  }

  render() {
    return (
      <Box
        className="shiping_box"
        bgcolor="#E4FBFF"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1000 }}
      >
        <div className="checkout_page">
          <h1>Shipping Address</h1>
          <AddressForm />
          <br />
          <h1>Payment Information</h1>
          <PaymentForm />
          <br />
          <Link to="/confirm">
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRightAltIcon />}
              size="large"
              onClick={this.handleSubmit}
              style={{ float: 'right' }}
            >
              Confirm Order
            </Button>
          </Link>
        </div>
      </Box>
    );
  }
}

const mapDispatch = (dispatch) => ({
  clearItems: (orderId) => dispatch(clearItems(orderId)),
});

export default connect(null, mapDispatch)(CheckoutPage);
