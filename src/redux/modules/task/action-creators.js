import { createActions } from "redux-actions";
import TaskModel, { states } from "./task.model";


const {
  createTaskCommit,
  createTaskRollback,
} = createActions({
  CREATE_TASK_COMMIT: undefined,
  CREATE_TASK_ROLLBACK: undefined
});

const {
  createTask
} = createActions({
  CREATE_TASK: [
    // Payload creator
    ({ description, startTime, endTime }) => (new TaskModel({
      description,
      startTime,
      endTime,
      state: states.UNSTARTED
    })),
    // Meta
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
  ]
});

export {
  createTask,
  createTaskCommit,
  createTaskRollback
};