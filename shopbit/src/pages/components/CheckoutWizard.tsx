import { Step, StepLabel, Stepper, ThemeProvider } from '@mui/material';
import theme from '@/utils/palette';
import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
    return (
        <ThemeProvider theme={theme}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </ThemeProvider>
    );
}
