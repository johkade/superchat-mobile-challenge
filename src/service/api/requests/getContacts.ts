import CONFIG from '../../../const/config';
import Contact from '../../../model/types/contact';

const axios = require('axios').default;

const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(CONFIG.BASE_URL + '/contacts');
  return Promise.resolve(response.data);
};
export default getContacts;
