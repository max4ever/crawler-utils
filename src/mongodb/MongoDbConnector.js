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

    async getClient() {
        if (!this.#client) {
            this.#client = await this.#connect();
        }
        return this.#client;
    }

    async #connect() {
        const client = new MongoClient(this.#uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        log.debug('Pinged your deployment. You successfully connected to MongoDB!');

        return client;
    }

    async close() {
        await this.#client.close();
    }
}
