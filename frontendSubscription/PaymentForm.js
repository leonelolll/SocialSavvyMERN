// // import React, { useState } from 'react';
// import {loadStripe, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// const stripePromise = loadStripe('pk_test_51POKtIKQg5ex9zFSn0xw6QzstJNaG19kBEbljR6i0JmI7EYLYMuXlfKTU4zoulCCpQIyBzyGzQK9F7khMe8hhLtf00zdkBnTRS');

// function PaymentForm() {
//     const stripe = useStripe();
//     const elements = useElements();
    
//     useEffect(() => {
//         // Example: Fetch client secret from your API endpoint
//         fetch('/get-client-secret') // Replace with your actual endpoint
//           .then((response) => response.json())
//           .then((data) => {
//             setClientSecret(data.clientSecret);
//           })
//           .catch((error) => {
//             console.error('Error fetching client secret:', error);
//           });
//       }, []);
    
    
    
    
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       if (!stripe || !elements) {
//         return;
//       }
  
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Card Holder',
//           },
//         },
//       });
  
//       if (error) {
//         console.log(error.message);
//       } else {
//         console.log('Payment successful!', paymentIntent);
//         // Display success message or handle the payment success
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe}>Pay Now</button>
//       </form>
//     );
//   }
  
//   export default PaymentForm;
