import React, { Component } from 'react'
import CustomTable from '../../components/CustomTable';

export default class EvaluationsView extends Component {

  getEvaluations() {
      const evaluations = {};
      return evaluations;
  }
  render() {
    const data = this.getEvaluations();
    return (
      <>
      <div class="view-header"></div>
      <div class="view-content">
          <CustomTable />
      </div>
      <div class="view-footer"></div></>
    )
  }
}
