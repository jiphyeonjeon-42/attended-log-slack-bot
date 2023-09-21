import { sendConfirmMessage } from './src/services/meeting.js';

export const handler = async (event) => {
  const to = process.env.TEST_CHANNEL;
  await sendConfirmMessage(to)

  const response = { statusCode: 200, body: 'successed' };
  return response;
};
