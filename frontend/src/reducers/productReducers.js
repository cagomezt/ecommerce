/**
 * Reducer function to manage the state of the product list.
 * Handles actions related to fetching, successfully retrieving, or failing to retrieve the product list.
 *
 * @param {Object} state - The current state of the product list. Defaults to an object with an empty products array.
 * @param {Object} action - The action dispatched to the reducer. Contains the type and optional payload.
 * @returns {Object} The updated state based on the action type.
 */
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'


export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            // Action dispatched when the product list is being fetched
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            // Action dispatched when the product list is successfully fetched
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            // Action dispatched when there is an error fetching the product list
            return {loading: false, error: action.payload}
        default:
            // Return the current state if the action type is not recognized
            return state
    }
}

export const productDetailsReducer = (state = {products: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            // Action dispatched when product details are being fetched
            return {loading: true, ...state}
        case PRODUCT_DETAILS_SUCCESS:
            // Action dispatched when product details are successfully fetched
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            // Action dispatched when there is an error fetching product details
            return {loading: false, error: action.payload}
        default:
            // Return the current state if the action type is not recognized
            return state
    }
}

export default productListReducer