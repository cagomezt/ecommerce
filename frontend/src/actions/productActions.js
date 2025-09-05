import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

/**
 * Action creator to fetch the list of products from the backend API.
 * Dispatches actions to indicate the request status (loading, success, or failure).
 *
 * @function
 * @returns {Function} A thunk function that performs the asynchronous API call and dispatches actions.
 */
export const listProducts = () => async (dispatch) => {
    try {
        // Dispatch action to indicate product list request has started
        dispatch({type: PRODUCT_LIST_REQUEST})

        // Fetch product data from the backend API
        const {data} = await axios.get('/api/products') // API call to fetch products

        // Dispatch action to indicate product list was successfully fetched
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data // Pass the fetched product data as payload
        })
    } catch (error) {
        // Dispatch action to indicate there was an error fetching the product list
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message // Pass the error message as payload
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        // Dispatch action to indicate product list request has started
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        // Fetch product data from the backend API
        const {data} = await axios.get(`/api/products/${id}`) // API call to fetch products

        // Dispatch action to indicate product list was successfully fetched
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data // Pass the fetched product data as payload
        })
    } catch (error) {
        // Dispatch action to indicate there was an error fetching the product list
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message // Pass the error message as payload
        })
    }
}