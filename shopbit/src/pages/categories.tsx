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
                            className='relative bg-cover bg-center bg-no-repeat md:h-96 h-48 rounded-lg'
                            style={{
                                backgroundImage: 'url("/category-shoes.jpg")',
                                backgroundPositionY: '60%',
                            }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat md:h-96 h-48 rounded-lg'
                            style={{
                                backgroundImage: 'url("/category-clothes.jpg")',
                                backgroundPositionY: '20%',
                            }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat md:h-96 h-48 rounded-lg'
                            style={{
                                backgroundImage: 'url("/category-furniture.jpg")',
                                backgroundPositionY: '40%',
                            }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className='relative bg-cover bg-center bg-no-repeat md:h-96 h-48 rounded-lg'
                            style={{
                                backgroundImage: 'url("/category-electronics.jpg")',
                                backgroundPositionY: '20%',
                            }}
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
                <TabPanel value='0' className='py-0'>
                    <h2 className='text-lg'>Shoes</h2>
                </TabPanel>
                <TabPanel value='1' className='py-0'>
                    <h2 className='text-lg'>Clothes</h2>
                </TabPanel>
                <TabPanel value='2' className='py-0'>
                    <h2 className='text-lg'>Furniture</h2>
                </TabPanel>
                <TabPanel value='3' className='py-0'>
                    <h2 className='text-lg'>Electronics</h2>
                </TabPanel>
                <TabPanel value='4' className='py-0'>
                    <h2 className='text-lg'>Jewelry</h2>
                </TabPanel>
            </TabContext>
        </div>
    );
};
export default CategoriesPage;
CategoriesPage.Layout = 'Main';
