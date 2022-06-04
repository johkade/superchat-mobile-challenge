type Message = {
  conversationId: number;
  payload: string;
  source?: 'USER' | 'CONTACT';
  timestamp?: 'string';
};
export default Message;
