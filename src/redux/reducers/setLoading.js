import { SETLOADING } from '@redux/constants';

export default (state = true, action) => {
    switch (action.type) {
        case SETLOADING:
            return action.payload;
        default:
            return state;
    }
}