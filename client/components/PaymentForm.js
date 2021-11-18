import React from 'react';
import { connect } from 'react-redux';
import { fetchPayment, addPayment, updatePayment } from '../store/payment';
import { Grid, TextField, Button, Select, MenuItem } from '@mui/material';

class PaymentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 'Visa',
      name: '',
      number: '',
      cvc: '',
      expDate: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchPayment();
    if (this.props.payment.id) {
      this.setState({
        type: this.props.payment.type,
        name: this.props.payment.name,
        number: this.props.payment.number,
        cvc: this.props.payment.cvc,
        expDate: this.props.payment.expDate,
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
    const payment = { ...this.state };
    if (this.props.payment.id) {
      this.props.updatePayment(guestOrderId, payment);
    } else {
      this.props.addPayment(guestOrderId, payment);
    }
  }

  render() {
    return (
      <form className="shipping_form" onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              label="Name on Card"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
              label="Type"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={'Visa'}>Visa</MenuItem>
              <MenuItem value={'MasterCard'}>MasterCard</MenuItem>
              <MenuItem value={'Discover'}>Discover</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              label="Credit Card No."
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cvc"
              value={this.state.cvc}
              onChange={this.handleChange}
              label="CVC"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="expDate"
              value={this.state.expDate}
              onChange={this.handleChange}
              label="Expiration Date"
              type="date"
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
    payment: state.payment,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPayment: () => dispatch(fetchPayment()),
    addPayment: (orderId, payment) => dispatch(addPayment(orderId, payment)),
    updatePayment: (orderId, payment) =>
      dispatch(updatePayment(orderId, payment)),
  };
};

export default connect(mapState, mapDispatch)(PaymentForm);
