import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './payment'

class Header extends React.Component{
    renderContent(){
        switch (this.props.auth) {
            case null :
                return 
            case false :
                return <li><a href="/auth/google">Login With GOOGLE</a></li>
            default :
                return [
                    <li key="payment"><Payment /></li>,
                    <li key="credits" style={{margin : "0 10px"}}>credit : {this.props.auth.credits}</li>,
                    <li key="logout"><a href="/api/logout">Logout</a></li>
                ]
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="brand-logo" to={this.props.auth ? '/surveys' : '/'}>Emaily</Link>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapState = ({ auth }) => {
    return { auth }
}

export default connect(mapState)(Header)
