import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/navigation/Layout'; 
import Upload from './components/Upload.js';
import PatientPaginationView from './components/PatientPaginationView';

import './App.css';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = { data: [], results: [] };

        this.updateDataAndResults = this.updateDataAndResults.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateResult = this.updateResult.bind(this);
    }

    updateDataAndResults(newData, newResult) {

        var newStateData;
        var newStateResult;

        if (this.state.data) {
            newStateData = this.state.data.concat(newData);
        } else {
            newStateData = newData;
        }

        if (this.state.results) {
            newStateResult = this.state.results.concat(newResult);
        } else {
            newStateResult = newResult;
        }

        this.setState({ data: newStateData, results: newStateResult })
    }

    updateData(newData) {
        this.setState({ data: newData });
    }

    updateResult(newResult) {
        this.setState({ results: newResult });
    }

    render() {
        return (
            <Layout>
                <Route
                    path='/upload'
                    render={(props) => <Upload updateData={this.updateDataAndResults} />}
                />
                <Route
                    path='/data'
                    render={(props) => <PatientPaginationView
                        data={this.state.data}
                        results={this.state.results}
                        updateData={this.updateData}
                        updateResult={this.updateResult}
                    />}
                />
            </Layout>
        );
    }
}

export default App;
