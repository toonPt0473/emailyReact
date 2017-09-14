import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../action'

class Dashboard extends Component {

    componentDidMount(){
        this.props.getSurveyByUser();
    }

    renderContent(surveys){
        if(surveys == null){
            return <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
        }

        if(surveys.length === 0){
            return (
                <div>
                    <h5>You not have any SURVEY.Create new SURVEY click <Link to="/surveys/new">This</Link></h5>
                </div>
            )
        }

        return surveys.map(survey => {
            const emails = survey.recipients.map(({ email }) => email).toString()
            return (
                <div className="row" key={survey._id}>
                    <div className="col s12 m12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title center">Survey Title : {survey.title}</span>
                                <p>Email Subject : <strong className="right">{survey.subject}</strong></p>
                                <p>Email Body : <strong className="right">{survey.body}</strong></p>
                                <p>Send Date : <strong className="right">{survey.dateSend}</strong></p>
                                <p>Recipients List : <strong className="right">{emails}</strong></p>
                                <p>Vote YES : <strong className="right">{survey.yes}</strong></p>
                                <p>Vote NO : <strong className="right">{survey.no}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div>
                <h1>Dashboard</h1>
                {this.renderContent(this.props.survey)}
                
                <div className="fixed-action-btn">
                    <Link to="/surveys/new" className="btn-floating btn-large red">
                        <i className="material-icons">add_circle_outline</i>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapState({ survey }){
    return {
        survey
    }
}

export default connect(mapState , action)(Dashboard)