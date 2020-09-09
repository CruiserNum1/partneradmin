import { SETMAINPARAMS } from "@redux/constants";
import { getMainParams } from "@requests/authorization/getMainParams";

export default (successCallback) => dispatch => {
    const singleTon = getMainParams.getInstance();

    singleTon.request();

    singleTon.response((data) => {
        const payload = data.d;

        window.req = Object.assign(window.req || {}, {[getMainParams]: payload});

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({type: SETMAINPARAMS, payload: payload});
    });
}