import { ADD_LIKE, REMOVE_LIKE, GET_LIKES } from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
       case ADD_LIKE:
            return [...state];
        case REMOVE_LIKE:
            return [...state];
        case GET_LIKES:
            if (state.length !== action.payload.length || state.length === 0 || (JSON.stringify(state) !== JSON.stringify(action.payload))) return action.payload;
            return state;
        default: 
            return state;
    }
}