import { FETCH_USER } from '../action/types'

export default (state = null , action) => {
    switch (action.type) {
        case FETCH_USER : 
            return action.payload.data || false
        default:
            return state;
    }
}

