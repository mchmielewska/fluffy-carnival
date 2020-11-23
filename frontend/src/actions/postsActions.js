import axios from 'axios';
import { GET_ERRORS, GET_POSTS } from './types';

export const getPosts = (user) => dispatch => {
    axios.get('http://localhost:9090/posts/find?privacy=all', user)
            .then(
                res => {
                dispatch({
                    type: GET_POSTS,
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

export const addPost = (post, history) => dispatch => {
    axios.post('http://localhost:9090/posts/add', post)
        .then(
            res => {
                history.push('/postadded');
            }
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res
            });
        });
    
}