import axios from "axios";

const API_LINK = process.env.API_LINK || "https://indacoin.com";

/**
 * Base request class
 */
export default class {
    /**
     * Send POST request
     *
     * @param url
     * @param params
     * @param headers
     *
     * @returns {Promise}
     */
    post (url, params = {}, headers = {}) {
        headers['x-requested-with'] = 'XMLHttpRequest';

        return axios.post(API_LINK + url, params, {
            headers: headers
        });
    }

    /**
     * Send GET request
     *
     * @param url
     * @param params
     *
     * @returns {Promise}
     */
    get (url, params = {}) {
        return axios.get(API_LINK + url, params, {
            headers: {'x-requested-with': 'XMLHttpRequest'}
        });
    }
}
