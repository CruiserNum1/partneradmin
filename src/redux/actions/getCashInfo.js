import { GETCASHINFO } from "@redux/constants";
import { getCashInfo } from "@requests/getCashInfo";

export default (successCallback) => dispatch => {
    const singleTon = getCashInfo.getInstance();

    singleTon.request();

    singleTon.response((data) => {
        const payload = data;

        window.req = Object.assign(window.req || {}, { [GETCASHINFO]: payload });

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({ type: GETCASHINFO, payload: payload });
    });
}