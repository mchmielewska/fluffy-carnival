import axios from 'axios';
import { GET_ERRORS, GET_FRIENDS, GET_PENDING_INVITES, ACCEPT_INVITE, DECLINE_INVITE, REMOVE_FRIEND } from './types';

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

export const getPendingInvites = (user) => dispatch => {
    axios.get('http://localhost:9090/friends/pending', user)
            .then(
                res => {
                dispatch({
                    type: GET_PENDING_INVITES,
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

export const acceptInvite = (token) => dispatch => {
    console.log(token)
    axios.get(`http://localhost:9090/friends/accept?inviteToken=${token}`)
            .then(
                res => {
                dispatch({
                    type: ACCEPT_INVITE,
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

export const declineInvite = (user, token) => dispatch => {
    axios.get(`http://localhost:9090/friends/decline?inviteToken=${token}`, user)
            .then(
                res => {
                dispatch({
                    type: DECLINE_INVITE,
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

export const removeFriend = (id) => dispatch => {

    axios.delete(`http://localhost:9090/friends/delete`, { data: { id: id }})
        .then(
            res => { 
                dispatch({
                    type: REMOVE_FRIEND,
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