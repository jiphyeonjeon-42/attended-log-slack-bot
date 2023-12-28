import { WebClient } from '@slack/web-api';
import { getFutureUnixTimestamp } from './unixTimeStamp.js';

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

export const scheduleBlocks = async (to, blocks, fallbackMessage, minutes) => {
  await web.chat.scheduleMessage({
    token,
    channel: to,
    blocks,
    text: fallbackMessage,
    post_at: getFutureUnixTimestamp(minutes),
  });
};
