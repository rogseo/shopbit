import React, { useContext,useState } from 'react';
import { MyPage } from '../../components/common/types';
import CheckoutWizard from './components/CheckoutWizard';
import NextLink from "next/link";
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
    Button,
    Card,
    CircularProgress,
    List,
    ListItem,
} from '@mui/material';
import { actionTypes, StoreContext } from '../utils/Store';
const PlaceOrderPage: MyPage = () => {
    const { state, dispatch } = useContext(StoreContext);
    const {
        userInfo,
        cart: { cartItems, shippingAddress, paymentMethod } }
        = state;
    const [loading,setLoading]=useState(false);
    const placeOrderHandler=()=>{
        console.log("click");
    }



    return (
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <h1 className='text-3xl p-3'>Place Order</h1>
            <CheckoutWizard activeStep={3}></CheckoutWizard>
            <div>
                <Card>
                    <List>
                        <ListItem>shipping address</ListItem>
                        <ListItem>{shippingAddress?.fullName}, {shippingAddress?.address},{' '}
                            {shippingAddress?.city}, {shippingAddress?.postalCode},{' '}
                            {shippingAddress?.country}</ListItem>
                    </List>
                </Card>
                <Card>
                    <List>
                        <ListItem>Payment Method</ListItem>
                        <ListItem>{paymentMethod}</ListItem>

                    </List>
                </Card>
                <Card>
                    <List>
                        <ListItem>Order Items</ListItem>
                        <ListItem>
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
                                            <td className="p-5 text-right" >{item.quantity}</td>
                                            <td className="p-5 text-right">{item.price}</td>
                                            <td className="p-5">{item.action}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </ListItem>

                    </List>
                </Card>
                <Card>
                    <List>
                        <ListItem>Order Summary</ListItem>
                        <ListItem></ListItem>
                        <ListItem>
                            <Button onClick={placeOrderHandler} type="button" variant="contained" fullWidth>
                                Place Order
                            </Button>
                        </ListItem>
                        {loading && (
                            <ListItem>
                                <CircularProgress />
                            </ListItem>
                        )}

                    </List>
                </Card>
            </div>

        </div>
    );
};
export default PlaceOrderPage;
PlaceOrderPage.Layout = 'Main';