import React from 'react';
import SurveysForm from './surveysForm';
import SurveyFormReview from './surveyFormReview';
import { reduxForm } from 'redux-form';

class NewSurvey extends React.Component{
    constructor(){
        super();
        this.state = {
            formReviewVisible : false,
        }
    }
    renderContent(){
        if(this.state.formReviewVisible){
            return <SurveyFormReview 
                    onCancel={() => this.setState({formReviewVisible : false})}
                    />
        }
        return <SurveysForm 
                    onSurveySubmit={() => this.setState({formReviewVisible : true})} 
                />
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form : 'surveyform'
})(NewSurvey);