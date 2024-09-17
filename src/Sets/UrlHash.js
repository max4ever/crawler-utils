import { createHash } from 'crypto';

export default class UrlHash {
    /**
     * @param {string} data
     * @returns {string}
     */
    static getHash(data, algorithm = 'sha256') {
        return createHash(algorithm).update(data).digest('hex');
    }
}
