export const getFutureUnixTimestamp = (minutes) => {
  const seconds = typeof minutes !== 'number' ? 0 : minutes * 60;
  const currentTimestamp = Math.floor(Date.now() / 1000); // 초 단위로 변환

  return currentTimestamp + seconds;
};
