import {combineReducers} from "redux";

import mobgetcurrenciesinfo     from "@redux/reducers/mobgetcurrenciesinfo";
import getCashInfo              from "@redux/reducers/getCashInfo";
import isPartnerAuthorized      from "@redux/reducers/authorization/login";
import partnerName              from "@redux/reducers/authorization/partnerName";
import mainParams               from "@redux/reducers/authorization/getMainParams";
import transactions             from "@redux/reducers/authorization/getTransactions";
import isLoading                from "@redux/reducers/setLoading";

export default combineReducers({
    mobgetcurrenciesinfo,
    getCashInfo,
    isPartnerAuthorized,
    partnerName,
    mainParams,
    transactions,
    isLoading
});