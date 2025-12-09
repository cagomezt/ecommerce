/**
 * This file sets up and exports a Redux store using Redux Toolkit's `configureStore` method.
 *
 * The store is configured with:
 * - An empty `reducer` object: This is where you can add your slice reducers.
 * - An empty `preloadedState` object: This can be used to initialize the store with a predefined state.
 *
 * Redux Toolkit automatically includes middleware like Redux Thunk by default,
 * so no additional middleware configuration is necessary unless custom middleware is required.
 */

import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit'
import {productListReducer, productDetailsReducer} from './reducers/productReducers' // Import your product slice reducers here
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'


const rootReducer = combineReducers({
    productList: productListReducer, // Add your slice reducers to the combined reducer
    productDetails: productDetailsReducer, // Add your slice reducers to the combined reducer
    cart: cartReducer, // Add the cart reducer to manage cart state
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}; // Initialize the state with cart items from localStorage

/**
 * Creates and configures the Redux store.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore} The configured Redux store.
 */
const store = configureStore({
    reducer: rootReducer, // Add your slice reducers here
    preloadedState: initialState,
});

export default store