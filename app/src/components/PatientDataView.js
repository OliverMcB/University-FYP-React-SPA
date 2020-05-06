import React, { Component } from 'react';
import axios from 'axios';
import polly from 'polly-js';

import './PatientDataView.css';

class PatientDataView extends Component {

    constructor(props) {

        super(props);

        this.state = { data: '', index: '' };
    }

    componentDidMount() {

        this.setState({ data: this.props.data, index: this.props.index })
    }

    handlePatientInfoChange(event, k) {

        let newData = this.state.data

        console.log(event.target);

        newData[k] = event.target.value

        this.setState({ data: newData })

        this.props.updateData(newData, this.state.index)
    }

    computeResult() {

        var bodyFormData = new FormData();

        bodyFormData.append("data", JSON.stringify([this.props.data]));

        const loadData = url => {
            return polly()
                .waitAndRetry(5)
                .executeForPromise(async () => {
                    var request = axios({
                        method: 'post',
                        url: url,
                        data: bodyFormData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    return await request;
                });
        };

        console.log(loadData('http://127.0.0.1:5000/predict'))

        loadData('http://127.0.0.1:5000/predict')
            .then(response => {
                this.props.updateResult(response.data, this.props.index)
            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });


    }

    render() {

        return (
            <div>
                
                <h4>Patient Information</h4>

                {Object.keys(this.props.data).map((key, index) => {

                    return (
                        <div key={key}>
                            <label className="Label" >
                                {key}
                            </label>
                            <input
                                type="text"
                                value={this.props.data[key]}
                                onChange={(e) => { this.handlePatientInfoChange(e, key) }}
                            />
                        </div>
                    );
                })}
                <button className='button' onClick={() => { this.computeResult() }}>Compute Result</button>
            </div>
            );
    }
}

export default PatientDataView;
