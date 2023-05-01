import React, { useContext } from 'react';
import { MyPage } from '../../components/common/types';
import Link from 'next/link';

// Components
import ProductItem from './components/ProductItem';
import ProductControl from './components/productControl';

import { productsInterface } from '@/@types/product';
import { SyncLoader } from 'react-spinners';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Product, { IProduct } from '../../models/Product';
import db from '../utils/db';
import axios from 'axios';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { post } from 'cypress/types/jquery';
import { actionTypes, StoreContext } from '../utils/Store';

const HomePage: MyPage = ({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

    const { state, dispatch } = useContext(StoreContext);
    const router = useRouter();

    const addToCartHandler = async (product: IProduct) => {
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...product, quantity } });
        router.push('/cart');
    };

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
                        <button className='flex rounded-full bg-indigo-500 px-4 py-2 mt-4 hover:bg-indigo-400 transition ease-in-out duration-300'>
                            <SparklesIcon className='h-6 w-6 text-white mr-1' />
                            <Link href={'signup'}>
                                <h1 className='text-xl text-white'>Get Started</h1>
                            </Link>
                        </button>
                    </div>
                </div>

                <ProductControl />

                <h2 className='my-3 text-lg'>Featured Products</h2>
                {products ? (
                    <div className='grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 place-items-center'>
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
