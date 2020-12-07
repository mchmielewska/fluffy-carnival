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

export const patchUser = (user, history) => dispatch => {
    axios.patch('http://localhost:9090/users/update', user)
    .then(res => {
        history.push('/userupdated');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.res
        });
    });
}

export const patchPassword = (data, history) => dispatch => {
    axios.patch('http://localhost:9090/users/changepass', data)
    .then(res => {
        history.push('/userupdated');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.res
        });
    });
}


export const patchProfileImage = (image, history) => dispatch => {
    console.log("patchProfileImage image", image);
    axios.post('http://localhost:9090/users/profileimage', image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }} 
    )
    .then(res => {
        history.push('/userupdated');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.res
        });
    });
}