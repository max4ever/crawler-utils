import log from '@apify/log';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export default class AxiosHelper {
    /**
     * @param {number} nrOfRetries
     * @returns {void}
     */
    static initAxiosRetry(nrOfRetries = 30) {
        axiosRetry(axios, {
            retries: nrOfRetries,
            retryDelay: retryCount => {
                log.error(`Retry attempt: ${retryCount}`);
                return retryCount * 2000; // time interval between retries
            },
        });
        log.debug('Axios retry initialized');
    }
}
