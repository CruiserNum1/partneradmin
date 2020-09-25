import {combineReducers} from "redux";

import mobgetcurrenciesinfo     from "@redux/reducers/mobgetcurrenciesinfo";
import isPartnerAuthorized      from "@redux/reducers/authorization/login";
import partnerName              from "@redux/reducers/authorization/partnerName";
import mainParams               from "@redux/reducers/authorization/getMainParams";
import transactions             from "@redux/reducers/authorization/getTransactions";
import isLoading                from "@redux/reducers/setLoading";

export default combineReducers({
    mobgetcurrenciesinfo,
    isPartnerAuthorized,
    partnerName,
    mainParams,
    transactions,
    isLoading
});