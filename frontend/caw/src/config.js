const PROD = process.env.NODE_ENV === "production";
const SERVER_URL= PROD? "https://caw.dailybruin.com/api/v1": "http://localhost:5000/api/v1";

export default {
	PROD: PROD,
	SERVER_URL: SERVER_URL
}
