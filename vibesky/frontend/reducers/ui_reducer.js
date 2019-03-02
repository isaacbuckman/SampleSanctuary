import { REQUEST_TRACK_FETCH } from '../actions/track_actions'; 
import { RECEIVE_TRACK } from '../actions/comment_actions';

const UIReducer = (state = {loading: false}, action) => {
    Object.freeze(state);
    switch(action.type){
        case REQUEST_TRACK_FETCH:
            return {loading: true};  
        case RECEIVE_TRACK: 
            return {loading: false}; 
        default:
            return state; 
    }
};


export default UIReducer; 