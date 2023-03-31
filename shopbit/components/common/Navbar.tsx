import Link from 'next/link';
import React from 'react';
import SearchBar from './SearchBar';
import { User, ShoppingCart, Grid, Tag } from 'react-feather';

const Navbar = () => {
    return (
        <div className='container navbar bg-base-100 mx-auto'>
            <ul className='grid grid-cols-8 gap-4 my-3 place-content-between place-items-center'>
                <li className='self-center items-center'>
                    <Link href='/' className='flex flex-row'>
                        <h1 className='text-2xl self-end'>ShopBit</h1>
                        <img
                            src='/shopbit_logo.png'
                            alt='ShopBit Logo'
                            className='ml-2'
                            width={24}
                        />
                    </Link>
                </li>
                <li className='self-center col-span-3 place-self-stretch'>
                    <div className='mx-auto'>
                        <SearchBar />
                    </div>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/categories'>
                        <Grid className='mr-1' />
                        Categories
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/categories'>
                        <Tag className='mr-1' />
                        Deals
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/account'>
                        <User className='mr-1' />
                        Account
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/cart'>
                        <ShoppingCart className='mr-1' />
                        Cart
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default Navbar;
