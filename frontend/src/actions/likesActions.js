import axios from 'axios';
import { ADD_LIKE, REMOVE_LIKE, GET_LIKES, GET_ERRORS } from './types';

export const addLike = (id) => dispatch => {
    axios.post(`http://localhost:9090/posts/like?id=${id}`)
    .then(res => {
        dispatch({
            type: ADD_LIKE,
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

export const removeLike = (id) => dispatch => {
    console.log('deleting')
    axios.delete(`http://localhost:9090/posts/unlike?id=${id}`)
    .then(res => {
        dispatch({
            type: REMOVE_LIKE,
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

export const getLikes = () => dispatch => {
    axios.get(`http://localhost:9090/posts/likes`)
    .then(
        res => {
            dispatch({
                type: GET_LIKES,
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