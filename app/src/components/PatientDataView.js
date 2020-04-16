import React, { Component } from 'react';
import './PatientDataView.css';

class PatientDataView extends Component {

    constructor(props) {

        super(props);

        this.state = { data: props.data, index: props.index };
    }

    handlePatientInfoChange(key) {

    }

    render() {

        return (
            <form onSubmit={this.computeResult}>
                
                <h4>Patient Information</h4>

                {Object.keys(this.state.data).map((key, index) => (
                    <div>
                        <label className="Label">
                            {key}
                        </label>
                        <input
                            type="text"
                            value={this.state.data[key]}
                            onChange={this.handlePatientInfoChange(key)}
                        />
                    </div>
                ))}
                <button>Compute Result</button>
            </form>
            );
    }
}

export default PatientDataView;
