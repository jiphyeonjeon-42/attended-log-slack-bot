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

  const [todayLibrarians, todayLibrariansId] =
    await getTodayLibrariansFromTogether();

  await Promise.all(todayLibrariansId.map((id) => sendBlocks(id, message)));
  console.log('shift', todayLibrarians);
};

const getTodayLibrariansFromTogether = async () => {
  const rotations = await httpClientForTogether
    .get('/')
    .then((response) => response.data);

  return rotations.reduce(
    ([name, slack], { nickname, slackMemberId }) => [
      [...name, nickname],
      [...slack, slackMemberId],
    ],
    [[], []]
  );
};
