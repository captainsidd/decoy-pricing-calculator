import React, { Component, Fragment } from 'react';
import HourlySlider from './HourlySlider';

function parseToFloat(str) {
  const floatValue = parseFloat(str);
  return isNaN(floatValue) ? 0 : floatValue;
}

function sanitizePrice(price) {
  return isNaN(price) ? 0 : Math.round(price * 100) / 100;
}

/**
 * Calculator displays Tiers, and exposes the ability to add and remove Tiers through buttons.
 * Using the inputted data from each Tier and the hourly rate from the Slider, the calculator will
 * use the decoy pricing strategy to price each Tier to maximize revenue.
 */
class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tiers: [
        {
          id: 0,
          hoursOfWork: 0,
          costOfMaterials: 0
        }
      ],
      nextTierId: 1, // ID for next Tier component
      addingAllowed: true,
      hourlyRate: 0,
      targetId: 0
    };
  }

  // Add Tier
  handleAddTier = () => {
    const { tiers, nextTierId, addingAllowed } = this.state;
    const newTier = {
      id: nextTierId,
      hoursOfWork: 0,
      costOfMaterials: 0
    }
    if (addingAllowed) {
      this.setState({
        tiers: [...tiers, newTier],
        nextTierId: nextTierId + 1, // Increment nextTierId
        // adding is only allowed if less than 6 tiers, 4 existing plus 1 new = 5
        addingAllowed: tiers.length >= 4 ? false : true
      });
    }
  };

  handleDataChange = (type, tierId, event) => {
    switch (type) {
      // if type is remove , remove the tierId from state.tiers
      case 'remove':
        const { tiers, targetId } = this.state;
        if (tiers.length === 1) {
          return;
        }
        let newTargetId = targetId;
        // if the tierId is the targetId, then switch the targetId to another tier
        if (targetId === tierId) {
          for (let index = 0; index < tiers.length; index++) {
            const tier = tiers[index];
            if (tierId !== tier.id) {
              newTargetId = tier.id
              break;
            }
          }
        }
        this.setState(prevState => ({
          tiers: prevState.tiers.filter(tier => tier.id !== tierId),
          targetId: newTargetId,
          addingAllowed: true
        }));
        break;
      // if type is hours , update state.tier.tierId with sanitized hours value
      case 'hours':
        const hours = parseToFloat(event.target.value);
        this.setState(prevState => ({
          tiers: prevState.tiers.map(tier => {
            if (tier.id === tierId) {
              return { ...tier, hoursOfWork: hours };
            }
            return tier;
          })
        }));
        break;
      // if type is cost , update state.tier.tierId with sanitized cost value
      case 'cost':
        const cost = parseToFloat(event.target.value);
        this.setState(prevState => ({
          tiers: prevState.tiers.map(tier => {
            if (tier.id === tierId) {
              return { ...tier, costOfMaterials: cost };
            }
            return tier;
          })
        }));
        break;
      // if type is target , update state.targetId to tierId
      case 'target':
        this.setState({ targetId: tierId});
        break;
      default:
        return;
    }

  }

  // Updates the hourly rate for the Calculator
  updateHourlyRate = (event) => {
    this.setState({ hourlyRate: event.target.value });
  }

  /**
   * Algorithm for setting the decoy prices.
   * @returns Updates the state for each tier to have the suggested prices.
   */
  calculateDecoyPrices = (tiers, hourlyRate, targetId) => {
    const sortedTiers = tiers.map(tier => ({
      id: tier.id,
      price: tier.hoursOfWork * hourlyRate + tier.costOfMaterials
    }));
    sortedTiers.sort((a, b) => a.price - b.price);
    let targetIndex = 0;
    for (let index = 0; index < sortedTiers.length; index++) {
      const tier = sortedTiers[index];
      if (tier.id === targetId) {
        targetIndex = index;
      }
    }
    const adjustmentFactor = 1 + 1 / sortedTiers.length;
    if (sortedTiers.length >= 3) {
      if (targetIndex === 0) {
        sortedTiers[targetIndex + 1].price = sortedTiers[targetIndex + 1].price * adjustmentFactor;
      } else if (targetIndex === sortedTiers.length - 1) {
        sortedTiers[targetIndex - 1].price = sortedTiers[targetIndex - 1].price * adjustmentFactor;
      } else {
        sortedTiers[targetIndex - 1].price = sortedTiers[targetIndex - 1].price * adjustmentFactor;
        sortedTiers[targetIndex + 1].price = sortedTiers[targetIndex + 1].price * adjustmentFactor;
      }
    }
    const roundedTiers = sortedTiers.map(tier => ({
      id: tier.id,
      price: sanitizePrice(tier.price)
    }));
    return roundedTiers;
  }

  findPrice = (suggestedPrices, tierId) => {
    for (let index = 0; index < suggestedPrices.length; index++) {
      const tier = suggestedPrices[index];
      if (tier.id === tierId) {
        return tier.price
      }
    }
    return 0;
  }


  render() {
    const { tiers, hourlyRate, targetId, addingAllowed } = this.state;
    // suggestedPrices is a list of price objects, each with an id and a price
    const suggestedPrices = this.calculateDecoyPrices(tiers, hourlyRate, targetId);
    const tierDivs = tiers.map(tier => (
      <Fragment key={tier.id}>
        <li className="tier" id={tier.id}>
          <div className='target-wrapper'>
            <label>Target</label>
            <input type="checkbox" id="target-checkbox" checked={tier.id === targetId} onChange={(event) => this.handleDataChange('target', tier.id, event)} />
          </div>
          <div className="inputs-wrapper">
            <div className="input-pair">
              <label htmlFor="hours-of-work">Hours of Work</label>
              <input
                type="number"
                className="hours"
                placeholder="Hours"
                min={0.00}
                step={0.5}
                onChange={(event) => this.handleDataChange('hours', tier.id, event)}
              />
            </div>
            <div className="input-pair">
              <label htmlFor="cost-of-materials">Cost of Materials</label>
              <input
                type="number"
                className="cost"
                placeholder="Cost"
                min={0.00}
                step={0.01}
                onChange={(event) => this.handleDataChange('cost', tier.id, event)}
              />
            </div>
            <div className="input-pair">
              <label htmlFor="suggested-pricing">Suggested Pricing</label>
              <input type="text" className="suggested-pricing" readOnly value={this.findPrice(suggestedPrices, tier.id)} />
            </div>
          </div>
          <button id="remove-tier-button" disabled={tiers.length === 1} onClick={() => this.handleDataChange('remove', tier.id, null)}>Remove</button>
        </li>
      </Fragment>
    ));

    return (
      <div className="page-content">
        <div className="calculator">
          <h1 className="calculator-heading">Decoy Pricing Calculator</h1>
          <ul>
            {tierDivs}
          </ul>
          <button id="add-tier-button" disabled={!addingAllowed} onClick={this.handleAddTier}>Add Package</button>
          <HourlySlider onChange={this.updateHourlyRate} />
        </div>
      </div>
    );
  }
};
export default Calculator;