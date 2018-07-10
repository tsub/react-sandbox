import React, { Component } from 'react';
import './Todo.css';
import Task from '../models/Task';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], inputText: "" };

    this.addTask = this.addTask.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
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
            <div key={task.id}>
              <input type="checkbox" id={task.id} name={task.id} checked={task.checked} onChange={this.updateChecked} />
              <label htmlFor={task.id}>{task.name}</label>
            </div>
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

  updateChecked(e) {
    const tasks = JSON.parse(localStorage.getItem("todo")).tasks;
    const updatedTasks = tasks.map((task) => {
      if (task.id === e.target.id) {
        task.checked = e.target.checked;
      }

      return task;
    });

    localStorage.setItem("todo", JSON.stringify({ tasks: updatedTasks }));

    this.setState({ tasks: updatedTasks });
  }
}

export default Todo;
