import CONFIG from '../../../const/config';
import Message from '../../../model/types/message';

const axios = require('axios').default;

const getMessages = async (conversationId: number): Promise<Message[]> => {
  const response = await axios.get(
    CONFIG.BASE_URL + `/messages?conversationId=${conversationId}`,
  );
  return Promise.resolve(response.data);
};
export default getMessages;
