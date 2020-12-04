import { DELETE_POST, GET_POSTS } from '../actions/types';

const initialState = []

export default function (state = initialState, action ) {
     switch(action.type) {
        case GET_POSTS:
            if (state.length !== action.payload.length || state.length === 0 || (JSON.stringify(state) !== JSON.stringify(action.payload)))
                return action.payload
            return state;
         case DELETE_POST:
             return {
                 ...state,
             }
         default: 
             return state;
     }
}