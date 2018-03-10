import axios from 'axios';

export const registerUser = (emailID, userName, hashPassword) => axios.post('/api/create', { emailID, userName, hashPassword })
  .then(resp => resp.data);

export const loginUserDetail = (userName, hashPassword) => axios.post('/api/logindetail', { userName, hashPassword })
  .then((resp) => {
    if (resp.data.redirect === 'yes') {
      window.location = resp.data.page;
      return '';
    }
    return resp.data.page;
  });

