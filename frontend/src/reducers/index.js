import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {myOrdersReducer,newOrderReducer,orderDetailsReducer,} from "./orderReducer";
import { productReducers, productDetailReducers } from "./productReducer";
import {forgetPasswordReducer,profileReducer,userReducer,} from "./userReducer";
export const reducers = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    products: productReducers,
    cart: cartReducer,
    productDetail: productDetailReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
});

export let initalState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) :
            [],
        shippingInfo: localStorage.getItem("shippingInfo") ?
            JSON.parse(localStorage.getItem("shippingInfo")) :
            {},
    },
};