import { decemberRotation } from '../constants/decemberRotation.js';
import { SHIFT, SHIFT_WEEKEND } from '../constants/events.js';
import { TOGETHER_RANGE } from '../constants/sheet.js';
import { confirmMessage } from '../messages/confirmMessage.js';
import {
  httpClientForSheet,
  httpClientForTogether,
} from '../utils/httpClient.js';
import { sendBlocks } from '../utils/slackChat.js';

const WEEKS = [1, 2, 3, 4, 5];

export const sendShiftConfirmation = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const isInWeekdays = WEEKS.includes(new Date().getDay());
  const message = confirmMessage(
    isInWeekdays ? SHIFT : SHIFT_WEEKEND,
    today.slice(5, 10)
  );

  const todayLibrarians = decemberRotation[today];
  const todayLibrariansId = await getLibrariansIdFromSheet(todayLibrarians);

  await Promise.all(todayLibrariansId.map((id) => sendBlocks(id, message)));
};

const getLibrariansIdFromSheet = async (targets) => {
  const librarians = await httpClientForSheet
    .get(`/${TOGETHER_RANGE}`)
    .then((response) => response.data.values); // [[NAME, SLACK_ID], [NAME, SLACK_ID], ...] 형식으로 반환됨

  return librarians
    .filter((item) => targets.includes(item[0]))
    .map((item) => item[1]);
};
