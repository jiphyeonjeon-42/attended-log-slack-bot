import {  sendMeetingConfirmation } from '../services/meeting.js';
import { receiveSlackInteraction } from '../services/slackInteraction.js';

export const handleTriggers = async (event) => {
  const trigger = event?.rawPath?.slice(1,) ?? "meetings";

  const Tasks = {
    slack: () => receiveSlackInteraction(event),
    meetings: () => sendMeetingConfirmation(),
  };

  await Tasks[trigger]();
};
