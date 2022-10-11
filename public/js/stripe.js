/* eslint-disable */
import axios from 'axios';
/* global Stripe */
const stripe = Stripe(
  'pk_test_51Lq1EqJr2ogVrP88jSRryEfu8l6TabyzTpU1UNDNA0H47JlYUO1tVd2DWuYaAdOgTj2uZYGbxuGdXatSBbOU1Mp6008QOjWFXj'
);
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
