import axios from 'axios';
import {CART_ADD_ITEM} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`); // Fetch product details from the backend API

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id, // Product ID
            name: data.name, // Product name
            image: data.image, // Product image URL
            price: data.price, // Product price
            countInStock: data.countInStock, // Available stock count
            qty // Quantity to add to the cart
        }
    });

    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}