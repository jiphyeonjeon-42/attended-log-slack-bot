import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

export const sendText = async (to, text) => {
  await web.chat.postMessage({
    token,
    channel: to,
    text,
  });
};

export const sendBlocks = async (to, blocks) => {
  await web.chat.postMessage({
    token,
    channel: to,
    blocks,
  });
};
