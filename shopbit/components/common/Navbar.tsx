
import Link from "next/link";
import React from "react";
import SearchBar from './SearchBar'
import { User, ShoppingCart, Grid } from 'react-feather';

const Navbar = () => {
    return (
        <div className="container navbar bg-base-100">
            <div className="flex-none">
                <ul className="flex flex-row">
                    <li className="m-3">
                        <Link href="/">
                            <img
                                src="/shopbit_icon.png"
                                alt="Vercel Logo"
                                width={200}
                                height={24}
                            />
                        </Link>
                    </li>
                    <li className="m-3 self-center">
                        <div className="">
                            <SearchBar />
                        </div>
                    </li>
                    <li  className="m-3 self-center">
                        <Link className="flex flex-row mr-3" href="/categories"><Grid className="mr-1"/>Categories</Link>
                    </li>
                    <li className="m-3 self-center">
                        <Link className="flex flex-row mr-3" href="/account"><User className="mr-1"/>Account</Link>
                    </li>
                    <li className="m-3 self-center">
                        <Link className="flex flex-row mr-3" href="/cart"><ShoppingCart className="mr-1"/>Cart</Link>
                    </li>
                </ul>

            </div>
        </div>
    );
};
export default Navbar;
