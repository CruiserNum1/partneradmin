import { SETTRANSACTIONS } from "@redux/constants";
import { getTransactions } from "@requests/authorization/getTransactions";

export default (dataObj, successCallback) => dispatch => {
    const singleTon = getTransactions.getInstance();

    singleTon.request(dataObj);

    singleTon.response((data) => {
        const payload = data.d;

        window.req = Object.assign(window.req || {}, {[SETTRANSACTIONS]: payload});

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({type: SETTRANSACTIONS, payload: payload});
    });
}