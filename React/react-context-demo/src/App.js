import React, { Component } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import { Provider } from "./context";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Andrew",
      todos: [],
      addTodo: todo => this.addTodo(todo),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  addTodo(todo) {
    const newTodo = { name: this.state.name, content: todo.content };
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  handleClick() {
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(res => this.setState({ name: res.results[0].name.first }));
  }

  render() {
    const todos = this.state.todos.map((todo, i) => (
      <li key={i}>{`${todo.name} has to ${todo.content}`}</li>
    ));
    return (
      <Provider value={this.state}>
        <div className="App">
          <h1>{this.state.name}</h1>
          <button onClick={this.handleClick}>Change name</button>
          <TodoForm />
          {todos}
        </div>
      </Provider>
    );
  }
}

export default App;
