import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import { reducer as reduxForm } from 'redux-form'

export default combineReducers({
    auth : authReducer,
    form : reduxForm
})