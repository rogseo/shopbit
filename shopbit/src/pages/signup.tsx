import React, { useContext, useEffect } from "react";
import { StoreContext } from "../utils/Store";
import { MyPage } from "../../components/common/types";
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

// Swell
import { swellClient } from '@/swell/connection';
import { createAccount } from '@/swell/mutations';
import { checkTokenValidity, getAllProducts } from '@/swell/queries';

import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
} from "@mui/material";


export type UserSubmitForm = {
    name: string;
    email: string;
    password: string;
}



const SignupPage: MyPage = () => {

    const { state, dispatch } = useContext(StoreContext);
    const { userInfo } = state; 
    const router = useRouter();
    const redirect = router.query.redirect as string;

    useEffect(() => {
        if (userInfo) {
          router.push("/");
        }
      }, []);

    const { handleSubmit, control, formState: { errors } } = useForm();
    console.log(userInfo)


    return (
        <>

            <form onSubmit={handleSubmit(async ({ name, email, password }) => {
                try {
                    const { data } = await axios.post("/api/users/register", {
                        name,
                        email,
                        password,
                      });
                      dispatch({ type: "USER_LOGIN", payload: data });
                      Cookies.set("userInfo", data);
                      router.push(redirect || "/");

                } catch (err: any) {
                    console.log(err.response.data)
                }
            })} >
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List>
                    <ListItem>

                        <Controller

                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    inputProps={{ type: "name" }}
                                    error={Boolean(errors.name)}

                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
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
                            Register
                        </Button>
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
export default SignupPage;
SignupPage.Layout = "Main"