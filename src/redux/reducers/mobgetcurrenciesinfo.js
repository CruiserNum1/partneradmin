import { MOBGETCURRENCIESINFO } from '@redux/constants';

export default (state = null,  action) => {
    switch(action.type) {
        case MOBGETCURRENCIESINFO:
            return action.payload;
        default:
            return state;
    }
}