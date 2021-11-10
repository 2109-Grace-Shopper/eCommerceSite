import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      {/* <h3>Welcome, {username}</h3> */}
      <Button variant="contained">Hello World</Button>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
