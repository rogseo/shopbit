import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { productInterface } from '@/@types/product';

import { capitalizeFirst } from '@/utils/helper';
import Product, { IProduct } from '../../../models/Product';
import { PlusIcon } from '@heroicons/react/24/outline';
import { actionTypes, StoreContext } from '../../utils/Store';
import axios from 'axios';

const ProductItem = (product: productInterface) => {
    const { state, dispatch } = useContext(StoreContext);
    const router = useRouter();

    const addToCartHandler = async (product: IProduct) => {
        console.log(product._id);
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        // const { data } = await axios.get(`/api/products/${product._id}`);
        // console.log(data);

        if (product.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...product, quantity } });
        router.push('/cart');
    };
    return (
        <div
            className='w-48 h-80 flex flex-col rounded-lg border border-slate-200'
            key={product.product.name}
        >
            <Link href={`product/${product.product.slug}`}>
                <div
                    className='m-2 bg-contain bg-center h-36 bg-no-repeat place-items-center'
                    style={{ backgroundImage: `url(${product.product.image})` }}
                />
            </Link>

            <div className='m-4'>
                <div className='h-20'>
                    <Link href={`product/${product.product.slug}`}>
                        <p className='line-clamp-2 hover:text-indigo-500'>{product.product.name}</p>
                    </Link>
                    {/* <p>{capitalizeFirst(product.product.categories[0].name)}</p> */}
                    <p>${product.product.price.toFixed(2)}</p>
                </div>

                <div className='grid place-content-center'>
                    <button
                        className='rounded-full bg-slate-200 py-2 px-3 mt-3 hover:bg-indigo-500 transition ease-in-out delay-150 duration-300'
                        onClick={() => addToCartHandler(product.product as IProduct)}
                    >
                        <div className='flex items-center'>
                            <PlusIcon className='w-6 h-6 mr-1' />
                            <p>Add to cart</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
