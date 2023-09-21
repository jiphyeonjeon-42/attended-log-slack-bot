import { handleTriggers } from './src/utils/triggers.js';

export const handler = async (event) => {
  await handleTriggers(event);

  const response = { statusCode: 200, body: 'successed' };
  return response;
};
