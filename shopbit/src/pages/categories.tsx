import React from "react";
import { MyPage } from "../../components/common/types";
const CategoriesPage: MyPage = () => {
  return  <>
    
  <div className="container">
    <div className="grid place-content-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl my-8">
          categories
        </h1>
      </div>
    </div>
  </div></>;
};
export default CategoriesPage;
CategoriesPage.Layout = "Main";