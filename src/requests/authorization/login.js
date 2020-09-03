import BaseRequest from "@requests";
import { LOGIN_PARTNER } from '../constants';

export const partnerLogin = class extends BaseRequest {
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
     *
     * @param partnerName
     * @param secret
     */
    request(partnerName = null, secret = null) {
        this._dataCallback.push({
            arguments: arguments,
            promise: new Promise((resolve, reject) => {
                if(partnerName && secret) {
                    this.post(LOGIN_PARTNER, {
                        partnerName: partnerName,
                        secret: secret
                    }).then((response) => {
                        if(typeof response['data'] !== 'undefined') {
                            resolve(response['data']);
                        } else {
                            reject(response);
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    reject('current arguments fail');
                }
            })
        });
    }
};
