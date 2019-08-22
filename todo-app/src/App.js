import React, { Component } from 'react';
import moment from 'moment';
import axios from './axios';
import findIndex from 'lodash/findIndex';
import { HashRouter, Switch, Route } from 'react-router-dom';

import AddTodo from './views/AddTodo';
import TodoList from './views/TodoList';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    const result = await axios.get('/todos');
    this.setState({todos: result.data});
   /* const todos = await axios.get('/todos.json');
    const result = [];
    console.log(todos);
   
    if (todos.data) Object.keys(todos.data).forEach(key => {
      const todo = todos.data[key];
      todo.id = key;
      result.push(todo)
    });
    this.setState({
      todos: result
    });*/
  };

  addTodo = async todo => {
    const newTodo = {
      ...todo,
     createdAt: moment().format(),
     finished: false
    };
    

    


    const result = await axios.post('/todos', newTodo);
    newTodo.id = result.data;

    this.setState(prevState =>  {
      return {
        todos: prevState.todos.concat(newTodo)
      };
    });
  };

  editTodo = (todo) => {
    const index = findIndex(this.state.todos, { id: todo.id });
    const todos = [...this.state.todos];
    todos.splice(index, 1, todo);
    this.setState({ todos: todos })
  };

  removeTodo = todo => {
    const index = findIndex(this.state.todos, { id: todo.id });
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos: todos });
  };

  render () {
    const { todos } = this.state;

    return (
      <div className="App p-3">

       <HashRouter>
         <Navbar />
         <div className="p-3">
         <Switch>
           <Route
              path="/add" render={() => <AddTodo onAdd={this.addTodo} />}
           />
           <Route
              path="/" exact render={() => <TodoList onEdit={this.editTodo} onRemove={this.removeTodo} todos={todos} />}   
           />   
         </Switch>
         </div>
       </HashRouter>
         
      </div>
    );
  }
}

export default App;
