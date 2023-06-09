/**
 * Hotel Website Checkout Page
 * 
 * This component represents the checkout page of the hotel website.
 * It handles the payment process using Stripe API and displays the payment form.
 * It retrieves necessary information from the query parameters and passes them to the payment form component.
 * 
 */


import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "@/components/PaymentForm";
import styles from '@/styles/checkout.module.css';
import { useRouter } from 'next/router';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');

    const router = useRouter();
    const resInfo = router.query;
    // console.log(resInfo);

    const userData = {
        fName: resInfo.fName,
        lName: resInfo.lName,
        uid: resInfo.uid,
    }
    const resData = {
        dateIn: resInfo.dateIn,
        dateOut: resInfo.dateOut,
        roomSize: resInfo.roomSize,
    }



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads using our local API
        fetch('api/stripe_intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: resInfo.price * 100, // TODO: Change amount
                payment_intent_id: '',
                
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.client_secret), setPaymentIntent(data.id);
            });
    }, []);

    const appearance = {
        theme: 'stripe',
        labels: 'floating',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            <div className={styles.background}>
            <Head>
                <title>Stripe Elements</title>
            </Head>
            <h1 className={styles.accept}>
                Accept payments with credit card
            </h1>
                <div className={styles.container}>
                    {clientSecret && (
                        <Elements options={options} stripe={stripe}>
                            <CheckoutForm paymentIntent={paymentIntent} userData={userData} resData={resData} price={resInfo.price} />
                        </Elements>
                        
                    )}
                </div>    
            </div>
        </div>
    );
}
