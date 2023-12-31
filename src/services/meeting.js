import {
  MEETING,
  MEETING_FALLBACK_MESSAGE,
  MEETING_MESSAGE_DELAY,
} from '../constants/events.js';
import { SLACK_ID_RANGE } from '../constants/sheet.js';
import { confirmMessage } from '../messages/confirmMessage.js';
import { scheduleBlocks } from '../utils/slackChat.js';
import { httpClientForSheet } from '../utils/httpClient.js';

export const sendMeetingConfirmation = async () => {
  const today = new Date().toISOString().slice(5, 10);
  const message = confirmMessage(MEETING, today);
  const librarians = await getLibrariansFromSheet();

  await Promise.all(
    librarians.map((librarian) =>
      scheduleBlocks(
        librarian,
        message,
        MEETING_FALLBACK_MESSAGE,
        MEETING_MESSAGE_DELAY
      )
    )
  );
  console.log('meeting', librarians);
};

const getLibrariansFromSheet = async () => {
  const librariansArray = await httpClientForSheet
    .get(`/${SLACK_ID_RANGE}`)
    .then((response) => response.data.values); // [ [], [], ["SLACK_ID"], ["SLACK_ID"], [], ["SLACK_ID"] ] 형식으로 반환됨
  return librariansArray.map(([id]) => id).filter((id) => id);
};
