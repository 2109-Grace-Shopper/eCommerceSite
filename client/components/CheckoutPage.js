import React from 'react';
import { connect } from 'react-redux';
import { clearItems } from '../store/order';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { Box, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

class CheckoutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      allClear: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let guestOrderId = window.localStorage.orderId;
    if (this.props.address.id && this.props.payment.id) {
      this.setState({ allClear: true });
      this.props.clearItems(Number(guestOrderId));
    } else {
      this.setState({ allClear: false });
    }
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
          {!this.state.allClear && (
            <h3>
              Uh Oh! Something went wrong! Make sure all your information is
              correct and SAVE it!
            </h3>
          )}
        </div>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    address: state.address,
    payment: state.payment,
  };
};

const mapDispatch = (dispatch) => ({
  clearItems: (orderId) => dispatch(clearItems(orderId)),
});

export default connect(mapState, mapDispatch)(CheckoutPage);
