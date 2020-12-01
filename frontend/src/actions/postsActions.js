import axios from 'axios';
import { GET_ERRORS, GET_POSTS, DELETE_POST } from './types';

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

export const deletePost = (id) => dispatch => {

    axios.delete(`http://localhost:9090/posts/delete`, { data: { id: id }})
        .then(
            res => { 
                dispatch({
                    type: DELETE_POST,
                    payload: res.data
                });
                console.log(res)
            }
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res
            });
        });
    
}

export const patchPost = (id, post, history) => dispatch => {
    axios.patch(`http://localhost:9090/posts/update?id=${id}`, post)
    .then(res => {
        history.push('/postupdated');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.res
        });
    });
}