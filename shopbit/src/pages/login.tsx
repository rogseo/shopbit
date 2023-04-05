import React from "react";
import { MyPage } from "../../components/common/types";
import Link from 'next/link';


import { GraphQLClient, gql } from 'graphql-request';


const client = new GraphQLClient("https://shop-bit.swell.store/graphql")

// Set a single header
client.setHeader('authorization', "pk_kginZY2nGI2TCevgCw5ZvvitVye5R3Gz")

const query = gql`
    mutation login {
      loginAccount(email: "awoelf@outlook.com", password: "password1") {
        __typename
      }
    }
  `;

export type UserSubmitForm={
  email:string;
  password:string;
}



const LoginPage: MyPage = () => {

  

  const submitHandler = async ({
    email,
    password,
  }:UserSubmitForm)=>{
    // if(password !== confirmPassword){
    //   return;
    // }
    try{
      const data = await client.request(query)
      console.log(JSON.stringify(data));
     
    } catch (err:any){

    }
  };
 
  return <>
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl my-8">
            <h2><Link href={"/signup"}>← Go to Signup</Link></h2>
            <form onSubmit={submitHandler}>
              <div className="flex-row space-between my-2">
                <label htmlFor="email">Email address:</label>
                <input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                // onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                // onChange={handleChange}
                />
              </div>
              {/* {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null} */}
              <div className="flex-row flex-end">
                <button type="submit">Submit</button>
              </div>
            </form>
          </h1>
        </div>
      </div>
    </div>
  </>;
};
export default LoginPage;
LoginPage.Layout = "Main"