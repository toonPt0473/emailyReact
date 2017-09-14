import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = ({ auth }) => {
    const renderContent = () => {
        if(auth){
            return (
                <div><Link to="/surveys" className="red-text">go to your dashboard</Link></div>
            )
        }
    }

    return(
        <div style={{textAlign : 'center'}}>
            <h1><strong className="blue-text lighten-5">Emaily</strong></h1>
            <h5 className="blue-text">collect feedback form your users</h5>
            {renderContent()}
        </div>
    )
}

function mapState({ auth }){
    return { auth }
}

export default connect(mapState)(Landing)