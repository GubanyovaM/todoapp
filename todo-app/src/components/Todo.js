import React, { Component } from 'react';
import TodoButtons from './TodoButtons';
import axios from '../axios';


class Todo extends Component {
    renderText = () => {
        const { text } = this.props.todo;
        if (!text) return null;

        return ( 
            <div className="card-text" dangerouslySetInnerHTML={{ __html: text }} />
        )
    };

    handleFinish = async () => {
        await axios.patch('/todos/' + this.props.todo.id, {
            finished: true
        });
        this.props.onFinish()
    };

    handleRemove = async () => {
        await axios.delete('/todos/' + this.props.todo.id, {
             finished: true
        });
        this.props.onRemove();
    };

    render() {
        const { title, createdAt, finished } = this.props.todo;
        let classes = 'card';
        if (finished) classes += ' border-warning';

        return (
            <div className="todo mb-2">
                <div className = {classes}>
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Created at:  {createdAt}
                        </h6>
                        {this.renderText()}
                        < TodoButtons todo = {
                            this.props.todo
                        }
                        finished = {
                            finished
                        }
                        onFinish = {
                            this.handleFinish
                        }
                        onRemove = {
                            this.handleRemove
                        }
                        />
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;