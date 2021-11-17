import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { connect } from 'react-redux';
import { fetchAddress, addAddress, updateAddress} from '../store/address';

class AddressForm extends React.Component {
  constructor(){
    super()
    this.state = {
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: 10000
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAddress();
    if(this.props.address.email){
      this.setState ({
        email: this.props.address.email,
        street: this.props.address.street,
        city: this.props.address.city,
        state: this.props.address.state,
        zipCode: this.props.address.zipCode
      })
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault();
    let guestOrderId = window.localStorage.orderId;
    const address = {...this.state}
    if(this.props.address.email){
      this.props.updateAddress(address)
    } else {
      this.props.addAddress(guestOrderId, address);
    }
  }

  render(){
    return (
      <form className="shipping_form" onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="email" value={this.state.email} onChange={this.handleChange} label="Email" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField name="street" value={this.state.street} onChange={this.handleChange} label="Street Address" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="zipCode" value={this.state.zipCode} onChange={this.handleChange} label="Postal/Zip Code" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="city" value={this.state.city} onChange={this.handleChange} label="City" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="state" value={this.state.state} onChange={this.handleChange} label="Province/State" variant="outlined" fullWidth/>
          </Grid>
          <Button
            variant="contained"
            style={{ margin: 'auto', marginTop: '10px' }} type="submit"
          >
            Save
          </Button>
        </Grid>
      </form>
    );
  };
}

const mapState = (state) => {
  return{
    address: state.address
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddress: () => dispatch(fetchAddress()),
    addAddress: (orderId, address) => dispatch(addAddress(orderId, address)),
    updateAddress: (address) => dispatch(updateAddress(address))
  }
}

export default connect(mapState, mapDispatch)(AddressForm);
