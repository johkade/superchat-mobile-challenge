import CONFIG from '../../../const/config';
import Conversation from '../../../model/types/conversation';

const axios = require('axios').default;

const getConversations = async (): Promise<Conversation[]> => {
  const response = await axios.get(CONFIG.BASE_URL + '/conversations');
  return Promise.resolve(response.data);
};
export default getConversations;
