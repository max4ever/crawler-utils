import { Actor, Dataset } from 'apify';
import log from '@apify/log';

class DatataSetUtils {
    /** @param {string} datasetName */
    static async getEmptyDataset(datasetName) {
        let datasetOut = await Actor.openDataset(datasetName);
        log.debug(`Deleting ${datasetName} output dataset`);
        await datasetOut.drop();
        log.debug(`Open ${datasetName} named dataset again`);
        return await Actor.openDataset(datasetName);
    }

    /**
     * @param {string} datasetName
     * @param {number} limit
     * @returns {Promise<Map<string, object>>}
     */
    static async getBigDataset(datasetName, limit = 120) {
        let dataset = await Dataset.open(datasetName);

        let offset = 0;
        let map = new Map();
        let rows;
        do {
            log.debug(`Getting ${limit} rows from ${offset}`);
            rows = await dataset.getData({ limit: limit, offset: offset });
            for (const item of rows.items) {
                map.set(item.ISIN, item);
            }
            offset += limit;
        } while (rows.items.length > 0);

        return map;
    }

    /**
     * @param {string} toDatasetName
     * @returns {Promise<void>}
     */
    static async copyDefaultToDataset(toDatasetName) {
        log.debug('Copying data to static dataset');

        const datasetOut = await this.getEmptyDataset(toDatasetName);
        const datasetFrom = await Actor.openDataset();

        await datasetFrom.getInfo().then(info => log.info(`Found ${info?.itemCount} to be copied from ${info?.name}`));

        await datasetFrom.forEach(async item => {
            await datasetOut.pushData(item);
        });

        const info = await datasetOut.getInfo();
        log.info(`Copied ${info?.itemCount} items to ${toDatasetName}`);
    }

    /**
     * @param {string} datasetName
     * @param {number} batchLimit
     * @returns {AsyncGenerator<object>}
     */
    static async *getDatasetIterator(datasetName, batchLimit = 10) {
        let dataset = await Dataset.open(datasetName);
        let offset = 0;
        let rows;
        do {
            rows = await dataset.getData({ limit: batchLimit, offset: offset });
            for (const row of rows.items) {
                yield row;
            }
            offset += batchLimit;
        } while (rows.items.length > 0);
    }
}

export default DatataSetUtils;
