// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>{children}</main>
        </>
    );
};
export default MainLayout;