import uuidv4 from "uuid/v4";

class Task {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }
}

export default Task;
