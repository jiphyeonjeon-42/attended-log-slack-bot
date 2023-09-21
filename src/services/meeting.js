import { confirmMessage } from '../messages/confirmMessage.js';
import { sendBlocks } from '../utils/slackChat.js';
import { MEETING } from '../constants/events.js';

export const sendConfirmMessage = async (to) => {
  const today = new Date().toISOString().slice(5, 10);

  await sendBlocks(to, confirmMessage(MEETING, today));
};
