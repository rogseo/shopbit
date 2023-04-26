import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import { StoreContext } from "../../src/utils/Store";
import Cookies from 'js-cookie';

import { UserIcon, ShoppingCartIcon, RectangleGroupIcon, TagIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {

    const { state, dispatch } = useContext(StoreContext);
    const { cart, userInfo } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);


    return (
        <div className='container navbar bg-base-100 mx-auto'>
            <ul className='grid grid-cols-9 gap-4 my-3 place-content-between place-items-center'>
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
                        <RectangleGroupIcon className='h-6 w-6 mr-1' />
                        Categories
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/categories'>
                        <TagIcon className='h-6 w-6 mr-1' />
                        Deals
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/account'>
                        <UserIcon className='h-6 w-6 mr-1' />
                        Account
                    </Link>
                </li>
                <li className='self-center'>
                    <Link className='flex flex-row' href='/cart'>
                        
                        <ShoppingCartIcon className='h-6 w-6 mr-1' />
                        Cart
                        {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                        
                    </Link>
                </li>
               
                {userInfo ? (
                    <li className='self-center'>
                    <Link className='flex flex-row' href='/' onClick={()=>{
                          Cookies.remove("userInfo");
                          dispatch({ type: 'USER_LOGOUT' });
                    }}>
                        Log Out
                    </Link>
                </li>

                ): (<li className='self-center'>
                <Link className='flex flex-row' href='/login'>
                    <ArrowLeftOnRectangleIcon className='h-6 w-6 mr-1' />
                    Log in
                </Link>
            </li> )}
                {/* <li className='self-center'>
                    <Link className='flex flex-row' href='/signup'>
                        Sign up
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};
export default Navbar;