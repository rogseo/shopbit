import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../utils/Store';
import { MyPage } from '../../components/common/types';
import NextLink from 'next/link';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { List, ListItem, TextField, Link, ThemeProvider } from '@mui/material';
import theme from '@/utils/palette';

export type UserSubmitForm = {
    name: string;
    email: string;
    password: string;
};

const SignupPage: MyPage = () => {
    const { state, dispatch } = useContext(StoreContext);
    const { userInfo } = state;
    const router = useRouter();
    const redirect = router.query.redirect as string;

    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    console.log(userInfo);

    return (
        <ThemeProvider theme={theme}>
            <div
                className='container mx-auto relative bg-cover bg-center bg-no-repeat h-screen rounded-lg grid place-items-center'
                style={{ backgroundImage: 'url("/signup.jpg")' }}
            >
                <div className='bg-slate-200/90 container xl:w-1/3 md:w-2/3 sm:w-5/6 rounded-lg py-12'>
                    <h1 className='text-4xl text-center'>Sign up</h1>
                    <form
                        onSubmit={handleSubmit(async ({ name, email, password }) => {
                            try {
                                const { data } = await axios.post('/api/users/register', {
                                    name,
                                    email,
                                    password,
                                });
                                dispatch({ type: 'USER_LOGIN', payload: data });
                                Cookies.set('userInfo', data);
                                router.push(redirect || '/');
                            } catch (err: any) {
                                console.log(err.response.data);
                            }
                        })}
                    >
                        <List className='px-5'>
                            <ListItem>
                                <Controller
                                    name='name'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant='outlined'
                                            fullWidth
                                            id='name'
                                            label='Name'
                                            color='secondary'
                                            inputProps={{ type: 'name' }}
                                            error={Boolean(errors.name)}
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
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
                                            color='secondary'
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
                                            color='secondary'
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
                                <button
                                    className='flex rounded-full bg-indigo-500 px-4 py-2 mt-4 mx-auto'
                                    type='submit'
                                >
                                    <h1 className='text-lg text-white'>Register</h1>
                                </button>
                            </ListItem>
                            <ListItem className='inline-flex justify-center'>
                                <p>Already have an account?</p>
                                &nbsp;
                                <NextLink href={'login'} passHref>
                                    <Link className='text-indigo-500 no-underline'>Log in</Link>
                                </NextLink>
                            </ListItem>
                        </List>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SignupPage;
SignupPage.Layout = 'Main';
