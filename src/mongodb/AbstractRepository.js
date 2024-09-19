import { Db } from 'mongodb';

//TODO improve the protected properties way of hiding them
export default class AbstractRepository {
    /** @type {Db} */
    _mongoDb;

    /* @type {string} */
    _collectionName;

    /**
     * @param {Db} mongoDb
     * @param {string} collectionName
     */
    constructor(mongoDb, collectionName) {
        if (new.target === AbstractRepository) {
            throw new TypeError('Cannot construct AbstractRepository instances directly');
        }

        this._mongoDb = mongoDb;
        this._collectionName = collectionName;
    }
}
