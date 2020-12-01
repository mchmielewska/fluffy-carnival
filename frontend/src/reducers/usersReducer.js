import { GET_CURRENT_USER, GET_USERS } from '../actions/types';

const initialState = {}

export default function (state = initialState, action ) {
     switch(action.type) {
        case GET_CURRENT_USER:
            if (state.currentUser?.user.name == undefined || state.currentUser.user.name !== action.payload.user.name )
                return {
                    ...state,
                    currentUser: action.payload
                }
            return state;
        case GET_USERS:
            if (state.all === undefined)
                return {
                    ...state,
                    all: action.payload
                }
         default: 
             return state;
     }
}

// state.currentUser.posts !== action.payload.posts