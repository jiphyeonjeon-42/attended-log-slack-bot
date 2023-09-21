export const successMessage = (type, date) => [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '집현전 동아리 활동이 기록되었습니다',
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
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '자세한 내역은 <https://docs.google.com/spreadsheets/d/1gspGUhGQ1o2sRT1RcCNANY-LvDWEiEvAOSOqDUxL-y4/|집현전 동아리 활동 기록표>에서 확인하실 수 있습니다',
    },
  },
];
