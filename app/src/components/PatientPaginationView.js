import React, { Component } from 'react';
import PatientDataView from './PatientDataView';
import Results from './Results';
import './PatientPaginationView.css'

class PatientPaginationView extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: props.data,
            results: props.results,
            currentPage: 1,
            upperPageBound: 3,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 3
        };

        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

        this.updateData = this.updateData.bind(this);
        this.updateResult = this.updateResult.bind(this);
    }

    updateData(newData, index) {

        let newDataState = this.state.data;

        newDataState[index] = newData;

        this.setState({ data: newDataState });

        this.props.updateData(this.state.data)
    }

    updateResult(result, index) {

        let newResultState = this.state.results;

        newResultState[index] = result.slice(1, result.indexOf('.') + 3 );

        this.setState({ results: newResultState });

        this.props.updateResult(this.state.results)

        console.log(this.state.results)
    }

    handleClick(event) {

        let listid = Number(event.target.id);

        this.setState({
            currentPage: listid
        });

        this.setPrevAndNextBtnClass(listid);

    }

    setPrevAndNextBtnClass(listid) {

        let totalPage = this.state.data.length;

        this.setState({ isNextBtnActive: 'disabled', isPrevBtnActive: 'disabled' });

        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
        }
        else if (listid === 1 && totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '', isPrevBtnActive: '' });
        }
    }

    btnIncrementClick() {

        let listid = this.state.upperPageBound + 1;

        this.setState({
            upperPageBound: this.state.upperPageBound + this.state.pageBound,
            lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
            currentPage: listid
        });

        this.setPrevAndNextBtnClass(listid);
    }

    btnDecrementClick() {

        let listid = this.state.upperPageBound - this.state.pageBound;

        this.setState({
            upperPageBound: this.state.upperPageBound - this.state.pageBound,
            lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
            currentPage: listid
        });

        this.setPrevAndNextBtnClass(listid);
    }

    btnPrevClick() {

        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({
                upperPageBound: this.state.upperPageBound - this.state.pageBound,
                lowerPageBound: this.state.lowerPageBound - this.state.pageBound
            });
        }

        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    btnNextClick() {

        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({
                upperPageBound: this.state.upperPageBound + this.state.pageBound,
                lowerPageBound: this.state.lowerPageBound + this.state.pageBound
            });
        }

        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    render() {

        const { data, currentPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= data.length; i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number) => {
            if (number === currentPage) {
                return (
                    <li key={number} className='page-item active' id={number}><a href='#' className='page-link' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                return (
                    <li key={number} className='page-item' id={number}><a href='#' className='page-link' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <li className='page-link'><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <li className='page-link'><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
        }
        let renderPrevBtn = null;
        if (isPrevBtnActive === 'disabled') {
            renderPrevBtn = null
        }
        else {
            renderPrevBtn = <li className={isPrevBtnActive}><a className='page-link' href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
        }
        let renderNextBtn = null;
        if (isNextBtnActive === 'disabled') {
            renderNextBtn = null
        }
        else {
            renderNextBtn = <li className={isNextBtnActive}><a className='page-link' href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
        }

        if (data[currentPage]) {

            return (
                <div align='center'>
                    <div className="d-flex flex-row py-4 align-items-center">
                        <ul className="pagination">
                            {renderPrevBtn}
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            {renderNextBtn}
                        </ul>
                    </div>
                    <div className="data-container">
                        <PatientDataView
                            className="data"
                            data={this.state.data[this.state.currentPage-1]}
                            index={this.state.currentPage-1}
                            updateData={this.updateData}
                            updateResult={this.updateResult}
                        />
                        <Results
                            className="results"
                            result={this.state.results[this.state.currentPage-1]} />
                    </div>
                </div>
            );
        }

        return (
            <div />
        );
    }
}

export default PatientPaginationView;