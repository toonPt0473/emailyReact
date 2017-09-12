import React from 'react';
import { reduxForm , Field } from 'redux-form';
import SurverField from './surveysField';
import { Link } from 'react-router-dom';
import validEmail from '../../utils/validateEmail';

const FIELD = [
    {name: 'title' , label: 'Survey Title'},
    {name: 'subject' , label: 'Survey Line'},
    {name: 'body' , label: 'Email Body'},
    {name: 'emails' , label: 'Email List'},
]

class SurveyForm extends React.Component{
    renderField(){
        return FIELD.map(({name , label}) => {
            return  <Field 
                        key={name}
                        name={name}
                        type="text"
                        component={SurverField}
                        label={label}
                    />
        })
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
                {this.renderField()}
                <Link to="/surveys" className="red btn-flat white-text" style={{paddingLeft:"10px" , paddingRight:"10px"}}>
                    Cancle
                    <i className="material-icons right">backspace</i>
                </Link>
                <button className="teal btn-flat right white-text" type="submit" style={{paddingLeft:"10px" , paddingRight:"10px"}}>
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>
        )
    }
}

function validate(values){
    const errors = {};
    FIELD.forEach(({ name }) => {
        if(!values[name]){
            errors[name] = `require ${name}`
        }
    })
    if(values.emails){
        errors.emails =  validEmail(values.emails)
    }

    return errors;
}

export default reduxForm({
    validate , 
    form : 'surveyform'
})(SurveyForm)
