import React, { Component } from 'react';

class PatientDataView extends Component {

    constructor(props) {

        super(props);

        this.state = { data: props.data, index: props.index };
    }

    render() {

        return (
            <form onSubmit={this.computeResult}>
                
                <h4>Patient Information</h4>

                {this.state.data.map((patientInfo, index) => (
                    <div>
                        <label
                            value={patientInfo.key}
                            />
                        <input
                            type="text"
                            value={patientInfo.value}
                            onChange={this.handlePatientInfoChange(patientInfo.key)}
                        />
                    </div>
                ))}
                <button>Compute Result</button>
            </form>
            );
    }
}

export default PatientDataView;
