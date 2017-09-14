import { FETCH_SURVEYS } from '../action/types'

export default (state = null , action) => {
    switch (action.type) {
        case FETCH_SURVEYS : 
            return action.payload.data || false
        default:
            return state;
    }
}

