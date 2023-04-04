import React from "react";
import { MyPage } from "../../components/common/types";
const LoginPage: MyPage = () => {
  return  <>
    
  <div className="container">
    <div className="grid place-content-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl my-8">
          Login
        </h1>
      </div>
    </div>
  </div></>;
};
export default LoginPage;
LoginPage.Layout = "Main"