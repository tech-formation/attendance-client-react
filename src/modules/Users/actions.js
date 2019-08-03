import { SET_USER } from "./constants";

export const setUser = ( data = {} ) => {
    //console.log(data);
    return { type: SET_USER, data };
}