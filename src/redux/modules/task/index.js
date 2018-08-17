import "rxjs";
import { createActions, handleActions } from "redux-actions";


const {
  createTaskCommit,
  createTaskRollback
} = createActions({
  CREATE_TASK_COMMIT: undefined,
  CREATE_TASK_ROLLBACK: undefined
});

const {
  createTask
} = createActions({
  CREATE_TASK: [
    undefined,
    () => ({
      offline: {
        // the network action to execute:
        effect: { url: "http://localhost:3000/pomodoro", method: "POST" },
        // action to dispatch when effect succeeds:
        commit: createTaskCommit(),
        // action to dispatch if network action fails permanently:
        rollback: createTaskRollback()
      }
    })
  ],
});

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
