type ConversationWithContact = {
  id: number;
  contactId: number;
  conversationType: 'MAIL' | 'SMS';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
export default ConversationWithContact;
