import React, { useContext } from "react";
import { InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import Image from "next/image";
import {
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Card,
    Button,
} from "@mui/material";

import db from "../../utils/db";
import Product from "../../../models/Product";
import { StoreContext } from "../../utils/Store";
import axios from "axios";
import { useRouter } from "next/router";
import data from "../../../src/utils/data";
import { MyPage } from "../../../components/common/types";

const ProductDetail: MyPage = ({
    product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { state, dispatch } = useContext(StoreContext);



    if (!product) {
        return <div>Product Not Found</div>;
    }

    //   const addToCartHandler = async () => {
    //     const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    //     const quantity = existItem ? existItem.quantity + 1 : 1;
    //     const { data } = await axios.get(`/api/products/${product._id}`);
    //     if (data.countInStock < quantity) {
    //       window.alert("Sorry. Product is out of stock");
    //       return;
    //     }
    //     dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    //     router.push("/cart");
    //   };

    return (
        <>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <div
                        className='m-2 bg-contain bg-center h-40 bg-no-repeat place-items-center'
                        style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {/* <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    ></Image> */}
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                         <button
                            className="primary-button w-full"
                            // onClick={addToCartHandler}
                        >
                            Add to cart
                        </button> 
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProductDetail;

ProductDetail.Layout = "Main";

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