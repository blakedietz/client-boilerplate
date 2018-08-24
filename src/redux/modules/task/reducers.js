import { handleActions } from "redux-actions";
import { createTask } from "./action-creators";

const defaultState = {
  currentTaskId: null,
  tasksById: {

  }
};

const reducer = handleActions(
  {
    [createTask]: undefined
  },
  defaultState
);

export default reducer;
