import { SHIFT } from '../constants/events.js';
import { TOGETHER_RANGE } from '../constants/sheet.js';
import { confirmMessage } from '../messages/confirmMessage.js';
import {
  httpClientForSheet,
  httpClientForTogether,
} from '../utils/httpClient.js';
import { sendBlocks } from '../utils/slackChat.js';

export const sendShiftConfirmation = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const message = confirmMessage(SHIFT, today.slice(5, 10));

  const todayLibrarians = await getTodayLibrariansFromTogether(today);
  const todayLibrariansId = await getLibrariansIdFromSheet(todayLibrarians);

  await Promise.all(todayLibrariansId.map((id) => sendBlocks(id, message)));
};

const getTodayLibrariansFromTogether = async (today) => {
  const ratations = await httpClientForTogether
    .get('/', { params: { month: new Date().getMonth() + 1 } })
    .then((response) => response.data);

  return ratations
    .filter((ratation) => ratation.date.includes(today))
    .map((ratation) => ratation.intraId);
};

const getLibrariansIdFromSheet = async (targets) => {
  const librarians = await httpClientForSheet
    .get(`/${TOGETHER_RANGE}`)
    .then((response) => response.data.values); // [[NAME, SLACK_ID], [NAME, SLACK_ID], ...] 형식으로 반환됨

  return librarians
    .filter((item) => targets.includes(item[0]))
    .map((item) => item[1]);
};
