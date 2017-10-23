import axios from 'axios';
import { FETCH_USER , FETCH_SURVEYS } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type : FETCH_USER , payload : res})
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe' , token);
    dispatch({ type : FETCH_USER , payload : res})    
} 

export const surveySendForm = (values , history) => async dispatch => {
    const res = await axios.post('/api/surveys/' , values);
    history.push('/surveys')
    dispatch({type : FETCH_USER , payload : res})
}

export const getSurveyByUser = () => async dispatch => {
    const res = await axios.get('/api/dashboard')
    dispatch({type : FETCH_SURVEYS , payload : res})
}

export const deleteSurvey = (id) => async dispatch => {
    await axios.post("/api/deletesurvey" , id)
    const res = await axios.get('/api/dashboard')
    dispatch({type : FETCH_SURVEYS , payload : res})
}
