// components/common/MainLayout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
const MainLayout = (props: PropsWithChildren) => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>{ props.children }</main>
            <Footer />
        </>
    );
};
export default MainLayout;
