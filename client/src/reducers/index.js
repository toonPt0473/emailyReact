import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import { reducer as reduxForm } from 'redux-form';
import surveyReducers from './surveys_reducer';

export default combineReducers({
    auth : authReducer,
    form : reduxForm,
    survey : surveyReducers
})