import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getLogger = (filename = 'application') => {
    const fileLogTransport = new transports.DailyRotateFile({
        filename: `logs/${filename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
    });

    const consoleTransport = new transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: false,
        json: false,
        colorize: true,
        format: format.printf((i) => `${i.message}`)
        // format: format.combine(
        // format.colorize(),
        // format.simple()
    
    });
    
    const logger = createLogger({
        format: format.combine(
            format.timestamp(),
            format.json(),
            format.prettyPrint()
        ),
        transports: [
            consoleTransport, // Corrected the undefined 'transport' reference
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple()
                ),
            }),
        ],
    });

    if (process.env.NODE_ENV !== 'development') {
        logger.add(fileLogTransport);
    }
    return logger;
}

export default getLogger;