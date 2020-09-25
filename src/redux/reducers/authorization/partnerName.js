import { SETPARTNERNAME } from '@redux/constants';

export default (state = null,  action) => {
    switch (action.type) {
        case SETPARTNERNAME:
            return action.payload;
        default:
            return state;
    }
}