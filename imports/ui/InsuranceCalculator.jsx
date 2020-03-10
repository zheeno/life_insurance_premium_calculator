import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import NumberFormat from 'react-number-format';
import { Meteor } from 'meteor/meteor'
import PremiumResult from './PremiumResult.jsx';


export default class InsuranceCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      minAmt: 200000,
      maxAmt: 1000000,
      step: 1000,
      insuranceAmount: 200000,
      age: 24,
      ageList: [],
      isSmoker: false,
      isFemale: false,
      isMale: true,
      premium: 0
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculator = this.calculator.bind(this);
  }

  componentDidMount() {
    // generate age array
    var ages = [];
    for (let index = 24; index <= 60; index++) {
      ages.push(index);
    }
    this.setState({ ageList: ages });
  }


  handleSliderChange = (value) => {
    this.setState({
      insuranceAmount: value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.calculator(function (response) {
      this.setState({ premium: response, showResult: true });
    }.bind(this));
  }

  calculator = (callback) => {
    Meteor.call('calculatePremium', this.state, function (err, response) {
      if (err == null) {
        callback(response);
      } else {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">
                Life Insurance Calculator
              </div>
              <div className="card-body">
                {this.state.showResult && this.state.premium > 0 ?
                  <PremiumResult premium={this.state.premium} cancel={() => this.setState({ showResult: false, premium: 0 })} />
                  :
                  <form onSubmit={(e) => { this.handleSubmit(e) }}>
                    {/* age selector */}
                    <div className="md-form">
                      <label>Please choose your age</label><br />
                      <select className="form-control mt-4" onChange={(event) => this.setState({ age: event.target.value })}>
                        {this.state.ageList.map(this_age => {
                          return (
                            <option value={this_age}>{this_age}</option>
                          )
                        })}
                      </select>
                    </div>
                    {/* gender selector */}
                    <div className="md-form ml-4">
                      <label style={{ left: -20 }}>Kindly select your gender</label><br />
                      <div className="row">
                        <div className="col-5 mx-auto md-form custom-control custom-radio">
                          <input type="radio" className="custom-control-input" id="sexMale" name="maleRadio" onClick={(event) => this.setState({ isFemale: false, isMale: true })} checked={this.state.isMale} />
                          <label className="custom-control-label" for="sexMale">Male</label>
                        </div>
                        <div className="col-5 mx-auto md-form custom-control custom-radio">
                          <input type="radio" className="custom-control-input" id="sexFemale" name="femaleRadio" onClick={(event) => this.setState({ isFemale: true, isMale: false })} checked={this.state.isFemale} />
                          <label className="custom-control-label" for="sexFemale">Female</label>
                        </div>
                      </div>
                    </div>
                    {/* smoker indicator */}
                    <div className="md-form ml-4 custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="smokerCheck" onChange={(event) => this.setState({ isSmoker: !this.state.isSmoker })} checked={this.state.isSmoker} />
                      <label className="custom-control-label" for="smokerCheck">Are you a Smoker?</label>
                    </div>
                    {/* amount slider */}
                    <div className="md-form mt-5">
                      <label for="insAmtSlider" className="mt-2">Insurance Amount
                      &nbsp;
                    <strong>
                          (<NumberFormat value={this.state.insuranceAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />)
                    </strong>
                      </label>
                      <Slider
                        value={this.state.insuranceAmount}
                        min={this.state.minAmt}
                        max={this.state.maxAmt}
                        step={this.state.step}
                        onChange={this.handleSliderChange}
                        orientation="horizontal"
                      />
                    </div>
                    <div className="md-form my-5" style={{ textAlign: "center" }}>
                      <button type="submit" className="btn btn-md btn-primary">Apply</button>
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
