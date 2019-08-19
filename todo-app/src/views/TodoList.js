import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import Todo from '../components/Todo';

class TodoList extends Component {
    render () {
   // const todos = this.props.todos;

    return (
      <Masonry className="todos">
       {this.props.todos.map((todo) => {
       const handleFinishTodo = () => {
          todo.finished = true;
          this.props.onEdit(todo);
        };

        const handleRemoveTodo = () => {
            this.props.onRemove(todo)};
        
        return ( 
            <Todo 
            todo={
              todo
            }
            key = {
              todo.id
            }
            onFinish = {
              handleFinishTodo
            }
            onRemove = {
              handleRemoveTodo
            }
            />)
      })}
         
      </Masonry>
    );
  }
}

export default TodoList;