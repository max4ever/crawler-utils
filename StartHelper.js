import log from "@apify/log";
import axios from "axios";

let optionalAxiosRetry;
try {
  optionalAxiosRetry = require("axios-retry");
} catch (e) {
  log.warning("axios-retry not found");
}

class StartHelper {
  /**
   * @param {number | boolean} logLevel
   * @returns {void}
   */
  static setLogLevel(logLevel) {
    if (logLevel === log.LEVELS.DEBUG || logLevel === true) {
      log.setLevel(log.LEVELS.DEBUG);
      log.info("Verbose logging ENABLED");
    } else {
      log.setLevel(log.LEVELS.INFO);
      log.info("Verbose logging DISABLED");
    }
  }

  /**
   * @param {object} input
   * @returns {void}
   */
  static logInput(input) {
    log.debug("Input: ----");
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        log.debug(`${key} = ${JSON.stringify(input[key], null, 2)}`);
      }
    }
    log.debug("---------");
  }

  /**
   * @param {number} nrOfRetries
   * @returns {void}
   */
  static initAxios(nrOfRetries = 30) {
    if (!optionalAxiosRetry) {
      log.warning("axios-retry not found");
      return;
    }
    optionalAxiosRetry(axios, {
      retries: nrOfRetries,
      retryDelay: (retryCount) => {
        log.error(`Retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
      },
    });
    log.debug("Axios retry initialized");
  }
}

export default StartHelper;
