import { GET_FRIENDS } from '../actions/types';

const initialState = []

export default function (state = initialState, action ) {
     switch(action.type) {
        case GET_FRIENDS:
            if (state.length !== action.payload.length) return action.payload
        default:
            return state
     }
}