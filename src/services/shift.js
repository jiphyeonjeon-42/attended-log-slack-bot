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

  const todayLibrarians = await getTodayLibrariansFromTogether();
  const todayLibrariansId = await getLibrariansIdFromSheet(todayLibrarians);

  await Promise.all(todayLibrariansId.map((id) => sendBlocks(id, message)));
  console.log('shift', todayLibrarians);
};

const getTodayLibrariansFromTogether = async () => {
  const rotations = await httpClientForTogether
    .get('/')
    .then((response) => response.data);

  return rotations
    .filter(
      ({ month, day }) =>
        month === new Date().getMonth() + 1 && day === new Date().getDay()
    )
    .map((rotation) => rotation.intraId);
};

const getLibrariansIdFromSheet = async (targets) => {
  const librarians = await httpClientForSheet
    .get(`/${TOGETHER_RANGE}`)
    .then((response) => response.data.values); // [[NAME, SLACK_ID], [NAME, SLACK_ID], ...] 형식으로 반환됨

  return librarians
    .filter((item) => targets.includes(item[0]))
    .map((item) => item[1]);
};
