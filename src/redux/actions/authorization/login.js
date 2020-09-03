import { ISPARTNERAUTHORIZED } from "@redux/constants";
import { partnerLogin } from "@requests/authorization/login";

export default (partnerName, secret, successCallback) => dispatch => {
    const singleTon = partnerLogin.getInstance();

    singleTon.request(partnerName, secret);

    singleTon.response((data) => {
        const payload = data.d;

        window.req = Object.assign(window.req || {}, {[ISPARTNERAUTHORIZED]: payload});

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({type: ISPARTNERAUTHORIZED, payload: payload});
    });
}