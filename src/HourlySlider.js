import React, { Component } from 'react';

class HourlySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyRate: 0
    };
  }

  handleSliderChange = (event) => {
    this.setState({ hourlyRate: event.target.value });
    this.props.onChange(event);
  };

  render() {
    const { hourlyRate } = this.state;
    return (
      <div className="slider-container">
        <label htmlFor="hourly-rate">Hourly Rate:</label>
        <input
          type="range"
          min="0"
          max="200"
          value={hourlyRate}
          className="slider"
          id="hourly-rate"
          onChange={this.handleSliderChange}
        />
        <span id="hourly-rate-display">${hourlyRate} per hour</span>
      </div>
    );
  }
}

export default HourlySlider;
