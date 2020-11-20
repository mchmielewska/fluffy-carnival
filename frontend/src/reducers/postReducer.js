import { DELETE_POST, GET_POSTS } from '../actions/types';

const initialState = []

export default function (state = initialState, action ) {
     switch(action.type) {
        case GET_POSTS:
            if (state.length === action.payload.length || state.length === 0)
                return action.payload
            return state;
        //  case DELETE_POST:
        //      return {
        //          ...state,
        //          isAuthenticated: !isEmpty(action.payload),
        //          user: action.payload
        //      }
         default: 
             return state;
     }
}