import { SETTRANSACTIONS } from '@redux/constants';

export default (state = null,  action) => {
    switch (action.type) {
        case SETTRANSACTIONS:
            return action.payload;
        default:
            return state;
    }
}