import { MOBGETCURRENCIESINFO } from "@redux/constants";
import { mobgetcurrenciesinfo } from "@requests/mobgetcurrenciesinfo";

export default (successCallback) => dispatch => {
    const singleTon = mobgetcurrenciesinfo.getInstance();

    singleTon.request();

    singleTon.response((data) => {
        const payload = data;

        window.req = Object.assign(window.req || {}, { [MOBGETCURRENCIESINFO]: payload });

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({ type: MOBGETCURRENCIESINFO, payload: payload });
    });
}