import React, { useState, useEffect } from 'react';
import { MyPage } from '../../components/common/types';

// Swell
import { swellClient } from '@/swell/connection';
import { getAllProducts } from '@/swell/queries';

// Components
import ProductItem from './components/ProductItem';
import ProductControl from './components/productControl';

import { productsInterface } from '@/@types/product';
import { SyncLoader } from 'react-spinners';

import { SparklesIcon } from '@heroicons/react/24/outline';

//
import Product from "../../models/Product";
import db from "../utils/db";
import axios from 'axios';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from "next";
import { post } from 'cypress/types/jquery';

const HomePage: MyPage = ({
    products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // const [products, setProducts] = useState<productsInterface>();
    // const getProducts = () => {
    //     try {
    //         swellClient.request<productsInterface>(getAllProducts).then<void>((value) => {
    //             setProducts(value);
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     getProducts();
    // }, []);
    console.log(products)
   

    return (
        <>
            <link rel='icon' href='/favicon.ico' />
            <div className='container mx-auto'>
                <div
                    className='relative bg-cover bg-center bg-no-repeat h-96 rounded-lg'
                    style={{ backgroundImage: 'url("/hero.jpg")' }}
                >
                    <div className='absolute start-28 top-32'>
                        <h1 className='text-3xl w-64 text-indigo-500'>
                            Everything you need in one place.
                        </h1>
                        <button className='flex rounded-full bg-indigo-500 px-3 py-2 mt-4'>
                            <SparklesIcon className='h-6 w-6 text-white mr-1' />
                            <h1 className='text-xl text-white'>Get Started</h1>
                        </button>
                    </div>
                </div>

                <ProductControl />

                <h2 className='my-3 text-lg'>Featured Products</h2>
                {products? (
                    <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-4 min-h-screen'>
                        {products.map((product) => (
                            <ProductItem product={product} />
                        ))}
                    </div>
                ) : (
                    <div className='flex place-content-center'>
                        <SyncLoader color='#94a3b8' />
                    </div>
                )}
            </div>
        </>
    );
};
export default HomePage;
HomePage.Layout = 'Main';


export const getServerSideProps = async () => {
    await db.connect();
    const products = await Product.find({}).lean();
    await db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
};
