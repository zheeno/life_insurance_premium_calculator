import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class PremiumResult extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="py-3 px-4" style={{ textAlign: "center" }}>
        <span className="fa fa-check-circle fa-4x green-ic"></span>
        <br />
        <p className="lead">Your Premium is estimated below</p>
        <h3><NumberFormat value={this.props.premium} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
        <button className="btn btn-grey btn-md" onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }
}
