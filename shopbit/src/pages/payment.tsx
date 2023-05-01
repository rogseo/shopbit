import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { MyPage } from '../../components/common/types';
import { useRouter } from 'next/router';
import { actionTypes, StoreContext } from '../utils/Store';
import CheckoutWizard from './components/CheckoutWizard';
import {
    Button,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';

const PaymentPage: MyPage = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state, dispatch } = useContext(StoreContext);
    const {
        cart: { shippingAddress },
    } = state;

    useEffect(() => {
        if (!shippingAddress?.address) {
            router.push('./shipping');
        } else {
            setPaymentMethod(Cookies.get('paymentMethod'))
        }
    }, [])

    const submitHandler = (e: React.FormEvent) => {
        // closeSnackbar();
        e.preventDefault();
        if (!paymentMethod) {
         console.log("payment method required")
        } else {
          dispatch({ type: actionTypes.SAVE_PAYMENT_METHOD, payload: paymentMethod });
          Cookies.set('paymentMethod', paymentMethod);
          router.push('/placeorder');
        }
      };

    return (
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <h1 className='text-3xl bg-slate-100/70 rounded-lg p-3'>Payment</h1>
            <CheckoutWizard activeStep={2}></CheckoutWizard>
            <form onSubmit={submitHandler}>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Payment Method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    label="PayPal"
                                    value="PayPal"
                                    control={<Radio />}
                                ></FormControlLabel>
                                <FormControlLabel
                                    label="Stripe"
                                    value="Stripe"
                                    control={<Radio />}
                                ></FormControlLabel>
                                <FormControlLabel
                                    label="Cash"
                                    value="Cash"
                                    control={<Radio />}
                                ></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            onClick={() => router.push('/shipping')}
                        >
                            Back
                        </Button>
                    </ListItem>
                </List>

            </form>




        </div>
    );
};
export default PaymentPage;
PaymentPage.Layout = 'Main';