import axios from 'axios';

const registerUser = (emailID, userName, hashPassword) => axios.post('/api/create', { emailID, userName, hashPassword })
  .then(resp => resp.data);

export default registerUser;
