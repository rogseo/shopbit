import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";
import { LayoutKeys } from "../../components/common/Layouts";
import { MyAppProps } from "../../components/common/types";
import { IAuthUser } from "../../models/User";
import { IProduct } from "../../models/Product";

export type ShippingAddressType = {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

type StateType = {
    userInfo: IAuthUser | null;
    cart: {
        cartItems: IProduct[] | [];
        shippingAddress: ShippingAddressType | null;
        paymentMethod: string | undefined;
    };

}

type ContextType = {
    state: StateType;
    dispatch: React.Dispatch<any>;
}

enum actionTypes {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    CART_ADD_ITEM = "CART_ADD_ITEM",
    CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
    SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS",
    SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD",
    CART_CLEAR = "CART_CLEAR"
}

interface Actions {
    type: string;
    payload?: IProduct | IAuthUser | ShippingAddressType | string;
}
console.log(Cookies.get("userInfo"))
const initialState: StateType = {
    cart: {
        cartItems: Cookies.get("cartItems")
            ? JSON.parse(Cookies.get("cartItems")!)
            : [],
        shippingAddress: Cookies.get("shippingAddress")
            ? JSON.parse(Cookies.get("shippingAddress")!)
            : {},
        paymentMethod: Cookies.get("paymentMethod")
            ? Cookies.get("paymentMethod")
            : "",
    },
    userInfo: Cookies.get("userInfo")
        // ? JSON.parse(Cookies.get("userInfo")!)
        ? Cookies.get("userInfo")
        : null,
}

const StoreContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state = initialState, action: Actions): StateType => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return { ...state, userInfo: action.payload as IAuthUser };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                userInfo: null,
                cart: {
                    ...state.cart,
                    cartItems: [],
                    shippingAddress: null,
                    paymentMethod: "",
                },
            };
        case actionTypes.CART_ADD_ITEM: {
            const newItem = action.payload as IProduct;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            Cookies.set("cartItems", JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case actionTypes.CART_REMOVE_ITEM: {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== (action.payload as IProduct)?._id
            );
            Cookies.set("cartItems", JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case actionTypes.CART_CLEAR:
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        case actionTypes.SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload as ShippingAddressType,
                },
            };
        case actionTypes.SAVE_PAYMENT_METHOD:
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload as string },
            };
        default:
            return state;
    }
}

const StoreProvider: React.FC<any> = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StoreContext.Provider>
    );
}

export { StoreProvider, actionTypes, StoreContext };