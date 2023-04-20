import React from 'react';
import Link from 'next/link';

import { productInterface } from '@/@types/product';

import { capitalizeFirst } from '@/utils/helper';
import { PlusIcon } from '@heroicons/react/24/outline';
// const { state, dispatch } = useContext(userp);

const ProductItem = (product: productInterface) => {
    return (
       
        <div className='w-48 h-80 shadow flex flex-col rounded-lg'
        key={product.product.name}>
            <Link href={`product/${product.product.slug}`}>
              
                    <div
                        className='m-2 bg-contain bg-center h-40 bg-no-repeat place-items-center'
                        style={{ backgroundImage: `url(${product.product.image})` }}
                    />
                
            </Link>
            <div className='m-4'>
                <Link href={`product/${product.product.slug}`}>
                
                        <p className='line-clamp-2 hover:line-clamp-none'>{product.product.name}</p>
                   
                </Link>
                {/* <p>{capitalizeFirst(product.product.categories[0].name)}</p> */}
                <p>${product.product.price.toFixed(2)}</p>


                <div className='grid place-content-center'>
                    <button className='rounded-full bg-slate-200 py-2 px-3 mt-3'>
                        <div className='flex items-center   '>
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
