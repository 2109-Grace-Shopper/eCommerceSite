import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { Container, Box, Grid } from '@mui/material';

/**
 * COMPONENT
 */
export const About = (props) => {
  const { firstName } = props

  return (
      <Container>
        <Box className="box" bgcolor="#E4FBFF" justifyContent="center" alignItems="center">
        <Grid>
            <h1>Our Story</h1>
            <div>
                <p>Pierre's General Store sells various seeds, saplings, fertilizer, ingredients and other useful items. As well as selling those items, Pierre also buys foraged items, crops, artisan goods, cooked dishes, and animal products from the player, which avoids waiting overnight for shipping. Some products in stock, namely seeds, will vary from season to season and others are in-stock year-round. Pierre's main competitor in the valley is JojaMart.</p>
                <p>Pierre's General Store is normally open most days at 9am, three hours after the player wakes up, and closes at 5pm. The player can enter the building until 9pm, but Pierre leaves the sales counter at 5pm every day, so the shop cannot actually be used to purchase or sell goods after 5pm. This is because the building also serves as Pierre's family home.</p>
            </div>  
            </Grid>
    
        <h3>Ownership</h3>  
        <Grid container spacing={2} >
            <Grid item xs>
                <img className="owner" src="./pierre1.png" alt="pierre"/>
                <p>Pierre</p>
            </Grid>
            <Grid item xs>
                <img className="owner" src="./Caroline.png" alt="Caroline"/>
                <p>Caroline</p>
            </Grid>
            <Grid item xs>
                <img className="owner" src="./Abigail.png" alt="Abigall"/>
                <p>Abigail</p>
            </Grid>
        </Grid>
        </Box>
    
      </Container>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(About);
