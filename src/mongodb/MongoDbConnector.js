import { MongoClient, ServerApiVersion } from 'mongodb';
import { log } from 'apify';

export default class MongoDbConnector {
    /** @type {string} */
    #uri;

    /** @type {MongoClient} */
    #client;

    /** @param {string} uri */
    constructor(uri) {
        this.#uri = uri;
    }

    /** @returns {Promise<MongoClient>} */
    async getClient() {
        if (!this.#client) {
            this.#client = await this.#connect();
        }

        return this.#client;
    }

    /**
     * @param {string} databaseName
     * @returns {Promise<import('mongodb').Db>}
     */
    async getDb(databaseName) {
        const client = await this.getClient();
        const db = client.db(databaseName);
        if (!db) {
            throw new Error('Database not initialized!');
        }

        return db;
    }

    async #connect() {
        const client = new MongoClient(this.#uri);
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        log.debug('Pinged your deployment. You successfully connected to MongoDB!');

        return client;
    }

    async close() {
        await this.#client.close();
    }
}
