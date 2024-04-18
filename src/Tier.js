import React, { Component } from 'react';

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false,
      hoursOfWork: 0,
      costOfMaterials: 0
    };
  }

  handleRemoveTier = () => {
    this.setState({ removed: true });
    this.props.onChange(this.props.id, { removed: true });
  };

  handleLabelChange = (event) => {
    const tierLabel = event.target.value;
    this.setState({ tierLabel });
  }

  handleHoursOfWorkChange = (event) => {
    const hoursOfWork = event.target.value;
    // Perform input validation @TODO
    this.setState({ hoursOfWork });
    // Pass updated data to parent component
    this.props.onChange(this.props.id, { hoursOfWork, costOfMaterials: this.state.costOfMaterials });
  };

  handleCostOfMaterialsChange = (event) => {
    const costOfMaterials = event.target.value;
    // Perform input validation @TODO
    this.setState({ costOfMaterials });
    // Pass updated data to parent component
    this.props.onChange(this.props.id, { hoursOfWork: this.state.hoursOfWork, costOfMaterials });
  };

  render() {
    if (this.state.removed) {
      return null; // Return null if the tier is removed
    }

    const {tierLabel, hoursOfWork, costOfMaterials } = this.state;

    return (
      <div className="tier">
        <button id="remove-tier-button" onClick={this.handleRemoveTier}>Remove</button>
        <input
          type="text"
          className="tier-label"
          placeholder="Tier Label"
          value={tierLabel}
          onChange={this.handleLabelChange}
        />
        <div className="inputs-wrapper">
          <div className="input-pair">
            <label htmlFor="hours-of-work">Hours of Work</label>
            <input
              type="number"
              className="hours"
              placeholder="Hours"
              value={hoursOfWork}
              min={0.00}
              step={0.5}
              onChange={this.handleHoursOfWorkChange}
            />
          </div>
          <div className="input-pair">
            <label htmlFor="cost-of-materials">Cost of Materials</label>
            <input
              type="number"
              className="cost"
              placeholder="Cost"
              value={costOfMaterials}
              min={0.00}
              step={0.01}
              onChange={this.handleCostOfMaterialsChange}
            />
          </div>
          <div className="input-pair">
            <label htmlFor="suggested-pricing">Suggested Pricing</label>
            <input type="text" className="suggested-pricing" readOnly value={this.props.suggestedPrice} />
          </div>
        </div>
      </div>
    );
  }
}

export default Tier;
