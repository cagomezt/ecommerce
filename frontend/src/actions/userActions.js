import axios from "axios";
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post
        (
            '/api/users/login/',
            {'username':email, 'password': password},
            config
        )   // API call to login user

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data // Pass the fetched
        })

        localStorage.setItem('userInfo', JSON.stringify(data)) // Save user info to local storage


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message // Pass the error message as payload
        })

    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post
        (
            '/api/users/register/',
            {'username':email, 'password': password},
            config
        )   // API call to login user

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data // Pass the fetched
        })

        localStorage.setItem('userInfo', JSON.stringify(data)) // Save user info to local storage


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message // Pass the error message as payload
        })

    }
}