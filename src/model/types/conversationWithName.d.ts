type ConversationWithName = {
  id: number;
  contactId: number;
  conversationType: 'MAIL' | 'SMS';
  first_name: string;
  last_name: string;
};
export default ConversationWithName;
