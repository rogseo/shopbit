import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import { useRouter } from 'next/router';
import { StoreContext } from '../../src/utils/Store';
import Cookies from 'js-cookie';

import {
    UserIcon,
    ShoppingCartIcon,
    RectangleGroupIcon,
    TagIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';
import {
    MenuList,
    ClickAwayListener,
    Button,
    Grow,
    Paper,
    Popper,
    MenuItem,
    Menu,
    Divider,
    IconButton,
    Box,
} from '@mui/material';

const Navbar = () => {
    const { state, dispatch } = useContext(StoreContext);
    const { cart, userInfo } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    // Handles hamburger menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // When user scrolls, menu will close
    useEffect(() => {
        window.addEventListener('scroll', handleClose);
        return () => {
            window.removeEventListener('scroll', handleClose);
        };
    });

    const router = useRouter();

    return (
        <div className='container navbar bg-base-100 mx-auto'>
            <ul className='grid lg:grid-cols-8 md:grid-cols-12 md:gap-4 my-3 place-content-between place-items-center'>
                <li className='place-self-center'>
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
                <li className='self-center lg:col-start-2 md:col-start-3 lg:col-span-4  md:col-span-6 place-self-stretch px-4'>
                    <SearchBar />
                </li>
                {/* Nav bar with breadcrumb links */}
                <ul className='grid max-[1300px]:hidden grid-cols-5 col-span-3 place-items-center'>
                    <li>
                        <Link className='flex flex-row' href='/categories'>
                            <RectangleGroupIcon className='h-6 w-6 mr-1' />
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link className='flex flex-row' href='/deals'>
                            <TagIcon className='h-6 w-6 mr-1' />
                            Deals
                        </Link>
                    </li>
                    <li>
                        <Link className='flex flex-row' href='/account'>
                            <UserIcon className='h-6 w-6 mr-1' />
                            Account
                        </Link>
                    </li>
                    <li>
                        <Link className='flex flex-row' href='/cart'>
                            <ShoppingCartIcon className='h-6 w-6 mr-1' />
                            Cart
                            {cartItemsCount > 0 && (
                                <span className='ml-1 rounded-full bg-indigo-500 px-2 py-1 text-xs font-bold text-white'>
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    {userInfo ? (
                        <li className='self-center'>
                            <Link
                                className='flex flex-row'
                                href='/'
                                onClick={() => {
                                    Cookies.remove('userInfo');
                                    dispatch({ type: 'USER_LOGOUT' });
                                    router.reload();
                                }}
                            >
                                <ArrowRightOnRectangleIcon className='h-6 w-6 mr-1' />
                                Log Out
                            </Link>
                        </li>
                    ) : (
                        <li className='self-center'>
                            <Link className='flex flex-row' href='/login'>
                                <ArrowLeftOnRectangleIcon className='h-6 w-6 mr-1' />
                                Log in
                            </Link>
                        </li>
                    )}
                </ul>
                <li className='col-end-13 min-[1300px]:hidden'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Bars3Icon className='h-6 w-6 mr-1 text-black' />
                    </IconButton>
                </li>

                <Menu
                    anchorEl={anchorEl}
                    id='menu'
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    disableScrollLock={true}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Link className='flex flex-row' href='/cart'>
                            <ShoppingCartIcon className='h-6 w-6 mr-1' />
                            Cart
                            {cartItemsCount > 0 && (
                                <span className='ml-1 rounded-full bg-indigo-500 px-2 py-1 text-xs font-bold text-white'>
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link className='flex flex-row' href='/categories'>
                            <RectangleGroupIcon className='h-6 w-6 mr-1' />
                            Categories
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <Link className='flex flex-row' href='/categories'>
                            <TagIcon className='h-6 w-6 mr-1' />
                            Deals
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <Link className='flex flex-row' href='/account'>
                            <UserIcon className='h-6 w-6 mr-1' />
                            Account
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        {userInfo ? (
                            <li>
                                <Link
                                    className='flex flex-row'
                                    href='/'
                                    onClick={() => {
                                        Cookies.remove('userInfo');
                                        dispatch({ type: 'USER_LOGOUT' });
                                    }}
                                >
                                    Log Out
                                </Link>
                            </li>
                        ) : (
                            <li className='self-center'>
                                <Link className='flex flex-row' href='/login'>
                                    <ArrowLeftOnRectangleIcon className='h-6 w-6 mr-1' />
                                    Log in
                                </Link>
                            </li>
                        )}
                    </MenuItem>
                </Menu>
            </ul>
        </div>
    );
};
export default Navbar;
