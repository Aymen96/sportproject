import React, { Component } from 'react'
import CustomTable from '../../components/CustomTable';
import { evaluations, evaluationsHeadCells } from '../../temp-data/evaluations';

export default class EvaluationsView extends Component {

  getEvaluations() {
      const evaluations = {};
      return evaluations;
  }
  render() {
    return (
      <>
      <div className="view-header"></div>
      <div className="view-content">
          <CustomTable evaluations={evaluations} headCells={evaluationsHeadCells}/>
      </div>
      <div className="view-footer"></div></>
    )
  }
}
