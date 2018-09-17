import React, {Component} from 'react';
import {createDrawing} from "./api/api";

class DrawingForm extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            drawingName: ''
        }
    }

    render()
    {
        return (

            <div className="Form">
                <form>
                    <input
                        type="text"
                        value
                        ={this.state.drawingName}
                        onChange
                        ={(event) => {
                        this.setState({drawingName: event.target.value})
                    }}/>
                    <button type='submit' className="Form-drawingInput">Create</button>
                </form>

            </div>

        )
    }

}

export default DrawingForm;