export type ConversationType = 'MAIL' | 'SMS';
type Conversation = {
  id: number;
  contactId: number;
  conversationType: ConversationType;
};
export default Conversation;
