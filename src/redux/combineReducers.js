import {combineReducers} from "redux";

import mobgetcurrenciesinfo     from "@redux/reducers/mobgetcurrenciesinfo";
import isPartnerAuthorized     from "@redux/reducers/authorization/login";

export default combineReducers({
    mobgetcurrenciesinfo,
    isPartnerAuthorized
});