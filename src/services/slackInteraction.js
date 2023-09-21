import { ATTENDED } from '../constants/events.js';
import { successMessage } from '../messages/successMessage.js';
import { parseEventBody } from '../utils/eventBody.js';
import { sendBlocks } from '../utils/slackChat.js';

export const receiveSlackInteraction = async (event) => {
  const body = parseEventBody(event);
  const payload = JSON.parse(body.payload);
  const [result, ...rest] = payload.actions[0].value.split(' ');

  if (result !== ATTENDED) {
    return;
  }

  const [type, date] = rest;
  const userId = payload.user.id;

  // TODO 기록하는 로직 추가

  await sendBlocks(userId, successMessage(type, date));
};
