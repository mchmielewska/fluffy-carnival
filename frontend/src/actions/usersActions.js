import axios from 'axios';
import { GET_ERRORS, GET_USERS, GET_CURRENT_USER } from './types';

export const getUsers = (user) => dispatch => {
    axios.get(`http://localhost:9090/users/find`, user)
            .then(
                res => {
                dispatch({
                    type: GET_USERS,
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

export const getCurrentUser = (user) => dispatch => {
    axios.get('http://localhost:9090/users/me', user)
            .then(
                res => {
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.res
                });
            });
}

export const patchUser = (user) => dispatch => {
    axios.patch('http://localhost:9090/users/update', user)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.res
        });
    });
}