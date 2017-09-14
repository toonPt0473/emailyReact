import React from 'react';
import { connect } from 'react-redux';
import { FIELD } from './formField';
import { surveySendForm } from '../../action';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel , formValue , surveySendForm , history}) => {
    const renderContent = FIELD.map(({ name , label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <p>{formValue[name]}</p>
            </div>
        )
    })

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {renderContent}
            <button onClick={onCancel} className="red white-text btn-flat">Back</button>
            <button className="green btn-flat right white-text" onClick={() => surveySendForm(formValue , history)}> 
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapProps({ form }){
    return { 
        formValue : form.surveyform.values
    }
}

export default connect(mapProps , { surveySendForm })(withRouter(SurveyFormReview))