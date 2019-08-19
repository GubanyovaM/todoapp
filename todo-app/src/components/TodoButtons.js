import React, {Component} from 'react';


class TodoButtons extends Component {

    render () {
        const { finished } = this.props;
        let finishedButton;
       
        if (!finished) {
            finishedButton = (
                <button className = "btn btn-warning" onClick={this.props.onFinish}>
                FINISH </button>
            )
        }

        return (
            <>
            <button type= "button" className= "btn btn-light float-right" 
            onClick={this.props.onRemove}>
            DELETE </button>
            {finishedButton}
            </>
        );
    }
}

export default TodoButtons;