import { sendMeetingConfirmation } from './src/services/meeting.js';
import { receiveSlackInteraction } from './src/services/slackInteraction.js';

const Tasks = {
  slack: (event) => receiveSlackInteraction(event),
  meetings: () => sendMeetingConfirmation(),
};

export const handler = async (event) => {
  try {
    const trigger = event?.rawPath?.slice(1) ?? 'meetings';
    await Tasks[trigger](event);
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
  return { statusCode: 200, body: 'successed' };
};
