import React, { useState } from 'react';
import { MyPage } from '../../components/common/types';

import { Tabs, Tab } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { HeartIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';

const DealsPage: MyPage = () => {
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <div
                className='relative bg-cover bg-center bg-no-repeat md:h-96 h-48 rounded-lg'
                style={{ backgroundImage: 'url("/spring-deals.jpg")' }}
            >
                <div className='absolute md:start-28 md:top-36 start-4 top-16'>
                    <h1 className='text-3xl w-64 text-cyan-500'>Shop for spring deals today!</h1>
                </div>
            </div>
            <TabContext value={value}>
                <Tabs
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons='auto'
                    allowScrollButtonsMobile
                >
                    <Tab
                        iconPosition='start'
                        icon={<FireIcon className='h-6 w-6' />}
                        label={<p>Trending</p>}
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
                        iconPosition='start'
                        icon={<HeartIcon className='h-6 w-6' />}
                        label={<p>Spring favorites</p>}
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
                        iconPosition='start'
                        icon={<ClockIcon className='h-6 w-6' />}
                        label={<p>Leaving soon</p>}
                        value='2'
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
                    <h2 className='text-lg'>Trending</h2>
                </TabPanel>
                <TabPanel value='1' className='py-0'>
                    <h2 className='text-lg'>Spring favorites</h2>
                </TabPanel>
                <TabPanel value='2' className='py-0'>
                    <h2 className='text-lg'>Leaving soon</h2>
                </TabPanel>
            </TabContext>
        </div>
    );
};
export default DealsPage;
DealsPage.Layout = 'Main';
