import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';

import Todo from '../components/Todo';

class TodoList extends Component {
    render () {
   // const todos = this.props.todos;

    return (
      <Masonry className="todos">
        <Link className="link-plus card plus todo mb-2" to="/add">
         <GoPlus className="addTodoPlus" /> ADD NEW TASK 
         </Link>
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