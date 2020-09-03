import { ISPARTNERAUTHORIZED } from '@redux/constants';

export default (state = 1,  action) => {
    switch (action.type) {
        case ISPARTNERAUTHORIZED:
            return action.payload;
        default:
            return state;
    }
}