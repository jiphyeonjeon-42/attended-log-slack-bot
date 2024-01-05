import { sendMeetingConfirmation } from './src/services/meeting.js';
import { sendShiftConfirmation } from './src/services/shift.js';
import { receiveSlackInteraction } from './src/services/slackInteraction.js';

const Tasks = {
  slack: (event) => receiveSlackInteraction(event),
  meetings: () => sendMeetingConfirmation(),
  shifts: () => sendShiftConfirmation(),
};

export const handler = async (event) => {
  try {
    const trigger = event?.rawPath?.slice(1) ?? 'meetings';
    console.log(`Triggered by ${trigger}`);
    await Tasks[trigger](event);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
  return { statusCode: 200, body: 'successed' };
};
