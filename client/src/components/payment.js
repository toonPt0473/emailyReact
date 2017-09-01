import React , { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../action'

class Payment extends Component{
    render(){
        return(
            <StripeCheckout 
                name="Emaily"
                description="collect feedback form your users"
                amount={500}
                token={
                    token => this.props.handleToken(token)
                }
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                bitcoin
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null , { handleToken })(Payment)