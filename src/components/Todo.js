import React, { Component } from 'react';
import './Todo.css';
import Task from '../models/Task';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], inputText: "" };

    this.addTask = this.addTask.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("todo")) {
      localStorage.setItem("todo", JSON.stringify({ tasks: [] }));
    }

    this.setState({ tasks: JSON.parse(localStorage.getItem("todo")).tasks });
  }

  render() {
    return (
      <div className="Todo">
        <h1>Todo</h1>

        <form onSubmit={this.addTask}>
          <input type="text" value={this.state.inputText} onChange={this.updateInputText} />
          <input type="submit" value="add" />
        </form>

        <ul>
          {this.state.tasks.map(task => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  addTask(e) {
    e.preventDefault();

    if (!this.state.inputText.trim()) {
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("todo")).tasks;
    const newTask = new Task(this.state.inputText);
    const updatedTasks = tasks.concat(newTask);
    localStorage.setItem("todo", JSON.stringify({ tasks: updatedTasks }));
    this.setState({
      tasks: updatedTasks,
      inputText: "",
    });
  }

  updateInputText(e) {
    this.setState({ inputText: e.target.value });
  }
}

export default Todo;
