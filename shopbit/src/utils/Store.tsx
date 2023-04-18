import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";
import { LayoutKeys } from "../../components/common/Layouts";
import { MyAppProps } from "../../components/common/types";
import { IAuthUser } from "../../models/User";

type StateType = {
    userInfo: IAuthUser | null;

}

type ContextType = {
    state: StateType;
    dispatch: React.Dispatch<any>;
}

enum actionTypes {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
}

interface Actions {
    type: string;
    payload?: IAuthUser | string;
}
console.log(Cookies.get("userInfo"))
const initialState: StateType = {
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
                // cart: {
                //     ...state.cart,
                //     cartItems: [],
                //     shippingAddress: null,
                //     paymentMethod: "",
                // },
            };
        default:
            return state;
    }
}

const StoreProvider:React.FC<any> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
          {children}
        </StoreContext.Provider>
      );
}

export { StoreProvider,actionTypes, StoreContext };