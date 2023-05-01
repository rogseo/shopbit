import React, { useContext, useEffect } from 'react';
import { MyPage } from '../../components/common/types';
import CheckoutWizard from './components/CheckoutWizard';
import { List, ListItem, TextField, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { actionTypes, ShippingAddressType, StoreContext } from '../utils/Store';
import { beforeEach } from 'node:test';
import theme from '@/utils/palette';

const ShippingPage: MyPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    const router = useRouter();
    const { state, dispatch } = useContext(StoreContext);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress?.fullName);
        setValue('address', shippingAddress?.address);
        setValue('city', shippingAddress?.city);
        setValue('postalCode', shippingAddress?.postalCode);
        setValue('country', shippingAddress?.country);
    });

    const submitHandler = ({
        fullName,
        address,
        city,
        postalCode,
        country,
    }: ShippingAddressType) => {
        dispatch({
            type: actionTypes.SAVE_SHIPPING_ADDRESS,
            payload: { fullName, address, city, postalCode, country },
        });
        Cookies.set(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        router.push('/payment');
    };
    return (
        <ThemeProvider theme={theme}>
            <div className='container mx-auto mt-4'>
                <div className='grid md:grid-cols-4 sm:grid-cols-1'>
                    <div className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                        <CheckoutWizard activeStep={1} />
                    </div>
                </div>
                <h1 className='text-2xl text-center mt-4'>Shipping Address</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <List className='grid md:grid-cols-4 sm:grid-cols-1'>
                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <Controller
                                name='fullName'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='fullName'
                                        label='Full Name'
                                        error={Boolean(errors.fullName)}
                                        helperText={
                                            errors.fullName
                                                ? errors.fullName.type === 'minLength'
                                                    ? 'Full Name Length is more than 1'
                                                    : 'Full Name is required'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <Controller
                                name='address'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='address'
                                        label='Address'
                                        error={Boolean(errors.address)}
                                        helperText={
                                            errors.address
                                                ? errors.address.type === 'minLength'
                                                    ? 'Address length is more than 1'
                                                    : 'Address is required'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <Controller
                                name='city'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='city'
                                        label='City'
                                        error={Boolean(errors.city)}
                                        helperText={
                                            errors.city
                                                ? errors.city.type === 'minLength'
                                                    ? 'City length is more than 1'
                                                    : 'City is required'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <Controller
                                name='postalCode'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='postalCode'
                                        label='Postal Code'
                                        error={Boolean(errors.postalCode)}
                                        helperText={
                                            errors.postalCode
                                                ? errors.postalCode.type === 'minLength'
                                                    ? 'Postal Code length is more than 1'
                                                    : 'Postal Code is required'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <Controller
                                name='country'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='country'
                                        label='Country'
                                        error={Boolean(errors.country)}
                                        helperText={
                                            errors.country
                                                ? errors.country.type === 'minLength'
                                                    ? 'Country length is more than 1'
                                                    : 'Country is required'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>

                        <ListItem className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                            <button
                                className='rounded-full bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-300 py-2'
                                onClick={() => router.push('/shipping')}
                            >
                                <div className='flex justify-center'>
                                    <p className='text-white'>Checkout</p>
                                </div>
                            </button>
                        </ListItem>
                    </List>
                </form>
            </div>
        </ThemeProvider>
    );
};
export default ShippingPage;
ShippingPage.Layout = 'Main';
