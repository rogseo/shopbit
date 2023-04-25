import React, { useContext, useEffect, useState } from "react";
import { MyPage } from "../../components/common/types";
import NextLink from "next/link";
import { GraphQLClient } from 'graphql-request';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link
} from "@mui/material";

import { actionTypes, StoreContext } from "../utils/Store";


export type UserSubmitForm = {
  email: string;
  password: string;
}



const LoginPage: MyPage = () => {


  const { handleSubmit, control, formState: { errors } } = useForm();

  const router = useRouter();
  const redirect = router.query.redirect as string; // login?redirect=/shipping
  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;
  
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);


  return (
    <>

      <form onSubmit={handleSubmit(async ({ email, password }) => {
        try {
          const { data } = await axios.post("/api/users/login", {
            email,
            password,
          });
          console.log(data);
          dispatch({ type: actionTypes.USER_LOGIN, payload: data });
          Cookies.set("userInfo", JSON.stringify(data));
          router.push(redirect || "/");

        } catch (err: any) {
          console.log(err)
        }
      })} >
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>

            <Controller

              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
          Don&apos;t have an account? &nbsp;;
            <NextLink href={"signup"} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>

        </List>
      </form>
    </>
  );
  {/* <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl my-8">
            <h2><Link href={"/signup"}>← Go to Signup</Link></h2>
            <form onSubmit={handleSubmit(onSubmit)} >
              <label htmlFor="email">Email address:</label>
              <input
                {...register("email")} />

              <label htmlFor="pwd">Password:</label>
              <input {...register("password")} />

              <button type="submit"
                onSubmit={handleSubmit(onSubmit)}
                onClick={handleSubmit(onSubmit)}
              >Submit</button>

            </form>
          </h1>
        </div>
      </div>
    </div> */}

};
export default LoginPage;
LoginPage.Layout = "Main"