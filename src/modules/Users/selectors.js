/**
 * Import Dependencies
 */
import { createSelector } from "reselect";

/**
 * Select the portion of the root reducer
 */
const UserReducer = () => state => state.get("user");

/**
 * Get Posts
 *
 * @return {Array}
 */
export const getUser = () =>
  createSelector(
    UserReducer(),
    
    state => {
       // console.log("hi")
        //console.log(state.get("user"))
      const d = state.get("user");
      return !d || d.__altered == false ? d.toJS() : d;
    }
  );
