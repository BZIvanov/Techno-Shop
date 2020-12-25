import { useState, useEffect } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [user.token]);

  const handleSubmit = async (e) => {
    //
  };

  const handleChange = async (e) => {
    //
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripeCheckout;
