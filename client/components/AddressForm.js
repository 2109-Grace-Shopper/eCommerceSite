import React from 'react';
import { connect } from 'react-redux';
import { fetchAddress, addAddress, updateAddress } from '../store/address';
import { Grid, TextField, Button } from '@mui/material';

class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchAddress();
    if (this.props.address.id) {
      this.setState({
        email: this.props.address.email,
        street: this.props.address.street,
        city: this.props.address.city,
        state: this.props.address.state,
        zipCode: this.props.address.zipCode,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let guestOrderId = window.localStorage.orderId;
    const address = { ...this.state };
    if (this.props.address.id) {
      this.props.updateAddress(guestOrderId, address);
    } else {
      this.props.addAddress(guestOrderId, address);
    }
  }

  render() {
    return (
      <form className="shipping_form" onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="street"
              value={this.state.street}
              onChange={this.handleChange}
              label="Street Address"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
              label="Postal/Zip Code"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              label="City"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
              label="Province/State"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Button
            variant="contained"
            style={{ margin: 'auto', marginTop: '10px' }}
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    address: state.address,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAddress: () => dispatch(fetchAddress()),
    addAddress: (orderId, address) => dispatch(addAddress(orderId, address)),
    updateAddress: (orderId, address) =>
      dispatch(updateAddress(orderId, address)),
  };
};

export default connect(mapState, mapDispatch)(AddressForm);
