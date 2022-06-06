import CONFIG from '../../../const/config';
import Conversation, {
  ConversationType,
} from '../../../model/types/conversation';

const axios = require('axios').default;

const postConversation = async (data: {
  contactId: number;
  conversationType: ConversationType;
}): Promise<Conversation> => {
  const response = await axios.post(CONFIG.BASE_URL + '/conversations', data);
  return Promise.resolve(response.data);
};
export default postConversation;
