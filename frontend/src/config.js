//export const PROD = process.env.NODE_ENV === 'production';
//export const SERVER_URL = 'http://localhost:5000/django/api/v1';
//export const SERVER_URL = "https://hoot.dailybruin.com" + '/hoot/api/v1';
//export const SERVER_URL = process.env.SITE_HOST + '/hoot/api/v1';

export const PROD = process.env.NODE_ENV === 'production';
//export const SERVER_URL = PROD ? 'https://caw.dailybruin.com/api/v1' : 'http://localhost:5000/api/v1';
export const SERVER_URL = 'http://localhost:8000/hoot/api/v1';