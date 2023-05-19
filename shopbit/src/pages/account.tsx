import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import { Tabs, Tab } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import {
    HomeIcon,
    ReceiptRefundIcon,
    CreditCardIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

import { actionTypes, StoreContext } from '../utils/Store';
import { MyPage } from '../../components/common/types';

const AccountPage: MyPage = () => {
    const { state, dispatch } = useContext(StoreContext);
    const { userInfo } = state;
    const [value, setValue] = useState<string>('0');
    const [name, setname] = useState<string>();

    useEffect(() => {
        setValue('0');
        setname(userInfo?.name || 'User');
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            {userInfo ? (
                <div className='container mx-auto grid grid-cols-1'>
                    <div className='flex items-end'>
                        <div
                            className='bg-cover bg-center bg-no-repeat h-28 w-28 rounded-full border border-slate-200'
                            style={{
                                backgroundImage: `url(https://api.dicebear.com/6.x/shapes/svg?seed=${name})`,
                            }}
                        />
                        <h1 className='text-3xl ml-2'>Hey, {name}!</h1>
                    </div>
                    <TabContext value={value}>
                        <Tabs
                            onChange={handleChange}
                            variant='scrollable'
                            scrollButtons='auto'
                            allowScrollButtonsMobile
                        >
                            <Tab
                                label={<p>Address</p>}
                                iconPosition='start'
                                icon={<HomeIcon className='h-6 w-6' />}
                                value='0'
                                sx={{
                                    fontFamily: 'Inter',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    color: 'black',
                                    borderRadius: 15,
                                }}
                            />
                            <Tab
                                label={<p>Orders</p>}
                                iconPosition='start'
                                icon={<ReceiptRefundIcon className='h-6 w-6' />}
                                value='1'
                                sx={{
                                    fontFamily: 'Inter',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    color: 'black',
                                    borderRadius: 15,
                                }}
                            />
                            <Tab
                                label={<p>Security</p>}
                                iconPosition='start'
                                icon={<LockClosedIcon className='h-6 w-6' />}
                                value='2'
                                sx={{
                                    fontFamily: 'Inter',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    color: 'black',
                                    borderRadius: 15,
                                }}
                            />
                            <Tab
                                label={<p>Payment</p>}
                                iconPosition='start'
                                icon={<CreditCardIcon className='h-6 w-6' />}
                                value='3'
                                sx={{
                                    fontFamily: 'Inter',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    color: 'black',
                                    borderRadius: 15,
                                }}
                            />
                        </Tabs>
                        <TabPanel value='0' className='py-0'>
                            <h2 className='text-lg'>Address</h2>
                        </TabPanel>
                        <TabPanel value='1' className='py-0'>
                            <h2 className='text-lg'>Orders</h2>
                        </TabPanel>
                        <TabPanel value='2' className='py-0'>
                            <h2 className='text-lg'>Security</h2>
                        </TabPanel>
                        <TabPanel value='3' className='py-0'>
                            <h2 className='text-lg'>Payment</h2>
                        </TabPanel>
                    </TabContext>
                </div>
            ) : (
                <div className='grid grid-cols-1 place-content-center h-screen'>
                    <img src='/shopbit_logo.png' className='w-36 place-self-center' />
                    <p className='text-center'>
                        <Link className='text-black no-underline' href={'/login'}>
                            You must be logged in to see this page!
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};
export default AccountPage;
AccountPage.Layout = 'Main';
