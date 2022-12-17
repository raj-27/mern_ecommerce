import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constant/cartConstant";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (product) => product.id === item.id
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product) =>
                        product.id === isItemExist.id ? item : product
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
        default:
            return state;
    }
};