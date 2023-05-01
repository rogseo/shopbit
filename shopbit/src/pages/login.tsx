import React, { useContext, useEffect, useState } from 'react';
import { MyPage } from '../../components/common/types';
import NextLink from 'next/link';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

import { List, ListItem, TextField, Link, ThemeProvider } from '@mui/material';
import theme from '@/utils/palette';

import { actionTypes, StoreContext } from '../utils/Store';

export type UserSubmitForm = {
    email: string;
    password: string;
};

const LoginPage: MyPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const redirect = router.query.redirect as string; // login?redirect=/shipping
    const { state, dispatch } = useContext(StoreContext);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div
                className='container mx-auto relative bg-cover bg-center bg-no-repeat h-screen rounded-lg grid place-items-center'
                style={{ backgroundImage: 'url("/login.jpg")' }}
            >
                <div className='bg-slate-200/90 container xl:w-1/3 md:w-2/3 sm:w-5/6 rounded-lg py-12'>
                    <h1 className='text-4xl text-center'>Log in</h1>
                    <form
                        onSubmit={handleSubmit(async ({ email, password }) => {
                            try {
                                const { data } = await axios.post('/api/users/login', {
                                    email,
                                    password,
                                });
                                console.log(data);
                                dispatch({ type: actionTypes.USER_LOGIN, payload: data });
                                Cookies.set('userInfo', JSON.stringify(data));
                                router.push(redirect || '/');
                            } catch (err: any) {
                                console.log(err);
                            }
                        })}
                    >
                        <List className='px-5'>
                            <ListItem>
                                <Controller
                                    name='email'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: true,
                                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            id='email'
                                            label='Email'
                                            inputProps={{ type: 'email' }}
                                            error={Boolean(errors.email)}
                                            helperText={
                                                errors.email
                                                    ? errors.email.type === 'pattern'
                                                        ? 'Email is not valid'
                                                        : 'Email is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            id='password'
                                            label='Password'
                                            inputProps={{ type: 'password' }}
                                            error={Boolean(errors.password)}
                                            helperText={
                                                errors.password
                                                    ? errors.password.type === 'minLength'
                                                        ? 'Password length is more than 5'
                                                        : 'Password is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <button className='flex rounded-full bg-indigo-500 px-4 py-2 mt-4 mx-auto' type='submit'>
                                    <h1 className='text-lg text-white'>Log in</h1>
                                </button>
                            </ListItem>
                            <ListItem className='inline-flex justify-center'>
                                <p>Don't have an account?</p>
                                &nbsp;
                                <NextLink href={'signup'} passHref>
                                    <Link className='text-indigo-500 no-underline'>Sign up</Link>
                                </NextLink>
                            </ListItem>
                        </List>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default LoginPage;
LoginPage.Layout = 'Main';
