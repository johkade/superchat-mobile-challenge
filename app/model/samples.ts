import Contact from './types/contact';
import Conversation from './types/conversation';

export const sampleContact: Contact = {
  id: 123,
  firstName: 'Michael',
  lastName: 'Angelo',
  email: 'michael@angelo.com',
  phone: '+49123983128',
};

export const sampleMailConversation: Conversation = {
  id: 456,
  contactId: 123,
  conversationType: 'Mail',
};

export const sampleSmsConversation: Conversation = {
  id: 789,
  contactId: 123,
  conversationType: 'SMS',
};
