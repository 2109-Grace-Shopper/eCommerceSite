import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderHistory } from '../store/orderHistory';
import { Grid, TextField } from '@mui/material';

const OrderHistory = () => {
  return <div>Hi! This is order history</div>;
};

const mapState = (state) => {
  return {
    orderHistory: state.orderHistory,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderHistory: () => dispatch(fetchOrderHistory()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
