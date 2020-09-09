import { SETMAINPARAMS } from '@redux/constants';

export default (state = null,  action) => {
    switch (action.type) {
        case SETMAINPARAMS:
            return action.payload;
        default:
            return state;
    }
}