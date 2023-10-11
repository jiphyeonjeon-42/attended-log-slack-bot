import { ATTENDED } from '../constants/events.js';
import { ATTENDTYPE, RAW_SHEET } from '../constants/sheet.js';
import { successMessage } from '../messages/successMessage.js';
import { parseEventBody } from '../utils/eventBody.js';
import { httpClientForSheet } from '../utils/httpClient.js';
import { sendBlocks } from '../utils/slackChat.js';

export const receiveSlackInteraction = async (event) => {
  const body = parseEventBody(event);
  const payload = JSON.parse(body.payload);
  const [result, ...rest] = payload.actions[0].value.split(' ');

  if (result !== ATTENDED) {
    return;
  }

  const [type, date] = rest;
  const { name, id } = payload.user;

  await appendRecord(type, date, name).then(async () => {
    await sendBlocks(id, successMessage(type, date));
  });
};

const appendRecord = async (type, date, user) => {
  await httpClientForSheet.post(
    `/${RAW_SHEET}:append?valueInputOption=USER_ENTERED`,
    { values: [[ATTENDTYPE[type], date, user, '', true]] }
  );
};
