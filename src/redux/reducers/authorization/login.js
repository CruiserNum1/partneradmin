import { ISPARTNERAUTHORIZED } from '@redux/constants';

export default (state = null,  action) => {
    switch (action.type) {
        case ISPARTNERAUTHORIZED:
            return action.payload;
        default:
            return state;
    }
}