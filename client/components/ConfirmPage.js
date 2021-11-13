import React from 'react';
import {connect} from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Grid } from '@mui/material';

/**
 * COMPONENT
 */
export const Confirm = props => {
  const { firstName } = props

  return (
    <Box
      className="box"
      bgcolor="#E4FBFF"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1000 }}>
        <CheckCircleOutlineIcon id="confirm_icon"/>
        <h1>A big thank you!</h1>
        <h3>We've received your order</h3>
        <h3>Your order number is: XO032849234</h3>
        <img className="confirm_img"
            src="confirmation/confirm.png"
            alt="confirm"
          />
    </Box>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
}

export default connect(mapState)(Confirm)