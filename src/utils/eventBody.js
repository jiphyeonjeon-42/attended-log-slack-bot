export const parseEventBody = (event) => {
  const decodedString = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body;

  const contentType = event.headers['content-type'] || event.headers['Content-Type'];

  switch (contentType) {
    case 'application/json':
      return JSON.parse(decodedString);
    case 'application/x-www-form-urlencoded':
      return Object.fromEntries(new URLSearchParams(decodedString));
    default:
      return decodedString;
  }
};
