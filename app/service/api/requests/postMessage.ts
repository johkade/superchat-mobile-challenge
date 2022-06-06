import CONFIG from '../../../const/config';

const axios = require('axios').default;

const postMessage = (data: {payload: string; conversationId: number}) => {
  return axios.post(CONFIG.BASE_URL + '/messages', data);
};
export default postMessage;
