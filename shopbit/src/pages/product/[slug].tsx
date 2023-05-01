import React, { useContext } from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { Grid, Link, List, ListItem, Typography, Card, Button } from '@mui/material';
import { ArrowLeftIcon, StarIcon, PlusIcon } from '@heroicons/react/24/outline';

import db from '../../utils/db';
import Product from '../../../models/Product';
import { StoreContext } from '../../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';
import data from '../../../src/utils/data';
import { MyPage } from '../../../components/common/types';
import DropdownButton from '../components/dropdownButton';
import { dropdownInterface } from '@/@types/dropdownButton';

const dropdownPlaceholder = [
    {
        name: 'White',
    },
    {
        name: 'Black',
    },
    {
        name: 'Blue',
    },
    {
        name: 'Red',
    },
];

const ProductDetail: MyPage = ({
    product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { state, dispatch } = useContext(StoreContext);

    if (!product) {
        return (
            <div className='grid grid-cols-1 place-content-center h-screen'>
                <img src='/shopbit_logo.png' className='w-36 place-self-center' />
                <p className='text-center'>
                    <NextLink href='/' passHref>
                        <Link className='text-black no-underline'>Product not found.</Link>
                    </NextLink>
                </p>
            </div>
        );
    }

    return (
        <div className='container grid md:grid-cols-2 sm:grid-cols-1 mx-auto'>
            <div className='grid grid-cols-1'>
                <div>
                    <Link className='text-black no-underline inline-flex' href='/'>
                        <ArrowLeftIcon className='h-6 w-6 mr-1' />
                        Back to products
                    </Link>
                </div>
                <img src={product.image} className='w-7/12 place-self-center mt-4 rounded-lg'></img>
            </div>
            <div className='grid grid-cols-1'>
                <div className='mt-4'>
                    <ul>
                        <li className='leading-loose'>{product.category}</li>
                        <li className='flex justify-between'>
                            <h1 className='text-xl leading-loose'>
                                {product.brand} - {product.name}
                            </h1>
                            <h1 className='text-xl leading-loose'>${product.price}</h1>
                        </li>
                        <li className='inline-flex'>
                            <StarIcon className='h-6 w-6 mr-1' />
                            {product.rating} from {product.numReviews} reviews
                        </li>
                        <li className='flex mt-4'>
                            {/* Change so dropdown buttons render based on product conditions */}
                            <div className='mr-3'>
                                <DropdownButton name={'Color'} menuItems={dropdownPlaceholder} />
                            </div>
                            <div className='mr-3'>
                                <DropdownButton name={'Size'} menuItems={dropdownPlaceholder} />
                            </div>
                        </li>
                        <li>
                            <div className='grid place-content-stretch'>
                                <button
                                    className='rounded-full bg-slate-200 hover:bg-indigo-200 transition ease-in-out duration-300 py-2 px-3 my-4'
                                    //onClick={() => addToCartHandler(product.product as IProduct)}
                                >
                                    <div className='flex justify-center'>
                                        <PlusIcon className='w-6 h-6 mr-1' />
                                        <p>Add to cart</p>
                                    </div>
                                </button>
                            </div>
                        </li>
                        <li className='border mt-4 mb-5 align-top'></li>
                        <li>{product.description}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

ProductDetail.Layout = 'Main';

export const getServerSideProps = async (context: any) => {
    const { params } = context;
    const { slug } = params;
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
};
