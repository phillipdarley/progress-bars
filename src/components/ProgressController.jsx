import React from 'react';
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
                }
            </option>
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
        return (
            <div className="col-md-6 col-controls">
                <div className="row">
                    <select className="form-control" value={
                        this.state.currentBar
                    }
                        onChange={
                            this.updateCurrentBarSelection
                        } > {
                            this.getProgressBarOptions()
                        } </select>
                </div>



                <div className="row" >
                    <div className="btn-group btn-group-custom">
                        {
                            this.getProgressButtons()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressController;