import { ISPARTNERAUTHORIZED, SETPARTNERNAME, SETMAINPARAMS, SETTRANSACTIONS, SETLOADING } from "@redux/constants";
import { partnerLogout } from "@requests/authorization/logout";

export default (successCallback) => dispatch => {
    const singleTon = partnerLogout.getInstance();

    singleTon.request();

    singleTon.response((data) => {
        const payload = data.d;

        window.req = Object.assign(window.req || {}, { [ISPARTNERAUTHORIZED]: payload });

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({ type: ISPARTNERAUTHORIZED, payload: payload === 1 ? false : null });

        if (payload === 1) {
            dispatch({ type: SETPARTNERNAME, payload: null });
            dispatch({ type: SETLOADING, payload: true });
            dispatch({ type: SETMAINPARAMS, payload: null });
            dispatch({ type: SETTRANSACTIONS, payload: null });
        }
    });
}