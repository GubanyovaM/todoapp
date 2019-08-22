import React, {Component} from 'react';
import {
    GoCheck
} from "react-icons/go";
import {
    FaTrashAlt
} from 'react-icons/fa';



class TodoButtons extends Component {

    render () {
        const { finished } = this.props;
        let finishedButton;
       
        if (!finished) {
            finishedButton = (
                <button className = "finishCheck" onClick={this.props.onFinish}>
                <i> < GoCheck /></i></button>
            )
        }

        return (
            <>
            <div className="removeButton">
            <button type = "button"
            className = "close"
            aria-label = "Close"
            onClick = {this.props.onRemove}><i aria-hidden="true"> < FaTrashAlt /> </i>
            </button>
            </div>
           
            {finishedButton}
            </>
        );
    }
}

export default TodoButtons;