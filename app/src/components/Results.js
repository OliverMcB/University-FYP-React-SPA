import React, { Component } from 'react';

class Results extends Component {

    constructor(props) {

        super(props);

        this.state = { result: props.result };
    }

    render() {

        let resultText = null;

        if (this.props.result === 0 || !this.props.result) {
            resultText = "--";
        } else {
            resultText = this.props.result.toString().concat(" Months");
        }

        return (
            <div>
                <label className="Label" >
                    Estimated Survival Time
                </label>
                <label className="Label" >
                    {resultText}
                </label>
            </div>);
    }
}

export default Results