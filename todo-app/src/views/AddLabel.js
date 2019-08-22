import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class AddLabel extends Component {
        state = {
            label: "",
            color: "#8000ff"
        };

        handleChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            })
        };

        handleSubmit = async event => {
            event.preventDefault();
            await this.props.onAddL(this.state);
            console.log(this.state);
            this.setState({
                label: '',
                color: ''
            });
            this.props.history.push('/addlabel');
        };

        render() {
            const { label, color } = this.state;
            return (
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <div className="form-group mx-sm-2 mb-2">
                    <input 
                        className="form-control"
                        type="text"
                        value={label}
                        name="label"
                        placeholder="New label"
                        onChange={this.handleChange} /></div>
                    <div className="form-group mx-sm-2 mb-2">
                    <div className="colorBar">
                    <input 
                        className="form-control"
                        name="color"
                        type="color"
                        value={color}
                        onChange={this.handleChange} /></div></div>
                    <button type="submit" className="btn btn-primary mb-2" disabled={!label}>
                    ADD
                    </button>
                
                </form>
            )
        }
}

export default withRouter(AddLabel);

