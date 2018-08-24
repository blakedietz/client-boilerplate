export const states = {
  "STARTED": "STARTED",
  "UNSTARTED": "UNSTARTED",
  "PAUSED": "PAUSED",
  "CANCELLED": "CANCELLED"
};

const possibleStates = new Map(Object.keys(states).map(key => [key, states[key]]));

class Task {
  id = null;
  name = "";
  description = "";
  startTime = null;
  endTime = null;
  state = null;

  constructor({ id, name = "", description = "", startTime = null, endTime = null, state = "" }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    if (!possibleStates.has(state)) {
      throw Error(`The given state ${state} is not a allowed.`)
    }

    this.state = state;
  }
}

export default Task;
