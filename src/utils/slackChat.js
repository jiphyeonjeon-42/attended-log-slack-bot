import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

export const sendText = async (to, text) => {
  await web.chat
    .postMessage({
      token,
      channel: to,
      text,
    })
    .then(() => console.log(to, text, '메세지를 보냈습니다. '));
};

export const sendBlocks = async (to, blocks) => {
  await web.chat
    .postMessage({
      token,
      channel: to,
      blocks,
    })
    .then(() =>
      console.log(to, JSON.stringify(blocks), ' 메세지를 보냈습니다. ')
    );
};
