import { SAVE_ENTIRE_STATE } from "./actionTypes";

export const saveEntireState = (state) => {
  return {
    type: SAVE_ENTIRE_STATE,
    payload: state,
  };
};
