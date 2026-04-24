declare const _default: () => {
    port: number;
    nodeEnv: string;
    app: {
        url: string;
    };
    database: {
        url: string | undefined;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    mail: {
        host: string;
        port: number;
        user: string | undefined;
        pass: string | undefined;
        from: string | undefined;
    };
    frontendUrl: string;
};
export default _default;
