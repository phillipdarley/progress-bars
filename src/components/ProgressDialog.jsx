import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import ProgressController from './ProgressController.jsx';

const API_URL = 'https://frontend-exercise.apps.staging.digital.gov.au/bars';

class ProgressDialog extends React.Component {

    constructor(props) {
        super(props)
        this.updateProgressBar = this.updateProgressBar.bind(this);
    }

    componentDidMount() {
        fetch(API_URL)
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
            <li key={
                index
            } >
                <ProgressBar value={
                    barValue
                }
                    limit={
                        this.state.limit
                    }
                    />
            </li >
        );
    }

    render() {

        if (!this.state) {
            return <h1> Loading... </h1>;
        }

        return (

            <div className="container container-fluid" >

                <div className="row" >
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1> Progress Bars Demo </h1>
                        </div>
                    </div>
                </div>

                <div className="row" >
                    <div className="col-md-6" > {
                        this.buildProgressBarList()
                    }
                    </div>


                    <ProgressController buttons={
                        this.state.buttons
                    }
                        bars={
                            this.state.bars
                        }
                        onChange={
                            this.updateProgressBar
                        }
                        />
                </div>
            </div>


        );
    }
}

export default ProgressDialog;