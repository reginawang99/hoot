export const PROD = process.env.NODE_ENV === 'production';
export const SERVER_URL = PROD ? 'https://caw.dailybruin.com/api/v1' : 'http://localhost:5000/api/v1';


