import React from 'react';
import { MyPage } from '../../components/common/types';
const CategoriesPage: MyPage = () => {
    return (
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <div className='grid grid-cols-6 gap-4'>
                <div
                    className='relative bg-cover bg-center bg-no-repeat h-60 rounded-lg place-content-center grid'
                    style={{ backgroundImage: 'url("/category-shoes.jpg")' }}
                >
                    <h1 className='text-3xl bg-slate-100/70 rounded-lg p-3'>Shoes</h1>
                </div>
                <div
                    className='relative bg-cover bg-center bg-no-repeat h-60 rounded-lg place-content-center grid'
                    style={{ backgroundImage: 'url("/category-clothes.jpg")' }}
                >
                    <h1 className='text-3xl bg-slate-100/70 rounded-lg p-3'>Clothes</h1>
                </div>
                <div
                    className='relative bg-cover bg-center bg-no-repeat h-60 rounded-lg place-content-center grid'
                    style={{ backgroundImage: 'url("/category-furniture.jpg")' }}
                >
                    <h1 className='text-3xl bg-slate-100/80 rounded-lg p-3'>Furniture</h1>
                </div>
                <div
                    className='relative bg-cover bg-center bg-no-repeat h-60 rounded-lg place-content-center grid'
                    style={{ backgroundImage: 'url("/category-electronics.jpg")' }}
                >
                    <h1 className='text-3xl bg-slate-100/80 rounded-lg p-3'>Electronics</h1>
                </div>
            </div>
        </div>
    );
};
export default CategoriesPage;
CategoriesPage.Layout = 'Main';
