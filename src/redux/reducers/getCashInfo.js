import { GETCASHINFO } from '@redux/constants';

export default (state = null,  action) => {
    switch(action.type) {
        case GETCASHINFO:
            return action.payload;
        default:
            return state;
    }
}