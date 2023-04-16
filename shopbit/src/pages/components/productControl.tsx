import React, { useState, useEffect } from 'react';
import DropdownButton from './dropdownButton';

// Swell
import { swellClient } from '@/swell/connection';
import { getAllCategories } from '@/swell/queries';

import { categoriesInterface } from '@/@types/categories';

// Will be temporary until we update the swell dashboard
const prices = [
    {
        name: 'Under $25',
    },
    {
        name: '$25 - $50',
    },
    {
        name: '$50 - $100',
    },
    {
        name: '$100+',
    },
];
const color = [
    {
        name: 'White',
    },
    {
        name: 'Black',
    },
    {
        name: 'Red',
    },
    {
        name: 'Blue',
    },
];
const sort = [
    {
        name: 'Price low to high',
    },
    {
        name: 'Price high to low',
    },
    {
        name: 'Newest arrival',
    },
    {
        name: 'Featured',
    },
];

const ProductControl = () => {
    const [categories, setCategories] = useState<categoriesInterface>();
    const getCategories = () => {
        try {
            swellClient.request<categoriesInterface>(getAllCategories).then<void>((value) => {
                setCategories(value);
                console.log(categories);
            })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className='mt-3 flex justify-between'>
            <div className='flex'>
                <DropdownButton name='Categories' menuItems={categories?.categories.results} />
                <DropdownButton name='Price' menuItems={prices} />
                <DropdownButton name='Color' menuItems={color} />
            </div>

            <DropdownButton name='Sort by' menuItems={sort} chevronIcon={false} />
        </div>
    );
};

export default ProductControl;
