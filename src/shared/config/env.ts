import 'dotenv/config';

const getRequiredEnv = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required env variable: ${name}`);
    }

    return value;
};

export const serverEnv = {
    databaseUrl: getRequiredEnv('DATABASE_URL'),
    directUrl: process.env.DIRECT_URL,
};
