import { default as pino, Logger } from 'pino';

export default (): Logger =>
    pino({
        name: 'fight-club',
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'HH:MM:ss',
            },
        },
    });
