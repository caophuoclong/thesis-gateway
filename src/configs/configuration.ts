export const configuration = () => ({
    rabbitmq: process.env.RABBITMQ_SERVER,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshTokenExpireIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
});
