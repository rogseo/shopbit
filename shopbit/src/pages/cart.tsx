
import { MyPage } from "../../components/common/types";
import React, { useContext } from "react";

import { actionTypes, StoreContext } from "../utils/Store";
import NextLink from "next/link";
import dynamic, { LoaderComponent } from "next/dynamic";
import Image from "next/image";
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
} from "@mui/material";
import axios from "axios";
import { IProduct } from "../../models/Product";
import { useRouter } from "next/router";
const CartPage: MyPage = () => {

  const router = useRouter()
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
    const quantity=Number(qty);
    dispatch({ type: actionTypes.CART_ADD_ITEM, payload: { ...item, quantity } });
  };

  const removeItemHandler = (item: IProduct) => {
    dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: item });
  };

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  return (

    <div className="container">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {
        cartItems.length === 0 ? (
          <div>
            Cart is empty.{' '}
            <NextLink href="/" passHref>
              <Link>Go shopping</Link>
            </NextLink>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full ">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <div
                              className='m-2 bg-contain bg-center h-40 bg-no-repeat place-items-center'
                              style={{ backgroundImage: `url(${item.image})` }}
                            />

                          </Link>
                        </NextLink>
                      </td>
                      <td className="p-5 text-right">
                        <select
                        className="bg-white"
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
                      </select></td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          remove
                          {/* <XCircleIcon className="h-5 w-5"></XCircleIcon> */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal (
                    {(cartItems as Array<IProduct>).reduce(
                      (a, c) => a + c.quantity, 0

                    )}{" "}
                    items) : $
                    {(cartItems as Array<IProduct>).reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/shipping')}
                    className="primary-button w-full"
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

        )}


    </div>

  );

};
export default CartPage;
CartPage.Layout = "Main"



//export default dynamic<any>(() => Promise.resolve(CartPage) as LoaderComponent<any>, { ssr: false });