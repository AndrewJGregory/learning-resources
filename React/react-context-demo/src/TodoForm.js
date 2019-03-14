import React from "react";
import { Consumer } from "./context";

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const todo = { name: this.props.name, content: this.state.content };
  //   this.setState({ todos: this.state.todos.concat([todo]) });
  // }

  render() {
    return (
      <Consumer>
        {state => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                state.addTodo(this.state);
              }}
            >
              <input
                onChange={e =>
                  this.setState({ content: e.currentTarget.value })
                }
              />
              <button type="submit">create todo</button>
            </form>
          );
        }}
      </Consumer>
    );
  }
}
