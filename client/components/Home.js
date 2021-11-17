import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Item } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const Home = (props) => {
  const { firstName } = props;

  return (
    <Container justify="center" className="home">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h1>
            Give Yourself <br />A New Way to Buy!
          </h1>
          <p>
            Welcome {firstName} to Pierre's General Store!
            <br />
            Our new eCommerce store is online, try the new features in our
            website, you will be pleasantly surprised. Fall season items are
            available now!
          </p>
          <Button
            endIcon={<ArrowRightAltIcon />}
            href="/products"
            variant="contained"
          >
            Explore now{' '}
          </Button>
        </Grid>
        <Grid item xs={8}>
          <img
            className="stardew"
            src="home/StardewValley.png"
            alt="Stardew Valley"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
