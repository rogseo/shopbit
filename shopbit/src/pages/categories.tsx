import React, { useState } from 'react';
import { MyPage } from '../../components/common/types';

import { Tabs, Tab } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';

import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const CategoriesPage: MyPage = () => {
    const [value, setValue] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <div className='container mx-auto'>
                <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    modules={[Scrollbar]}
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat h-48 rounded-lg'
                            style={{ backgroundImage: 'url("/category-shoes.jpg")' }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat h-48 rounded-lg'
                            style={{ backgroundImage: 'url("/category-clothes.jpg")' }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat h-48 rounded-lg'
                            style={{ backgroundImage: 'url("/category-furniture.jpg")' }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat h-48 rounded-lg'
                            style={{ backgroundImage: 'url("/category-electronics.jpg")' }}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <TabContext value={value}>
                <Tabs
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons='auto'
                    allowScrollButtonsMobile
                >
                    <Tab
                        label={<p>Shoes</p>}
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
                        label={<p>Clothes</p>}
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
                        label={<p>Furniture</p>}
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
                        label={<p>Electronics</p>}
                        value='3'
                        sx={{
                            fontFamily: 'Inter',
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'black',
                            borderRadius: 15,
                        }}
                    />
                    <Tab
                        label={<p>Jewelry</p>}
                        value='4'
                        sx={{
                            fontFamily: 'Inter',
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'black',
                            borderRadius: 15,
                        }}
                    />
                </Tabs>
                <TabPanel value='0'>
                    <p>Shoes items here</p>
                </TabPanel>
                <TabPanel value='1'>
                    <p>Clothes favorites here</p>
                </TabPanel>
                <TabPanel value='2'>
                    <p>Furniture items here</p>
                </TabPanel>
                <TabPanel value='3'>
                    <p>Electronics items here</p>
                </TabPanel>
                <TabPanel value='4'>
                    <p>Jewelry items here</p>
                </TabPanel>
            </TabContext>
        </div>
    );
};
export default CategoriesPage;
CategoriesPage.Layout = 'Main';
