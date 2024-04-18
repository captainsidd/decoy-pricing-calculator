import React, { Component } from 'react';

class MarginSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: 0
    };
  }

  handleSliderChange = (event) => {
    this.setState({ margin: event.target.value });
    this.props.onChange(event);
  };

  render() {
    const { margin } = this.state;
    return (
      <div className="slider-container">
        <label htmlFor="hourly-rate">Minimum Profit Margin:</label>
        <input
          type="range"
          min="0"
          step="5"
          max="100"
          value={margin}
          className="slider"
          id="hourly-rate"
          onChange={this.handleSliderChange}
        />
        <span id="margin-display">{margin}%</span>
      </div>
    );
  }
}

export default MarginSlider;
