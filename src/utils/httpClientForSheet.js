import axios from 'axios';
import { JWT } from 'google-auth-library';

const spreadSheet = process.env.GOOGLE_SPREAD_SHEET_ID;
const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const key = process.env.GOOGLE_PRIVATE_KEY;
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new JWT({ email, key: key.replace(/\\n/gm, '\n'), scopes });
const headers = await auth.getRequestHeaders();

export const httpClientForSheet = axios.create({
  baseURL: `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheet}/values/`,
  headers: headers,
});
