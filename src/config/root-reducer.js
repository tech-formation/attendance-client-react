import { combineReducers } from "redux-immutable";

import UserReducer from "modules/Users/reducers";

const reducers = combineReducers({
    user: UserReducer
});

export default reducers;