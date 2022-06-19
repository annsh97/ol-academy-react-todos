import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      todos: [],
      error: "",
    };
  }
  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  // კომპონენტი 5
  addItem(id, tittle) {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
      isCheckboxed: false,
      isDone: false,
    };

    const todos = [...this.state.todos];

    todos.push(newItem);

    this.setState({
      todos,
      newItem: "",
    });
  }

  deleteItem(id) {
    const todos = [...this.state.todos];

    const updatedTodos = todos.filter((item) => item.id !== id);

    this.setState({ todos: updatedTodos });
  }
  editItem = (id) => {
    const filterItems = this.state.todos.filter((item) => item.id !== id);

    const selectItem = this.state.todos.find((item) => item.id === id);

    this.setState({
      todos: filterItems,
      id: id,
      newItem: selectItem.value,
    });
  };

  deleteAll(id) {
    const todos = [...this.state.todos];

    const updatedTodos = todos.filter((item) => item.id === id);

    this.setState({ todos: updatedTodos });
  }

  isCheckboxed = (e) => {
    const isCheckboxedArray = this.state.todos.map((todo) => {
      if (e.target.parentElement.childNodes[0].textContent === todo.value) {
        return {
          ...todo,
          isCheckboxed: !todo.isCheckboxed,
        };
      }
      return todo;
    });
    this.setState({ todos: isCheckboxedArray });
  };
  taskIsDone = (e) => {
    const isDoneTodo = this.state.todos.map((todo) => {
      if (todo.id === e) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });
    this.setState({ todos: isDoneTodo });
    console.log(isDoneTodo);
  };

  deleteAllFinishedTask = () => {
    const newTodos = this.state.todos.filter((todo) => todo.isDone !== true);
    this.setState({
      todos: newTodos,
    });
  };

  deleteCheckboxedTask = () => {
    const newTodos = this.state.todos.filter(
      (todo) => todo.isCheckboxed !== true
    );
    this.setState({
      todos: newTodos,
    });
  };

  render() {
    return (
      <div>
        <h1 className="app-title">To Do List</h1>

        <div className="container">
          <div
            style={{
              padding: 40,
              textAlign: "center",
              maxWidth: 500,
              margin: "auto",
              color: "rgb(194, 222, 206)",
            }}
          >
            Add an Item...
            <br />
            <input // კომპონენტი 3.0
              type="text"
              placeholder="Type here..."
              value={this.state.newItem}
              onChange={(e) => this.updateInput("newItem", e.target.value)}
            />
            <button // კომპონენტი 4.1, 4.2.
              type="submit"
              className="add-btn btn-floating"
              onClick={() => this.addItem()}
              disabled={!this.state.newItem.length}
            >
              <i className="material-icons">add</i>
            </button>
            <br /> <br />
            <ul>
              {this.state.todos.map((item) => {
                return (
                  <li key={item.id}>
                    {item.value}

                    <input
                      type="checkbox"
                      onClick={(event) => this.isCheckboxed(event)}
                    />
                    <button
                      className="btn btn-floating"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>

                    <button
                      className="btn btn-floating"
                      onClick={() => this.editItem(item.id)}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      className={item.isDone ? "floating" : "btn btn-floating"}
                      onClick={() => this.taskIsDone(item.id)}
                    >
                      <i className="material-icons">Complete</i>
                    </button>
                  </li>
                );
              })}
              <br></br>
              <button className="button" onClick={() => this.deleteAll()}>
                <i class="material-icons">Delete All</i>
              </button>
              <br></br>
              <button
                className="button"
                color="red"
                onClick={() => this.deleteAllFinishedTask()}
              >
                <i class="material-icons">Delete Done Todos</i>
              </button>
              <br></br>
              <button
                className="button"
                onClick={() => this.deleteCheckboxedTask()}
              >
                <i class="material-icons">Delete CheckBoxed Tasks</i>
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Todo;
