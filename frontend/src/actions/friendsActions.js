import axios from 'axios';
import { GET_ERRORS, GET_FRIENDS } from './types';

export const getFriendsList = (user) => dispatch => {
    axios.get('http://localhost:9090/friends/all', user)
            .then(
                res => {
                dispatch({
                    type: GET_FRIENDS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.res
                });
            });
}