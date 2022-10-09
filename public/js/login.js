/* eslint-disable */
// import { axios } from 'axios';
import axios from 'axios';

import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      console.log(res.data);
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};

export const logout = async () => {
  try {
    console.log('hhiiiiiiiiiii');

    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    //the true here is to force the reload the page from the server not from the browser cache
    if ((res.data.status = 'success')) location.assign('/login');

    //location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
