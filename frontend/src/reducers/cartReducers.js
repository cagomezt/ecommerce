import {CART_ADD_ITEM} from "../constants/cartConstants";

// In your cart reducer file
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload; // The item to be added to the cart
            const existItem = state.cartItems.find(x => x.product === item.product); // Check if the item already exists in the cart

            if (existItem) {
                // If the item already exists, update its quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                };
            } else {
                // If the item does not exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        // other cases...
        default:
            return state;
    }
}