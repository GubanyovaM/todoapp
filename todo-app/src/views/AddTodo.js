import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddTodo extends Component {
        state = {
            title: "",
            text: "",
            importance: ''
           
        };

        handleChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            })
        };

        handleSubmit = async event => {
            event.preventDefault();
            await this.props.onAdd(this.state);
            console.log(this.state);
            this.setState({
                title: '',
                text: '',
                importance: ''
            });
            this.props.history.push('/');
        };

        render() {
            const { title, text, importance } = this.state;
            return (
            
                <form onSubmit={this.handleSubmit} className="mb-2">
                    <input 
                        className="form-control mb-2"
                        type="text"
                        value={title}
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange} />
                    <textarea 
                        className="form-control mb-2"
                        name="text"
                        placeholder="Text"
                        value={text}
                        onChange={this.handleChange} />
                    <select className="form-control mb-2"  name="importance" value={importance} onChange={this.handleChange}>
                            <option name="low">LOW</option>
                            <option name="medium">MEDIUM</option>
                            <option name="high">HIGH</option>
                            <option name="urgent">URGENT</option> 
                    </select>
                    
                    <button type="submit" className="btn btn-primary mb-2" disabled={!title}>
                    SAVE
                    </button>
                 
                </form>
               
            )
        }
}

export default withRouter(AddTodo);

