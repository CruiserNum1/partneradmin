import {combineReducers} from "redux";

import mobgetcurrenciesinfo     from "@redux/reducers/mobgetcurrenciesinfo";
import isPartnerAuthorized      from "@redux/reducers/authorization/login";
import mainParams               from "@redux/reducers/authorization/getMainParams";
import transactions             from "@redux/reducers/authorization/getTransactions";
import isLoading                from "@redux/reducers/setLoading";

export default combineReducers({
    mobgetcurrenciesinfo,
    isPartnerAuthorized,
    mainParams,
    transactions,
    isLoading
});