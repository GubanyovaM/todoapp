import React, { Component } from 'react';
import moment from 'moment';
import axios from './axios';
import findIndex from 'lodash/findIndex';
import { HashRouter, Switch, Route } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';

import AddTodo from './views/AddTodo';
import TodoList from './views/TodoList';
import Navbar from './components/Navbar';
import AddLabel from './views/AddLabel';

class App extends Component {
  state = {
    todos: [],
  };

  async componentDidMount() {
    const result = await axios.get('/todos');
    this.setState({todos: result.data});
  };

  addTodo = async todo => {
    const newTodo = {
      ...todo,
     createdAt: moment().format(),
     finished: false,
    };

  try {
      const result = await axios.post('/todos', newTodo);
      newTodo.id = result.data;
  } catch (error) {
      console.log(error.message);
      new Promise ((resolve, reject)=> {
        throw new Error (error.message);
      }).catch(alert);
     
        return <Redirect to='/'  />
  }
 
    this.setState(prevState =>  {
      return {
        todos: prevState.todos.concat(newTodo)};
    });
  
  };

  addLabel = async label => {
    const newLabel = {
      label,
      color: ""
    };

    const res2 = await axios.post('/addlabel', newLabel);
    newLabel = res2.data;

    this.setState(prevState =>  {
      return {
        labels: prevState.labels.concat(newLabel)
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
              path="/addlabel" render={() => <AddLabel onAdd={this.addLabel} />}
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
