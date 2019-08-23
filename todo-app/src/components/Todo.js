import React, { Component } from 'react';
import TodoButtons from './TodoButtons';
import axios from '../axios';
import moment from 'moment';
import { FaCircle } from 'react-icons/fa';



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
        const {
            title,
            createdAt,
            finished,
            importance
        } = this.props.todo;

        let createdAtF = moment(createdAt, moment.defaultFormat).format('HH:mm, DD. MMMM YYYY');
        const diff = moment().diff(moment(createdAt), 'minutes');
        
        let classes = 'card';
        (finished) ? ( classes += ' border-finished') : (classes += ' border-unfinished');

        let faCircle = 'faCircle';
        if (importance == "LOW") {
                faCircle += ' low'
        } else if (importance == "MEDIUM") {
                faCircle += ' medium'
        } else if (importance == "HIGH") {
                faCircle += ' high'
        } else if (importance == "URGENT") {
                faCircle += ' urgent'
        }; 

        return (
            <div className="todo mb-2">
                <div className = {classes}>
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}&nbsp;&nbsp;
                            {diff <= 10 && finished === false ? (<span className="badge badge-dark">NEW</span>) : null}

                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Created at:  {createdAtF}
                        </h6>
                        {this.renderText()}
                                     
                        < TodoButtons todo = {this.props.todo}
                        finished = {finished}
                        onFinish = {this.handleFinish}
                        onRemove = {this.handleRemove}
                        />
                       
                       
                    </div>
                </div>
                <div className="card-footer">
                     {(importance) ? (<i className={faCircle}> < FaCircle /></i> ) : null }
                     <h7 className="card-subtitle mb-2 text-muted">&nbsp;&nbsp;{importance}</h7>
                </div>
            </div>
        );
    }
}

export default Todo;