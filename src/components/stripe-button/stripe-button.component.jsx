import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publicShableKey =
    'pk_test_51Ict2mBx5MEH4ZLkDKHQyiUjR20k46CMCVZdfKwgr9jNv8EOAEuD90E3kvSNwjTrARaJphqrAibanvqZXrWCQ58M00lDYJ5YIA';

  const onToken = (token) => {
    console.log(token);
    alert('Payment successfull');
  };
  return (
    <StripeCheckout
      lable='Pay Now'
      name='CRWN Clothing LTD.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publicShableKey}
    />
  );
};

export default StripeCheckoutButton;
