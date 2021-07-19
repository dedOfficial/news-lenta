const winston = require('winston');

const getLogger = (module) => {
    const path = module.filename.split('/').slice(-2).join('/');

    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            })
        ]
    });
};

module.exports = getLogger;