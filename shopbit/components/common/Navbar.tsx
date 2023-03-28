// components/common/AdminNavbar.tsx
import Link from "next/link";
import React from "react";
const Navbar = () => {
    return (
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">
                <img
                src="/shopbit_icon.png"
                alt="Vercel Logo"
                width={200}
                height={24}
              />
              </Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
export default Navbar;
