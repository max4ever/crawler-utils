import UrlHash from './UrlHash.js';

/** A set that stores hashed values using a specified hash function, to save memory. */
class HashedSet {
    constructor(hashFunction = UrlHash.getHash) {
        this.set = new Set();
        this.hashFunction = hashFunction;
    }

    /**
     * @param {string} value
     * @returns {HashedSet}
     */
    add(value) {
        const hash = this.hashFunction(value);
        this.set.add(hash);

        return this;
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    has(value) {
        const hash = this.hashFunction(value);
        return this.set.has(hash);
    }

    get size() {
        return this.set.size;
    }
}

export default HashedSet;
