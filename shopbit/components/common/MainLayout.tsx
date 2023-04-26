// components/common/MainLayout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar';
const MainLayout = (props: PropsWithChildren) => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>{ props.children }</main>
        </>
    );
};
export default MainLayout;
