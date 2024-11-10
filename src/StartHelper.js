import log from '@apify/log';

export default class StartHelper {
    /**
     * @param {number | boolean} logLevel
     * @returns {void}
     */
    static setLogLevel(logLevel) {
        if (logLevel === log.LEVELS.DEBUG || logLevel === true) {
            log.setLevel(log.LEVELS.DEBUG);
            log.info('Verbose logging ENABLED');
        } else {
            log.setLevel(log.LEVELS.INFO);
            log.info('Verbose logging DISABLED');
        }
    }

    /**
     * @param {object} input
     * @returns {void}
     */
    static logInput(input) {
        log.debug('Input: ----');
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                log.debug(`${key} = ${JSON.stringify(input[key], null, 2)}`);
            }
        }
        log.debug('---------');
    }
}
