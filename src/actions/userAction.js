import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    ROOM_REQUEST,
    ROOM_SUCCESS,
    ROOM_FAIL,
    GET_chat_REQUEST,
    GET_chat_SUCCESS,
    GET_chat_FAIL,
    POST_MESSAGE_SUCCESS,
    ADD_MULTIPLE_MESSAGES,
    CHECK_LOGGIN,

} from '../constants/userConstants';
import axios from 'axios';

export const loginUser = (props) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_USER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",

            },
        }

        const { data } = await axios.post(
            'https://server-1-y6880112.deta.app/api/v1/verifyUser',
            props,
            config
        );
        
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user,
        });
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', true);
        
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const setRoom = (props) => async (dispatch) => {
    try {

        dispatch({ type: ROOM_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",

            },
        }

        const { data } = await axios.post(
            'https://server-1-y6880112.deta.app/api/v1/verifyRoom',
            props,
            config
        );
        
        dispatch({
            type: ROOM_SUCCESS,
            payload: data.room,
        });
        localStorage.setItem('room', JSON.stringify(data.room));
        localStorage.setItem('isRoom',true);
    } catch (error) {
        dispatch({
            type: ROOM_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getMessages = (props) => async (dispatch) => {
    try {
        
        dispatch({ type: GET_chat_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",

            },
        }
        
        const { data } = await axios.post(
            'https://server-1-y6880112.deta.app/api/v1/getChats',
            props,
            config
            );
            let createdAt=data.chat[data.chat.length-1].createdAt;
            dispatch({
                type: GET_chat_SUCCESS,
                payload: data.chat,
                createdAt: createdAt
            });
            
        } catch (error) {
            dispatch({
                type: GET_chat_FAIL,
                payload: error.response.data.message,
            });
        }
};

export const postMessage = (roomid, msg, username) => async (dispatch) => {
    try
    {
        const response = await axios.post('https://server-1-y6880112.deta.app/api/v1/postChats', {roomid, msg,username});
        const newMessage = response.data.chat;
        // console.log(newMessage.createdAt);
        let createdAt=newMessage.createdAt;
        dispatch({type: POST_MESSAGE_SUCCESS, payload: newMessage,createdAt: createdAt});
    } 
    catch (error)
    {
        console.error('Error posting message:', error);
    }
};

export const getNewMessages = (roomid,createdAt) => async (dispatch) => {
    try
    {
        const response = await axios.post('https://server-1-y6880112.deta.app/api/v1/getNewChats', {createdAt,roomid });
        const newMessage = response.data.chat;
        // console.log(newMessage);
        if(newMessage.length>0)
            createdAt=newMessage[newMessage.length-1].createdAt;
        // console.log("ingetmessageuseracton",createdAt);
        dispatch({type: ADD_MULTIPLE_MESSAGES, payload: newMessage,createdAt:createdAt});
    } 
    catch (error) 
    {
        console.error('Error posting message:', error);
    }
};

export const checkLoggin = () => async (dispatch) => {
    const isAuthenticated=localStorage.getItem('isAuthenticated');
    const isRoom=localStorage.getItem('isRoom');
    let val=false;
    if (isAuthenticated === 'true' && isRoom === 'true')
        val=true;
    dispatch({
        type: CHECK_LOGGIN,
        payload: val
    });
};