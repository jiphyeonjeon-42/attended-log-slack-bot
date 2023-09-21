import { sendText } from './src/utils/slackChat';

export const handler = async (event) => {
  const to = process.env.TEST_CHANNEL;
  await sendText(to, 'test');

  const response = { statusCode: 200, body: 'successed' };
  return response;
};
