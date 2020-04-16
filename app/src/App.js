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

        this.updateData = this.updateData.bind(this);
    }

    updateData(newData) {

        var newState;

        if (this.state.data) {
            newState = this.state.data.concat(newData);
        } else {
            newState = newData;
        }

        this.setState({ data: newState, results: this.state.results })
    }

    render() {
        return (
            <Layout>
                <Route
                    path='/upload'
                    render={(props) => <Upload updateData={this.updateData} />}
                />
                <Route
                    path='/data'
                    render={(props) => <PatientPaginationView data={this.state.data} results={this.state.results} />}
                />
            </Layout>
        );
    }
}

export default App;
