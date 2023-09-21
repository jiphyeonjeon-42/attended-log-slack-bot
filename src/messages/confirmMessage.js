import { ATTENDED } from "../constants/events.js";

export const confirmMessage = (type, date) => [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '집현전 동아리 활동 참석 확인',
    },
  },
  {
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: `활동 : ${type}`,
      },
      {
        type: 'mrkdwn',
        text: `날짜 : ${date}`,
      },
    ],
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          emoji: true,
          text: '네 활동표에 기록해주세요',
        },
        style: 'primary',
        value: ATTENDED,
      },
      {
        type: 'button',
        text: {
          type: 'plain_text',
          emoji: true,
          text: '아뇨 다음에 참석하겠습니다',
        },
        style: 'danger',
        value: 'ignore',
      },
    ],
  },
];
