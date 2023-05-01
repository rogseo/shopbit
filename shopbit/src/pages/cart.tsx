import { MyPage } from '../../components/common/types';
import React, { useContext } from 'react';

import { actionTypes, StoreContext } from '../utils/Store';
import NextLink from 'next/link';
import dynamic, { LoaderComponent } from 'next/dynamic';
import Image from 'next/image';
import {
    Grid,
    TableContainer,
    Table,
    Typography,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link,
    Select,
    MenuItem,
    Button,
    Card,
    List,
    ListItem,
} from '@mui/material';
import { TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { IProduct } from '../../models/Product';
import { useRouter } from 'next/router';
const CartPage: MyPage = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(StoreContext);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item: IProduct, qty: number) => {
        // const { data } = await axios.get(`/api/products/${item._id}`);
        if (item.countInStock < qty) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        const quantity = Number(qty);
        dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...item, quantity } });
    };

    const removeItemHandler = (item: IProduct) => {
        dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: item });
    };

    const checkoutHandler = () => {
        router.push('/shipping');
    };

    return (
        <div className='container mx-auto'>
            {cartItems.length === 0 ? (
                <div className='grid grid-cols-1 place-content-center h-screen'>
                    <img src='/shopbit_logo.png' className='w-36 place-self-center' />
                    <p className='text-center'>
                        <NextLink href='/' passHref>
                            <Link className='text-black no-underline'>
                                Cart is empty. Go shopping!
                            </Link>
                        </NextLink>
                    </p>
                </div>
            ) : (
                <ul className='grid md:grid-cols-4 sm:grid-cols-1 mt-4'>
                    <li className='flex md:col-span-2 md:col-start-2 justify-between border-b-2 pb-2'>
                        <h1 className='text-2xl'>Shopping Cart</h1>
                        <p>Price</p>
                    </li>
                    {cartItems.map((item) => (
                        <li className='flex md:col-span-2 md:col-start-2 justify-between border-b-2 py-4'>
                            <div className='flex'>
                                <img src={item.image} className='w-32 mr-4' />
                                <div className='flex flex-col justify-between'>
                                    <ul>
                                        <li>{item.name}</li>
                                        <li>Size: </li>
                                        <li>Color: </li>
                                        <li>
                                            Qty:{' '}
                                            <select
                                                className='bg-white'
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateCartHandler(item, e.target.value)
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>
                                        <li></li>
                                    </ul>
                                    <button onClick={() => removeItemHandler(item)}>
                                        <TrashIcon className='w-6 h-6 mr-1' />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p>${item.price}</p>
                            </div>
                        </li>
                    ))}
                    <li className='flex md:col-span-2 md:col-start-2 justify-end py-4'>
                        Subtotal (
                        {(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity, 0)} items)
                        : $
                        {(cartItems as Array<IProduct>).reduce(
                            (a, c) => a + c.quantity * c.price,
                            0
                        )}
                    </li>
                    <li className='grid md:col-span-2 md:col-start-2 place-content-stretch'>
                        <button 
                            className='rounded-full bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-300 py-2'
                            onClick={() => router.push('/shipping')}
                        >
                            <div className='flex justify-center'>
                                <p className='text-white'>Checkout</p>
                            </div>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};
export default CartPage;
CartPage.Layout = 'Main';

//export default dynamic<any>(() => Promise.resolve(CartPage) as LoaderComponent<any>, { ssr: false });

// <div className='grid md:grid-cols-4 md:gap-5'>
//     <div className='overflow-x-auto md:col-span-3'>
//         <table className='min-w-full '>
//             <thead className='border-b'>
//                 <tr>
//                     <th className='p-5 text-left'>Item</th>
//                     <th className='p-5 text-right'>Quantity</th>
//                     <th className='p-5 text-right'>Price</th>
//                     <th className='p-5'>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {cartItems.map((item) => (
//                     <tr key={item.slug} className='border-b'>
//                         <td>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                                 <Link>
//                                     <div
//                                         className='m-2 bg-contain bg-center h-40 bg-no-repeat place-items-center'
//                                         style={{
//                                             backgroundImage: `url(${item.image})`,
//                                         }}
//                                     />
//                                 </Link>
//                             </NextLink>
//                         </td>
//                         <td className='p-5 text-right'>
//                             <select
//                                 className='bg-white'
//                                 value={item.quantity}
//                                 onChange={(e) =>
//                                     updateCartHandler(item, e.target.value)
//                                 }
//                             >
//                                 {[...Array(item.countInStock).keys()].map((x) => (
//                                     <option key={x + 1} value={x + 1}>
//                                         {x + 1}
//                                     </option>
//                                 ))}
//                             </select>
//                         </td>
//                         <td className='p-5 text-right'>${item.price}</td>
//                         <td className='p-5 text-center'>
//                             <button onClick={() => removeItemHandler(item)}>
//                                 remove
//                                 {/* <XCircleIcon className="h-5 w-5"></XCircleIcon> */}
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//     <div className='card p-5'>
//         <ul>
//             <li>
//                 <div className='pb-3 text-xl'>
//                     Subtotal (
//                     {(cartItems as Array<IProduct>).reduce(
//                         (a, c) => a + c.quantity,
//                         0
//                     )}{' '}
//                     items) : $
//                     {(cartItems as Array<IProduct>).reduce(
//                         (a, c) => a + c.quantity * c.price,
//                         0
//                     )}
//                 </div>
//             </li>
//             <li>
//                 <button
//                     onClick={() => router.push('/shipping')}
//                     className='primary-button w-full'
//                 >
//                     Check Out
//                 </button>
//             </li>
//         </ul>
//     </div>
// </div>
