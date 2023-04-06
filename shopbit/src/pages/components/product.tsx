import React from 'react';

import { productInterface } from '@/@types/product';

import { capitalizeFirst } from '@/utils/helper';
import { Plus } from 'react-feather';

const Product = (product: productInterface) => {
    return (
        <div className='w-44 h-fit shadow flex flex-col rounded-lg'>
            <div
                className='m-4 bg-contain bg-center h-40 bg-no-repeat place-items-center'
                style={{ backgroundImage: `url(${product.product.images[0].file.url})` }}
            />
            <div className='m-4'>
                <p className='line-clamp-2 hover:line-clamp-none'>{product.product.name}</p>
                <p>{capitalizeFirst(product.product.categories[0].name)}</p>
                <p>${product.product.price.toFixed(2)}</p>
                <div className='grid place-content-center'>
                    <button className='rounded-full bg-slate-200 py-2 px-3 mt-3'>
                        <div className='flex'>
                            <Plus />
                            <p>Add to cart</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
