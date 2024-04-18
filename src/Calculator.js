import React, { Component } from 'react';
import Tier from "./Tier";
import HourlySlider from './HourlySlider';
import MarginSlider from './MarginSlider';

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
      margin: 0
    };
  }

  // Add Tier
  handleAddTier = () => {
    const { tiers, nextTierId } = this.state;
    this.setState({
      tiers: [...tiers, { id: nextTierId, hoursOfWork: 0, costOfMaterials: 0}],
      nextTierId: nextTierId + 1 // Increment nextTierId
    });
  };

  // Updates the data for a Tier in the Calculator state
  handleTierDataUpdate = (tierId, newData) => {
    this.setState(prevState => ({
      tiers: prevState.tiers.map(tier => {
        if (tier.id === tierId) {
          return { ...tier, ...newData };
        }
        return tier;
      })
    }));
  };

  // Updates the hourly rate for the Calculator
  updateHourlyRate = (event) => {
    this.setState({ hourlyRate: event.target.value });
  }

  // Updates the minimum margin for the Calculator
  updateMargin = (event) => {
    this.setState({ margin: event.target.value });
  }

  /**
   * Algorithm for setting the decoy prices.
   * @returns Updates the state for each tier to have the suggested prices.
   */
  calculateDecoyPrices = () => {
    const { tiers, hourlyRate, margin } = this.state;
    var data = [] // {tier id: suggestedPrice}
    tiers.forEach(tier => {
      const costOfMaterials = parseFloat(tier.costOfMaterials);
      const hoursOfWork = parseFloat(tier.hoursOfWork);
      console.log(costOfMaterials)
      console.log(hoursOfWork)
      console.log(costOfMaterials + hoursOfWork * hourlyRate);
      if (!tier.removed) {
        data.push({
          id: tier.id,
          suggestedPrice: (costOfMaterials + hoursOfWork * hourlyRate) * (1 + margin / 100)
        });
      }
    });
    console.log(data)
    /**
     * if 3 products, boost middle (1)
     * if 4 products, boost second highest (2)
     * if 5 products, boost middle (2)
     *
     * boosting is done by increasing the price of the boosted tier by the margin
     * and increasing the prices of adjacent products by half the margin.
     */
    const length = data.length
    if (length >= 3 && length <= 5) {
      var boostIndex = 2;
      if (length === 3 || length === 5) {
        boostIndex = Math.floor(data.length / 2);
      }
      console.log(data[boostIndex])
      data[boostIndex].suggestedPrice = data[boostIndex].suggestedPrice * (1 + margin/100);
      data[boostIndex - 1].suggestedPrice = data[boostIndex].suggestedPrice * (1 + margin/200);
      data[boostIndex + 1].suggestedPrice = data[boostIndex].suggestedPrice * (1 + margin/200);
    }
    console.log(data)
    this.setState(prevState => ({
      tiers: prevState.tiers.map(tier => {
        for (let index = 0; index < data.length; index++) {
          if (data.id === tier.id) {
            return { ...tier, suggestedPrice: data.suggestedPrice };
          }
        }
        return tier;
      })
    }));
  }

  render() {
    const { tiers } = this.state;
    const tierDivs = tiers.map(tier => (
      <Tier key={tier.id} id={tier.id} suggestedPrice={tier.suggestedPrice} onChange={this.handleTierDataUpdate} />
    ));
    // console.log(this.state)
    return (
      <div className="page-content">
        <div className="calculator">
          <h1 className="calculator-heading">Decoy Pricing Calculator</h1>
          {tierDivs}
          <button id="add-tier-button" onClick={this.handleAddTier}>Add Tier</button>
          <button id="calculate-button" onClick={this.calculateDecoyPrices}>Calculate</button>
          <HourlySlider onChange={this.updateHourlyRate} />
          <MarginSlider onChange={this.updateMargin} />
        </div>
      </div>
    );
  }
};
export default Calculator;