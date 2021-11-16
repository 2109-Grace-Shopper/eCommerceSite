import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderHistory } from '../store/orderHistory';
import { Grid, TextField } from '@mui/material';

class OrderHistory extends React.Component {
    constructor() {
        super();
        this.getTotal = this.getTotal.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrderHistory();
    }

    getTotal(singleOrder) {
        return singleOrder.reduce((Total, item) => Total + item.subTotal, 0)
    }

    render(){
        const orders = this.props.orderHistory
        return (
            <div id="history">
            {orders.map((singleOrder) => (
                <div>
                    <br/>
                    <h2 className="order_number">Order Number: xxxxxxxxxx</h2>
                    {singleOrder.map((item => (
                        <div key={item.product.id}>
                        <div className="order_history">
                            <img id="history_img" src={item.product.imageUrl} width="20px" height="20px"/>
                            <p>{item.product.name} x {item.quantity} = <img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png"/>{item.subTotal}g</p>
                        </div>
                        </div>
                    )))}
                    <h3 className="order_total">Total: <img src="https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png"/>{this.getTotal(singleOrder)}g</h3>
                </div>
            ))}
            </div>
        )
    }
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
