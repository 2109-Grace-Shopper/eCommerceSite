import React from 'react';
import { Box, Grid } from '@mui/material';

const About = () => {
  return (
    <Box
      className="box"
      bgcolor="#E4FBFF"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1000 }}
    >
      <Grid className="about">
        <h1>Our Story</h1>
        <div>
          <p>
            Pierre's General Store has a proud history that spans as far back
            since the creation of the Stardew Valley community.
            <br />
            We take great pride in offering the best produce cultivated by our
            valley's very own talented farmers.
            <br />
            Choose from a variety of seeds, sapling trees, fertilizers for your
            own crops, quality ingredients, seasonal decor, and more.
            <br />
            We also change our stock seasonally, so be sure to stop by often for
            the latest goods we have to offer!
            <br />
            <br />
            Thanks for choosing Pierre's! We are definitely way better than
            JojaMart :)
          </p>
          <h3>Hours of Operation</h3>
          <p>
            Closed on Wednesdays
            <br />
            Open all other days from 9a - 5p
          </p>
        </div>
      </Grid>

      <h3>Ownership</h3>
      <Grid container spacing={2}>
        <Grid item xs>
          <img
            className="owner"
            src="https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/about/pierre1.png"
            alt="pierre"
          />
          <p>Pierre</p>
        </Grid>
        <Grid item xs>
          <img
            className="owner"
            src="https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/about/Caroline.png"
            alt="Caroline"
          />
          <p>Caroline</p>
        </Grid>
        <Grid item xs>
          <img
            className="owner"
            src="https://raw.githubusercontent.com/2109-Grace-Shopper/eCommerceSite/main/public/about/Abigail.png"
            alt="Abigall"
          />
          <p>Abigail</p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
