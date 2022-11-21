import "dotenv/config";

export default {
    secret_token: process.env.JWT_SECRET_TOKEN,
    expires_in_token: "1d",

    secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
    expires_in_refresh_token: "15d",

    expires_refresh_token_days: 15,
};
