import { SAVE_ENTIRE_STATE } from "../action/actionTypes";

const initialState = {
  message: "",
  userInput: "",
  btn1: "",
  btn2: "",
  isNodeClicked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ENTIRE_STATE:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
