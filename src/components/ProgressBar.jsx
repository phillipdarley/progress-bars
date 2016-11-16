import React from 'react';
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
                <span> {
                    this.calculatePercentage()
                }% </span> </div> </div>
        );
    }
}
export default ProgressBar;