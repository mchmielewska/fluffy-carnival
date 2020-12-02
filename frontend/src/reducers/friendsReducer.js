import { ACCEPT_INVITE, DECLINE_INVITE, GET_FRIENDS, GET_PENDING_INVITES, REMOVE_FRIEND, SEND_INVITE } from '../actions/types';

const initialState = {
    friendsList: [],
    pending: []
}

export default function (state = initialState, action ) {
     switch(action.type) {
         case SEND_INVITE:
            return {
                ...state
            }
        case GET_FRIENDS:
            if (state.friendsList === undefined || state.friendsList.length !== action.payload.length)
                return {
                    ...state,
                    friendsList: action.payload
                }
            return state;                
        case GET_PENDING_INVITES:
            if (state.pending.length !== action.payload.length) 
                return {
                    ...state,
                    pending: action.payload
                }  
                return state;
        case ACCEPT_INVITE:
            return {
                ...state
            }
        case DECLINE_INVITE:
            return {
                ...state
            }
        case REMOVE_FRIEND:
            return {
                ...state
            }
        default:
            return state
     }
}