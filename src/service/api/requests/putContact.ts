import CONFIG from '../../../const/config';
import Contact from '../../../model/types/contact';

const axios = require('axios').default;

const putContact = (data: Contact) => {
  const endpoint = `/contacts?id=${data.id}`;
  const dataWithoutId = {...data, id: undefined};
  return axios.post(CONFIG.BASE_URL + endpoint, dataWithoutId);
};
export default putContact;
