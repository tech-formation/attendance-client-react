import { SET_USER } from "./constants";
import { fromJS } from "immutable";

export const initialState = fromJS({
  user: {
    firstname: "",
    lastname: ""
  }
});

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set("user", action.data);
    default:
      return state;
  }
}

export default UserReducer;
