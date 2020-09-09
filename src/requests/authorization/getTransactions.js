import BaseRequest from "@requests";
import { GET_TRANSACTIONS } from '../constants';

export const getTransactions = class extends BaseRequest {
    /**
     * For single ton
     */
    static getInstance() {
        return new this;
    }

    /**
     * constructor
     */
    constructor() {
        super();

        this._dataCallback = [];
    }

    /**
     * Response
     */
    response(successCallback, failCallback) {
        const shift = this._dataCallback.shift();
        if(shift) {
            if(typeof successCallback === 'function') {
                shift.promise.then(successCallback);
            }

            if(typeof failCallback === 'function') {
                shift.promise.catch(failCallback);
            } else {
                shift.promise.catch(() => {
                    setTimeout(() => {
                        this.request(...shift.arguments);
                        this.response(successCallback);
                    }, 20000);
                });
            }
        }
    }

    /**
     * Request
     */
    request() {
        this._dataCallback.push({
            arguments: arguments,
            promise: new Promise((resolve, reject) => {
                this.post(GET_TRANSACTIONS, {
                    info: {}
                }).then((response) => {
                    if(typeof response['data'] !== 'undefined') {
                        resolve(response['data']);
                    } else {
                        reject(response);
                    }
                }).catch((error) => {
                    reject(error);
                });
            })
        });
    }
};
