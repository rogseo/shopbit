import React from "react";
import { MyPage } from "../../components/common/types";
const CartPage: MyPage = () => {
  return  <>
    
  <div className="container">
    <div className="grid place-content-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl my-8">
          Cart
        </h1>
      </div>
    </div>
  </div></>;
};
export default CartPage;
CartPage.Layout = "Main"