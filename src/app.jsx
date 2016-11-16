import './app.less';
import 'bootstrap-css-only';

import React from 'react';
import ReactDOM from 'react-dom';


class ProgressDialog extends React.Component {

    constructor(props) {
        super(props)
        this.updateProgressBar = this.updateProgressBar.bind(this);
    }

    componentDidMount() {
        fetch('https://frontend-exercise.apps.staging.digital.gov.au/bars')
            .then((response) => {
                return response.json();
            }).then((json) => {
                console.log(json);
                this.setState({
                    bars: json.bars,
                    limit: json.limit,
                    buttons: json.buttons
                })
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    updateProgressBar(value, currentBarIndex) {
        let updatedBars = this.state.bars;
        updatedBars[currentBarIndex] = this.getNewValue(value, currentBarIndex);
        this.setState({
            bars: updatedBars
        });
    }

    getNewValue(value, currentBarIndex) {
        let existingValue = this.state.bars[currentBarIndex];
        return (existingValue + parseInt(value) < 0) ? 0 : existingValue += parseInt(value);
    }

    buildProgressBarList() {
        return this.state.bars.map((barValue, index) =>
            < li key={
                index
            } >
                < ProgressBar value={
                    barValue
                }
                    limit={
                        this.state.limit
                    }
                    /> </li >
        );
    }

    render() {

        if (!this.state) {
            return <h1> Loading... </h1>;
        }

        return (< div className="ProgressDialog jumbotron text-center container-fluid" >

            <div className="row" >
                <div className="col-md-12" > < h1 > Progress Bars Demo </h1></div>
            </div>

            <div className="row" >
                <div className="col-md-12" > {
                    this.buildProgressBarList()
                } </div> </div > < div className="row" >
                < ProgressController buttons={
                    this.state.buttons
                }
                    bars={
                        this.state.bars
                    }
                    onChange={
                        this.updateProgressBar
                    }
                    /> </div>

        </div>
        );
    }
}

class ProgressBar extends React.Component {

    calculatePercentage() {
        return Math.round((this.props.value / this.props.limit) * 100);
    }

    isOverLimit() {
        return this.props.value > this.props.limit;
    }

    render() {
        return (<div className="progress" >
            <div className={
                (this.isOverLimit() ? 'progress-bar-danger' : 'progress-bar-success')
            } >
                < span > {
                    this.calculatePercentage()
                }% </span> </div> </div>
        );
    }
}

class ProgressController extends React.Component {

    constructor(props) {
        super(props)
        this.updateProgressBarValue = this.updateProgressBarValue.bind(this);
        this.updateCurrentBarSelection = this.updateCurrentBarSelection.bind(this);
        this.state = {
            currentBar: 0
        };
    }

    getProgressBarOptions() {
        return this.props.bars.map((value, index) =>
            <option key={
                index
            }
                value={
                    index
                } > progress {
                    index + 1
                } </option>
        );
    }

    getProgressButtons() {
        return this.props.buttons.map((value, index) =>
            <button type="button"
                key={
                    index
                }
                className="btn btn-info btn-lg"
                name={
                    value
                }
                onClick={
                    this.updateProgressBarValue
                } > {
                    value
                } </button>
        );
    }

    updateProgressBarValue(event) {
        this.props.onChange(event.target.name, this.state.currentBar);
    }

    updateCurrentBarSelection(event) {
        this.setState({
            currentBar: event.target.value
        });
    }

    render() {
        return (<div className="ProgressController" >
            <div className="col-md-6" >
                < select value={
                    this.state.currentBar
                }
                    onChange={
                        this.updateCurrentBarSelection
                    } > {
                        this.getProgressBarOptions()
                    } </select> </div> < div className="col-md-6" > {
                        this.getProgressButtons()
                    } </div> </div>
        );
    }
}

ReactDOM.render(< ProgressDialog />,
    document.getElementById('root')
);